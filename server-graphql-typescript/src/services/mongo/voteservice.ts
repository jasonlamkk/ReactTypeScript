import { MongoError, ObjectID, Cursor} from 'mongodb';
import {default as IVoteService} from '../interface/voteservice';
import { MongoDbProvider } from '../../dbprovider/mongodb'
import { dbVote2Vote, dbVoteOption2VoteOption } from '../../models/convertor'
import { MutationCreateVoteArgs, VoteOption, VoteCount, Vote, VoteDbObject, VoteOptionDbObject, VotesBetweenTime, VotesStatistic } from '../../models/mongo';

type Int = number & { __int__: void };

type VoteGroup = {
    id: string;
    voteTs: Array<Int>;
}

function groupByInt(ns: Array<Int>, second: number): number {
    return ns.filter((i)=>i==second).length
}

class VoteService implements IVoteService {

    private provider: MongoDbProvider

    private errorCount: number

    constructor(mongo: MongoDbProvider){
        this.provider = mongo;
        this.errorCount = 0
    }

    async findVoteOptionById(hexId: string): Promise<VoteOption|null> {
        try {
            const r = await this.provider.voteOptionsCollection.findOne<VoteOptionDbObject>({ _id: new ObjectID(hexId) });
            if (r === null){
                return null;
            }
            return dbVoteOption2VoteOption(r);
        } catch ( ex ) {
            if (ex instanceof MongoError){
                if (++this.errorCount > 3) {
                    throw ex;
                }
                await this.provider.reconnect();
                return this.findVoteOptionById(hexId);
            }
            throw ex;
        }
    }
    
    async getVoteOptions(): Promise<Array<VoteOption>> {
        try{
            const all = await this.provider.voteOptionsCollection
                .find<VoteOptionDbObject>()
                .filter(({label}: {label: string})=>!label)
                .sort({label:1})
                .limit(10);
            const arr: Array<VoteOptionDbObject> = await all.toArray();
            const options: Array<VoteOption> = arr.map(dbVoteOption2VoteOption);
            return options;
        } catch ( ex ) {
            console.error("ERROR:getVoteOptions", ex);
            if (ex instanceof MongoError){
                if (++this.errorCount > 3) {
                    throw ex;
                }
                await this.provider.reconnect();
                return this.getVoteOptions();
            }
            throw ex;
        }
    }

    async getRecentVotes(seconds: number): Promise<VotesStatistic> {
        try{
            const ct: number = Date.now().valueOf();
            console.log("SSS", seconds, typeof seconds, 1*seconds, (seconds).toString(), parseInt(seconds.toString()))
            const sInt: Int = parseInt(Math.floor(seconds).toString()) as Int;
            const zeroInt: Int = 0 as Int;

            const all: Cursor<VoteOptionDbObject> = await this.provider.voteOptionsCollection
                .find<VoteOptionDbObject>()
                .sort({label:1});
            const arr: Array<VoteOptionDbObject> = await all.toArray();
            const options: Array<VoteOption> = arr.map(dbVoteOption2VoteOption);
            
            const simplifiedGroups = arr.map((dbo: VoteOptionDbObject): VoteGroup => {
                const voteTs: Int[] = dbo.votes ? dbo.votes.map((i)=> Math.floor((ct - i)/1000.0) as Int) : [];
                console.log("V", dbo.votes, voteTs, voteTs.filter((i: Int)=>{
                    console.log('c>', i, i>=zeroInt, `${i} < ${sInt}`, i<sInt);
                    return i >= zeroInt && i < sInt
                }));
                return {
                    id: dbo._id.toHexString(),
                    voteTs
                };
            });

            console.warn('>>>',seconds, arr, simplifiedGroups);

            const votesBetweenTime: Array<VotesBetweenTime> = Array.from({length: seconds}, (_,i): VotesBetweenTime => {
                const statistic: Array<VoteCount> = simplifiedGroups.map((v: VoteGroup): VoteCount => {
                    
                    const count = groupByInt(v.voteTs, seconds - i - 1);
                    return {
                        id: v.id,
                        voteCount: count
                    };
                })

                return {
                    diffSecond: i,
                    statistic
                }
            });

            const vs: VotesStatistic = {
                options,
                votes: votesBetweenTime
            }
            return vs;
        } catch ( ex ) {
            console.error("ERROR:getVoteOptions", ex);
            if (ex instanceof MongoError){
                if (++this.errorCount > 3) {
                    throw ex;
                }
                await this.provider.reconnect();
                return this.getRecentVotes(seconds);
            }
            throw ex;
        }
    }

    async createVote(input: MutationCreateVoteArgs): Promise<Vote|null> {
        try{
            const optId = new ObjectID(input.optionId);

            const opt = await this.provider.voteOptionsCollection.findOne<VoteOptionDbObject>({ _id: optId });
            if (opt === null){
                console.error("!fail to find option!", optId);
                return null;
            }

            const result = await this.provider.votesCollection.insertOne({
                option: opt,
                ip: input.ip,
                timestamp: input.timestamp,
            });

            if (!result || result.insertedCount < 1){
                console.error("!fail to create!", input);
                return null;
            }
            
            const newRecord = result.ops[0] as VoteDbObject;

            await this.provider.voteOptionsCollection
                .findOneAndUpdate({ _id: optId }, 
                {$inc: { voteCount: 1 }, $push: {votes: newRecord.timestamp}}
            );

            return dbVote2Vote(newRecord, opt);
        } catch ( ex ) {
            console.error("ERROR:createVote", ex); 
            if (ex instanceof MongoError){
                if (++this.errorCount > 3) {
                    throw ex;
                }
                await this.provider.reconnect();
                return this.createVote(input);
            }
            throw ex;
        }
    }
}

export default VoteService;