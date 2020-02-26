// import { Collection } from 'mongodb';
import { Vote, MutationCreateVoteArgs, VoteOption, VotesStatistic } from '../../models/mongo';

interface VoteService {
    findVoteOptionById(hexId: string): Promise<VoteOption|null>; 
    getVoteOptions(): Promise<Array<VoteOption>>; // better change to JS collection not depend on mongodb
    getRecentVotes(seconds: number): Promise<VotesStatistic>;
    createVote(input: MutationCreateVoteArgs): Promise<Vote|null>;
}

export default VoteService;