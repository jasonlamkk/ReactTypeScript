import { VoteOption } from  '../../models/mongo';
import VoteService from '../../services/interface/voteservice';

const create_query_allVoteOptions = (service: VoteService) => {
    return {
        allVoteOptions: async ():Promise<Array<VoteOption>> => await service.getVoteOptions()
    };
}

// const q:Query = new Query();
export default create_query_allVoteOptions;