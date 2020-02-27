import createQueryAllVoteOptions from './queries/allVoteOptions';
import createQueryRecentVotes from './queries/recentVotes';
import createMutationCreateVote from './mutations/createVote';

import VoteService from '../services/interface/voteservice';

export interface GQLResolver {
    Query: object;
    Mutation: object;
}

const createResolvers = (service: VoteService): GQLResolver => {
    return {
        Query: {
            ... createQueryAllVoteOptions(service), 
            ... createQueryRecentVotes(service)
        },
        Mutation: { ... createMutationCreateVote(service) }
    };
}

export default createResolvers;