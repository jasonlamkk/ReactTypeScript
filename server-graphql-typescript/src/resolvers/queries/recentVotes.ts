import { VotesStatistic } from  '../../models/mongo';
import VoteService from '../../services/interface/voteservice';

interface RecentVotesResolver {
    recentVotes: (ignore: any, {seconds}: {seconds: number}) => Promise<VotesStatistic>;
}

const createQueryRecentVotes = (service: VoteService): RecentVotesResolver => {
    return {
        recentVotes: async (_, {seconds}: {seconds: number}): Promise<VotesStatistic> => {
            return await service.getRecentVotes(seconds);
        }
    };
}

export default createQueryRecentVotes;