import { VoteOption } from  '../../models/mongo';
import VoteService from '../../services/interface/voteservice';

interface AllVoteOptionsResolver {
    allVoteOptions: () => Promise<Array<VoteOption>>;
}

/**
 * createQueryAllVoteOptions
 * @param service VoteService injected VoteService 
 */
const createQueryAllVoteOptions = (service: VoteService): AllVoteOptionsResolver => {
    return {
        allVoteOptions: async (): Promise<Array<VoteOption>> => await service.getVoteOptions()
    };
}

export default createQueryAllVoteOptions;