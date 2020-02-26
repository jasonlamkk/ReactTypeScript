import VoteService from '../../services/interface/voteservice';
import { Vote, MutationCreateVoteArgs} from '../../models/mongo';

/**
 * private method as quick fix for graph ql library do not provide the input as expected
 */
const _parseInputArgs = (args: any[]): MutationCreateVoteArgs|null => {
    if(args.length > 2 && args[1] && args[1].optionId){
        const input: MutationCreateVoteArgs = {ip: '', optionId: '', ...args[1], timestamp: Date.now().valueOf()};
        return input;
    }
    return null;
}
const create_mutation_createVote = (service: VoteService) => {
    return {
        createVote: async (...args: any[]): Promise<Vote|null> => {
            const inp = _parseInputArgs(args);
            if(!inp) {
                return null;
            }
            return await service.createVote(inp)
        }
    };
};

export default create_mutation_createVote;