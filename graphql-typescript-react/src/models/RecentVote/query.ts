import gql from 'graphql-tag';
export const VoteResult = gql`
    query RecentVotes($seconds: Int!) {
        recentVotes(seconds: $seconds) {
            options{
                id
                label
                background
            }
            votes {
                diffSecond
                statistic {
                id
                voteCount
                }
            }
        }
    }
`;