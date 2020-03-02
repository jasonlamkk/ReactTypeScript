import React from 'react';
import { ApolloError } from 'apollo-boost';
import { Query, QueryResult } from 'react-apollo';
import Dashboard from '../pages/Dashboard';
import { RecentVotesDocument, VotesStatistic } from '../models/react';
interface ResultData {
    recentVotes: VotesStatistic;
}

const MakeDashboard = (loading: boolean, data?: VotesStatistic, error?: ApolloError): JSX.Element => {
    if(loading || !data) return <span>Loading...</span>;
    if(error) return <span>{`Error: ${error}`}</span>;
    const { options, votes } = data;
    return <Dashboard options={options} votes={votes} />
} 

const IntervalContainer = (): JSX.Element => {
    return <Query 
        query={RecentVotesDocument}
        variables={{
            seconds: 20
        }}
        pollInterval={500}
    >
        {(result: QueryResult): JSX.Element => {
            const {loading, error, data}: {loading: boolean; error?: ApolloError; data: ResultData|undefined} = result;
            return MakeDashboard(loading, data?data.recentVotes:undefined, error)
        }}
    </Query>
}
export default IntervalContainer;