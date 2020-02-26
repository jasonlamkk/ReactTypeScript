import React, { Component } from 'react';
import { VoteOption } from '../models/react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


interface Props {
    options: Array<VoteOption>
};

class Dashboard extends Component<Props> {
    render() {
        const {options}: Props = this.props;


        return (<div>
            {options ? options.map((o: VoteOption) => {
                return (<CircleButton key={o.id} data={o}/>);
             }) : ''}
        </div>);
    }
  }

export default Dashboard;