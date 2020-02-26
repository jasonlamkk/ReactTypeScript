import create_query_allVoteOptions from './queries/allVoteOptions';
import create_query_recentVotes from './queries/recentVotes';
import create_mutation_createVote from './mutations/createVote';

import VoteService from '../services/interface/voteservice';

const createResolvers = (service: VoteService) => {
    return {
        Query: {
            ... create_query_allVoteOptions(service), 
            ... create_query_recentVotes(service)
        },
        Mutation: { ... create_mutation_createVote(service) }
    };
}

export default createResolvers;