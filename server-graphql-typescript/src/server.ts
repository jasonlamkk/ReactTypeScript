import { DIRECTIVES } from '@graphql-codegen/typescript-mongodb';
import { ApolloServer } from 'apollo-server';
import { environment } from './environment';
import { MongoDbProvider } from './dbprovider/mongodb';
import VoteService from './services/mongo/voteservice';
import resolversFactory from './resolvers';
import typeDefs from './models';

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



(async function bootstrapAsync(): Promise<void> {
    const mongoDbProvider = new MongoDbProvider(environment.mongoDb.url, environment.mongoDb.databaseName);
    
    await mongoDbProvider.connectAsync();
    await addDefaultVoteOptionsAsync(mongoDbProvider); // TODO: Remove in PROD.
  
    const voteService = new VoteService(mongoDbProvider);

    const resolvers: any = resolversFactory(voteService); // any used to fit input of ApolloServer 
    
    const server = new ApolloServer({
      resolvers,
      typeDefs: [DIRECTIVES, typeDefs],
      introspection: environment.apollo.introspection,
      playground: environment.apollo.playground,
    });
  
    server
      .listen(environment.port)
      .then(({ url }) => console.log(`Server ready at ${url}. `));
  
    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(async () => {
        server.stop();
        await mongoDbProvider.closeAsync();
      });
    }
})();
