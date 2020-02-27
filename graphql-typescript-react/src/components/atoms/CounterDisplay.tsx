import React from 'react';
import './CounterDisplay.css';
import { VoteOption } from '../../models/react';

type CounterDisplayProps = {
  option: VoteOption;
  count: number;
};

type CounterDisplayState = {
  count: number;
}

class CounterDisplay extends React.Component<CounterDisplayProps, CounterDisplayState> {
    constructor(props: CounterDisplayProps){
        super(props);
        this.state = {
            count: 0
        };
    }

    public render(): JSX.Element {
        const {option:{background}, count} = this.props;
        // const {count} = this.state;
        
        return <div className="counter-display-box-wrapper">
            <div className={`counter-display-box counter-display-${background}`} >
                {count}
            </div>
        </div>
    }
}

export default CounterDisplay;