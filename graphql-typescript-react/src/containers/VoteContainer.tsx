import * as React from 'react';
import ClientPage from '../pages/ClientPage';
import { useVoteResultQuery, VoteOption } from '../models/react';

const VoteContainer = () => {
  const { data, error, loading } = useVoteResultQuery();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error || !data) {
    return <div>ERROR</div>;
  }
  const options: Array<VoteOption> = data.allVoteOptions;

  options.sort((x: VoteOption,y: VoteOption)=> {
    if (x.label < y.label) {
      return 1;
    }
    if (x.label > y.label) {
      return -1;
    }
    return 0;
  });

  return <ClientPage options={options} />
};
export default VoteContainer;