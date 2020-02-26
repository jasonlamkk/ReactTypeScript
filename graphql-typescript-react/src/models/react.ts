import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  Upload: any,
};

export type AdditionalEntityFields = {
  path?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Mutation = {
   __typename?: 'Mutation',
  createVoteOption?: Maybe<VoteOption>,
  createVote?: Maybe<Vote>,
};


export type MutationCreateVoteOptionArgs = {
  background: Scalars['String'],
  label: Scalars['String']
};


export type MutationCreateVoteArgs = {
  ip: Scalars['String'],
  timestamp: Scalars['Int'],
  optionId: Scalars['ID']
};

export type Query = {
   __typename?: 'Query',
  allVoteOptions: Array<VoteOption>,
  recentVotes: VotesStatistic,
};


export type QueryRecentVotesArgs = {
  seconds: Scalars['Int']
};


export type Vote = {
   __typename?: 'Vote',
  id: Scalars['ID'],
  ip: Scalars['String'],
  timestamp: Scalars['Int'],
  option: VoteOption,
};

export type VoteCount = {
   __typename?: 'VoteCount',
  id: Scalars['String'],
  voteCount: Scalars['Int'],
};

export type VoteOption = {
   __typename?: 'VoteOption',
  id: Scalars['ID'],
  label: Scalars['String'],
  background: Scalars['String'],
  voteCount: Scalars['Int'],
  votes?: Maybe<Array<Scalars['Int']>>,
};

export type VotesBetweenTime = {
   __typename?: 'VotesBetweenTime',
  diffSecond: Scalars['Int'],
  statistic: Array<VoteCount>,
};

export type VotesStatistic = {
   __typename?: 'VotesStatistic',
  options: Array<VoteOption>,
  votes: Array<VotesBetweenTime>,
};

export type CreateVoteMutationVariables = {
  optionId: Scalars['ID']
};


export type CreateVoteMutation = (
  { __typename?: 'Mutation' }
  & { createVote: Maybe<(
    { __typename?: 'Vote' }
    & Pick<Vote, 'id'>
  )> }
);

export type RecentVotesQueryVariables = {
  seconds: Scalars['Int']
};


export type RecentVotesQuery = (
  { __typename?: 'Query' }
  & { recentVotes: (
    { __typename?: 'VotesStatistic' }
    & { options: Array<(
      { __typename?: 'VoteOption' }
      & Pick<VoteOption, 'id' | 'label' | 'background'>
    )>, votes: Array<(
      { __typename?: 'VotesBetweenTime' }
      & Pick<VotesBetweenTime, 'diffSecond'>
      & { statistic: Array<(
        { __typename?: 'VoteCount' }
        & Pick<VoteCount, 'id' | 'voteCount'>
      )> }
    )> }
  ) }
);

export type VoteResultQueryVariables = {};


export type VoteResultQuery = (
  { __typename?: 'Query' }
  & { allVoteOptions: Array<(
    { __typename?: 'VoteOption' }
    & Pick<VoteOption, 'id' | 'label' | 'background' | 'voteCount'>
  )> }
);


export const CreateVoteDocument = gql`
    mutation CreateVote($optionId: ID!) {
  createVote(optionId: $optionId, ip: "server", timestamp: 1) {
    id
  }
}
    `;
export type CreateVoteMutationFn = ApolloReactCommon.MutationFunction<CreateVoteMutation, CreateVoteMutationVariables>;
export type CreateVoteProps<TChildProps = {}> = ApolloReactHoc.MutateProps<CreateVoteMutation, CreateVoteMutationVariables> & TChildProps;
export function withCreateVote<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateVoteMutation,
  CreateVoteMutationVariables,
  CreateVoteProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, CreateVoteMutation, CreateVoteMutationVariables, CreateVoteProps<TChildProps>>(CreateVoteDocument, {
      alias: 'createVote',
      ...operationOptions
    });
};

/**
 * __useCreateVoteMutation__
 *
 * To run a mutation, you first call `useCreateVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVoteMutation, { data, loading, error }] = useCreateVoteMutation({
 *   variables: {
 *      optionId: // value for 'optionId'
 *   },
 * });
 */
export function useCreateVoteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateVoteMutation, CreateVoteMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateVoteMutation, CreateVoteMutationVariables>(CreateVoteDocument, baseOptions);
      }
export type CreateVoteMutationHookResult = ReturnType<typeof useCreateVoteMutation>;
export type CreateVoteMutationResult = ApolloReactCommon.MutationResult<CreateVoteMutation>;
export type CreateVoteMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateVoteMutation, CreateVoteMutationVariables>;
export const RecentVotesDocument = gql`
    query RecentVotes($seconds: Int!) {
  recentVotes(seconds: $seconds) {
    options {
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
export type RecentVotesProps<TChildProps = {}> = ApolloReactHoc.DataProps<RecentVotesQuery, RecentVotesQueryVariables> & TChildProps;
export function withRecentVotes<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  RecentVotesQuery,
  RecentVotesQueryVariables,
  RecentVotesProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, RecentVotesQuery, RecentVotesQueryVariables, RecentVotesProps<TChildProps>>(RecentVotesDocument, {
      alias: 'recentVotes',
      ...operationOptions
    });
};

/**
 * __useRecentVotesQuery__
 *
 * To run a query within a React component, call `useRecentVotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecentVotesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecentVotesQuery({
 *   variables: {
 *      seconds: // value for 'seconds'
 *   },
 * });
 */
export function useRecentVotesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RecentVotesQuery, RecentVotesQueryVariables>) {
        return ApolloReactHooks.useQuery<RecentVotesQuery, RecentVotesQueryVariables>(RecentVotesDocument, baseOptions);
      }
export function useRecentVotesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RecentVotesQuery, RecentVotesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<RecentVotesQuery, RecentVotesQueryVariables>(RecentVotesDocument, baseOptions);
        }
export type RecentVotesQueryHookResult = ReturnType<typeof useRecentVotesQuery>;
export type RecentVotesLazyQueryHookResult = ReturnType<typeof useRecentVotesLazyQuery>;
export type RecentVotesQueryResult = ApolloReactCommon.QueryResult<RecentVotesQuery, RecentVotesQueryVariables>;
export const VoteResultDocument = gql`
    query VoteResult {
  allVoteOptions {
    id
    label
    background
    voteCount
  }
}
    `;
export type VoteResultProps<TChildProps = {}> = ApolloReactHoc.DataProps<VoteResultQuery, VoteResultQueryVariables> & TChildProps;
export function withVoteResult<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  VoteResultQuery,
  VoteResultQueryVariables,
  VoteResultProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, VoteResultQuery, VoteResultQueryVariables, VoteResultProps<TChildProps>>(VoteResultDocument, {
      alias: 'voteResult',
      ...operationOptions
    });
};

/**
 * __useVoteResultQuery__
 *
 * To run a query within a React component, call `useVoteResultQuery` and pass it any options that fit your needs.
 * When your component renders, `useVoteResultQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVoteResultQuery({
 *   variables: {
 *   },
 * });
 */
export function useVoteResultQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<VoteResultQuery, VoteResultQueryVariables>) {
        return ApolloReactHooks.useQuery<VoteResultQuery, VoteResultQueryVariables>(VoteResultDocument, baseOptions);
      }
export function useVoteResultLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<VoteResultQuery, VoteResultQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<VoteResultQuery, VoteResultQueryVariables>(VoteResultDocument, baseOptions);
        }
export type VoteResultQueryHookResult = ReturnType<typeof useVoteResultQuery>;
export type VoteResultLazyQueryHookResult = ReturnType<typeof useVoteResultLazyQuery>;
export type VoteResultQueryResult = ApolloReactCommon.QueryResult<VoteResultQuery, VoteResultQueryVariables>;