import React from 'react';
import { useMutation } from "@apollo/react-hooks";
import './CircleButton.css';

import { CreateVote } from '../../models/CreateVote/query';

type CircleButtonProps = {
  data: {
    id: string,
    label: string,
    background: string,
  },
};

function CircleButton( { data: {id, label, background} }: CircleButtonProps) {

  const [submitVote] = useMutation(
    CreateVote,
    { variables: { optionId: id } }
  );
  return (
    <div className={`CircleButton CircleButton-${background}`}>
      <a href="#" onClick={()=>{
        submitVote().then((a)=>{
          
          try{
            const {data: {createVote:{id: voteId}}} = a;
            alert(`You have voted!\n record id: ${voteId}`);
          }catch(ex){
            alert(ex);
          }
        })
        // const result = ;
        // console.log(result);
        // alert(result);
      }} >
        {label}
      </a>
    </div>
  );
};

export default CircleButton;