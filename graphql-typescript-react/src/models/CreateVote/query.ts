import gql from 'graphql-tag';
export const CreateVote = gql`
    mutation CreateVote($optionId: ID!) {
        createVote(optionId: $optionId, ip: "server", timestamp: 1)
        {
            id
        }
    }
`;