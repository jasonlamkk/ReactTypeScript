import React, { Component } from 'react';
import { VoteOption, VotesBetweenTime, VoteCount } from '../models/react';
import { VotesBetweenHalfSeconds } from '../models/custom';

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { colorMap } from '../assets/colors';

interface Props {
    options: Array<VoteOption>;
    votes: Array<VotesBetweenTime|VotesBetweenHalfSeconds>;
}

interface DynamicType {
    [name: string]: any;
}

function getOptionLabel(options: Array<VoteOption>, id: string): string {
    return options.find((o)=>o.id === id)!!.background
}
class Dashboard extends Component<Props> {
    render() {
        
        const {options, votes}: Props = this.props;
        // console.log("V", votes);
        /**
         * sample
         * const data = [
         *  {
         *      name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
         *      seconds: '1.5', blue: 3, ornage: 1, black: 2
         *  },... ]
         */
        const data = votes ? votes.map((secondlyStat: VotesBetweenTime|VotesBetweenHalfSeconds) => {
            const row: DynamicType = {
                seconds: `${secondlyStat.diffSecond}`
            };
            for(const i in secondlyStat.statistic){
                const vc: VoteCount = secondlyStat.statistic[i];
                const color: string = getOptionLabel(options, vc.id);
                row[color] = 1 * vc.voteCount;
            }
            const orange = row['orange'] || 0;
            const blue = row['blue'] || 0;
            row.black = orange - blue;
            return row;
        }) : [];

        return <div className="chartHolder">
            <LineChart width={730} height={500} data={data}>
                <CartesianGrid strokeDasharray="4 6" />
                <XAxis dataKey="s" />
                <YAxis/>
                <Tooltip />
                <Line type="monotone" dataKey="black" stroke={colorMap['black']} />
                {
                    options.map((o)=><Line key={`vote-of-${o.id}`} type="monotone" dataKey={o.background} stroke={colorMap[o.background]} />)
                }
            </LineChart>
        </div>;
    }
  }

export default Dashboard;