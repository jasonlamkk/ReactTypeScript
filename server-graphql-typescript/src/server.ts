import { DIRECTIVES } from '@graphql-codegen/typescript-mongodb';
import http from 'http';
import express from 'express';
import WebSocket from 'ws';
import { ApolloServer } from 'apollo-server-express';
import { environment } from './environment';
import { MongoDbProvider } from './dbprovider/mongodb';
import VoteService from './services/mongo/voteservice';
import resolversFactory from './resolvers';
import typeDefs from './models';
import { v4 as uuid } from 'uuid';
import AsyncLock from 'async-lock';

import GameListener from './services/interface/gamelistener';

interface DyanmicGameListeners {
  [key: string]: GameListener;
}

/**
 * Add mock voteOptions if `voteOptions` collection is empty.
 * TODO: Remove in Production.
 */
async function addDefaultVoteOptionsAsync(mongoDbProvider: MongoDbProvider): Promise<void> {
  const voteOptionsCount = await mongoDbProvider.voteOptionsCollection.countDocuments();
  if (voteOptionsCount === 0) {
    await mongoDbProvider.voteOptionsCollection.insertMany([
      {
          label: "-",
          background: "orange"
      },
      {
          label: "+",
          background: "blue"
      }
    ]);
  }
}

const app = express();

app.use('/dashboard', express.static('frontend'));
app.use('/client', express.static('frontend'));
app.use(express.static('frontend'));

const wss = new WebSocket.Server({ clientTracking: false, noServer: true });

const server = http.createServer(app);

const subGameLocks = new AsyncLock();

const subGames: DyanmicGameListeners = {};
const gameNotifier: GameListener = (voteTo: string): void => {
  // console.log(`NewVote: ${voteTo} , sending to Sockets: ${Object.keys(subGames)}`);
  Object.values(subGames).forEach((game)=>{
    if(typeof game === 'function') {
      game(voteTo);
    }
  });
};

server.on('upgrade', function(request, socket, head) {
  // skipped auth
  wss.handleUpgrade(request, socket, head, function(ws) {
    wss.emit('connection', ws, request);
  });
});

wss.on('connection', function(ws, request) {
  const sessionId: string = uuid();

  const thisGameNotifier: GameListener = (voteTo: string): void => {
    try{
      ws.send(JSON.stringify({
        voteTo
      }), function(err?: Error){
        if(!err) {
          console.log(`sent ${sessionId}`);
        } else {
          console.error(`Failed to sent to ${sessionId}; ERROR: ${err}`);
        }
      });
    }catch(ex){
      console.error('socket closed?', ws, ex);
    }
  };

  subGameLocks.acquire('games', function(done){
    subGames[sessionId]  = thisGameNotifier;
    done();
  });

  ws.on('message', function(message) {
    // never happen

    subGameLocks.acquire('games', function(done){
      delete subGames[sessionId];
      done();
    });
    
  });
  ws.on('close', function() {
    // ignore
  });
});


(async function bootstrapAsync(): Promise<void> {
    const mongoDbProvider = new MongoDbProvider(environment.mongoDb.url, environment.mongoDb.databaseName);
    
    await mongoDbProvider.connectAsync();
    await addDefaultVoteOptionsAsync(mongoDbProvider); // TODO: Remove in PROD.
  
    const voteService = new VoteService(mongoDbProvider, gameNotifier);

    const resolvers: any = resolversFactory(voteService); // any used to fit input of ApolloServer 
    
    const apollo = new ApolloServer({
      resolvers,
      typeDefs: [DIRECTIVES, typeDefs],
      introspection: environment.apollo.introspection,
      playground: environment.apollo.playground,
    });
  
    apollo.applyMiddleware({app, path: '/graphql'});

    server.listen(environment.port, ()=>{
      console.log(`Server ready at ${environment.port}. `);
    });
  
    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(async () => {
        apollo.stop();
        wss.close();
        server.close();
        await mongoDbProvider.closeAsync();
      });
    }
})();
