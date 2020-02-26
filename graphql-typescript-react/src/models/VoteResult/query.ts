import gql from 'graphql-tag';
export const VoteResult = gql`
    query VoteResult{
        allVoteOptions{
            id
            label
            background
            voteCount
        }
    }
`;