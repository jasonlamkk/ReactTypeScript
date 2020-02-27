import React from 'react';
import { useMutation } from "@apollo/react-hooks";
import './CircleButton.css';

import { CreateVoteDocument } from '../../models/react';

type CircleButtonProps = {
  data: {
    id: string;
    label: string;
    background: string;
  };
};

function CircleButton( { data: {id, label, background} }: CircleButtonProps) {
  const [submitVote] = useMutation(
    CreateVoteDocument,
    { variables: { optionId: id } }
  );
  return (
    <div className={`CircleButton CircleButton-${background}`}>
      <a href="#" onClick={()=>{
        submitVote().then((a)=>{
          try{
            const {data: {createVote:{id: voteId}}} = a;
            console.log(`You have voted!\n record id: ${voteId}`);
          }catch(ex){
            alert(ex);
          }
        });
      }} >
        {label}
      </a>
    </div>
  );
}

export default CircleButton;