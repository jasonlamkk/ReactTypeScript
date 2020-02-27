import React, { Component } from 'react';
import { VoteOption, VotesBetweenTime, VoteCount } from '../models/react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { colorMap } from '../assets/colors';

interface Props {
    options: Array<VoteOption>;
    votes: Array<VotesBetweenTime>;
};

interface DynamicType {
    [name: string]: any;
}

function getOptionLabel(options: Array<VoteOption>, id: string): string {
    return options.find((o)=>o.id === id)!!.background
}
class Dashboard extends Component<Props> {
    render() {
        
        const {options, votes}: Props = this.props;
        console.log("V", votes);
        /**
         * sample
         * const data = [
         *  {
         *      name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
         *  },... ]
         */
        const data = votes ? votes.map((secondlyStat: VotesBetweenTime) => {
            const row: DynamicType = {
                seconds: `${secondlyStat.diffSecond}`
            };
            for(let i in secondlyStat.statistic){
                const vc:VoteCount = secondlyStat.statistic[i];
                const color: string = getOptionLabel(options, vc.id);
                row[color] = 1 * vc.voteCount;
            }
            // secondlyStat.statistic.forEach((vc: VoteCount) => {
            //     const label: string = getOptionLabel(options, vc.id);
            //     row[label] = 1 * vc.voteCount;
            //     // console.log('l', label,'vc', vc.voteCount);
            // });

            // console.log('row', row);
            
            return row;
        }) : [];

        console.log(data, "<<<");
        return <div className="chartHolder">
            <LineChart width={730} height={500} data={data}>
                <CartesianGrid strokeDasharray="4 6" />
                <XAxis dataKey="s" />
                <YAxis/>
                <Tooltip />
                {
                    options.map((o)=><Line key={`vote-of-${o.id}`} type="monotone" dataKey={o.background} stroke={colorMap[o.background]} />)
                }
            </LineChart>
        </div>;
    }
  }

export default Dashboard;