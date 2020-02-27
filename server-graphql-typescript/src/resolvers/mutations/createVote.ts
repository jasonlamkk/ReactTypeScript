import VoteService from '../../services/interface/voteservice';
import { Vote, MutationCreateVoteArgs} from '../../models/mongo';

interface CreateVoteResolver {
    createVote: (ignore: any, input: { optionId: string }) => Promise<Vote|null>;
}

/**
 * createMutationCreateVote
 * @param service VoteService injected VoteService 
 */
const createMutationCreateVote = (service: VoteService): CreateVoteResolver => {
    return {
        createVote: async (_, {optionId}: { optionId: string }): Promise<Vote|null> => {
            const inp: MutationCreateVoteArgs = {
                ip: '',
                optionId,
                timestamp: Date.now().valueOf()
            }
            return await service.createVote(inp)
        }
    };
};

export default createMutationCreateVote;