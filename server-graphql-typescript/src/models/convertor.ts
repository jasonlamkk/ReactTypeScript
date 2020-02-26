import { Vote, VoteDbObject, VoteOption, VoteOptionDbObject } from './mongo';

export const dbVoteOption2VoteOption = (dbo: VoteOptionDbObject): VoteOption => {
    const o: VoteOption = {
        id: dbo._id.toHexString(),
        label: dbo.label,
        background: dbo.background,
        voteCount: dbo.voteCount ?? 0
    }
    return o;
};

export const dbVote2Vote = (dbo: VoteDbObject, opt: VoteOptionDbObject): Vote => {
    const o: Vote = {
        id: dbo._id.toHexString(),
        ip: dbo.ip,
        timestamp: dbo.timestamp,
        option: dbVoteOption2VoteOption(opt)
    };
    return o;
};