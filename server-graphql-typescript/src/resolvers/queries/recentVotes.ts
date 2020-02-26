import { VotesStatistic } from  '../../models/mongo';
import VoteService from '../../services/interface/voteservice';

const create_query_recentVotes = (service: VoteService) => {
    return {
        recentVotes: async (... args: any[]):Promise<VotesStatistic> => {
            const { seconds } = args[1];
            return await service.getRecentVotes(seconds);
            // await service.getRecentVotes()
        }
    };
}

// const q:Query = new Query();
export default create_query_recentVotes;