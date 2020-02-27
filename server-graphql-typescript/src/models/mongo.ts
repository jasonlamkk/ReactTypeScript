export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};









export type AdditionalEntityFields = {
  path?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type Mutation = {
   __typename?: 'Mutation';
  createVoteOption?: Maybe<VoteOption>;
  createVote?: Maybe<Vote>;
};


export type MutationCreateVoteOptionArgs = {
  background: Scalars['String'];
  label: Scalars['String'];
};


export type MutationCreateVoteArgs = {
  ip: Scalars['String'];
  timestamp: Scalars['Int'];
  optionId: Scalars['ID'];
};

export type Query = {
   __typename?: 'Query';
  allVoteOptions: Array<VoteOption>;
  recentVotes: VotesStatistic;
};


export type QueryRecentVotesArgs = {
  seconds: Scalars['Int'];
};

export type Vote = {
   __typename?: 'Vote';
  id: Scalars['ID'];
  ip: Scalars['String'];
  timestamp: Scalars['Int'];
  option: VoteOption;
};

export type VoteCount = {
   __typename?: 'VoteCount';
  id: Scalars['String'];
  voteCount: Scalars['Int'];
};

export type VoteOption = {
   __typename?: 'VoteOption';
  /** Vote Option ID. */
  id: Scalars['ID'];
  /** Vote Option display label. */
  label: Scalars['String'];
  /** Vote Option background CSS class. */
  background: Scalars['String'];
  /** Total votes */
  voteCount: Scalars['Int'];
  /** All votes */
  votes?: Maybe<Array<Scalars['Int']>>;
};

export type VotesBetweenTime = {
   __typename?: 'VotesBetweenTime';
  diffSecond: Scalars['Int'];
  statistic: Array<VoteCount>;
};

export type VotesStatistic = {
   __typename?: 'VotesStatistic';
  options: Array<VoteOption>;
  votes: Array<VotesBetweenTime>;
};

import { ObjectID } from 'mongodb';
export type VoteOptionDbObject = {
  _id: ObjectID;
  label: string;
  background: string;
  voteCount: number;
  votes?: Maybe<Array<number>>;
};

export type VoteDbObject = {
  _id: ObjectID;
  ip: string;
  timestamp: number;
  option: VoteOptionDbObject['_id'];
};
