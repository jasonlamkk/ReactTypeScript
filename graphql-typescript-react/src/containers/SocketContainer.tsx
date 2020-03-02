import React from 'react';
import QrCode from 'qrcode.react';
import Dashboard from '../pages/Dashboard';
import { VoteCount, VoteOption } from '../models/react';
import { VotesBetweenHalfSeconds } from '../models/custom';
import CounterDisplay from '../components/atoms/CounterDisplay';

interface DynamicMap{
    [name: string]: Array<number>;
}

interface SocketState {
    votes: DynamicMap;
    chartData: Array<VotesBetweenHalfSeconds>;
}

interface GameVoteMessage {
    voteTo: string;
}

interface PreSocketProps {
    options: Array<VoteOption>;
}

type VoteGroup = {
    id: string;
    voteTs: Array<string>;
}


class SocketContainer extends React.Component<PreSocketProps, SocketState> {

    constructor(props: PreSocketProps) {
        super(props);
        this.state = {
            votes: {},
            chartData: []
        };
    }

    onSummarize(): void {
        const currentTime = Date.now().valueOf();
        const maxSlot = 10;
        const {votes} = this.state;
        const groups: Array<VoteGroup> = Object.entries(votes).map(([id, voteTimes]): VoteGroup=>{
            const voteTs = voteTimes.map((ts): string => Math.floor(maxSlot - 1 - (currentTime-ts) / 500).toFixed(0));
            return {
                id,
                voteTs
            };
        });
        const chartData: Array<VotesBetweenHalfSeconds> = Array.from({length: maxSlot}, (_, slot: number): VotesBetweenHalfSeconds => {
            const key = slot.toFixed();
            const name = (slot / 2).toFixed(1);

            const statistic: Array<VoteCount> = groups.map(({id, voteTs}: VoteGroup): VoteCount=>{
                const voteCount = voteTs.filter((g)=> g === key).length;
                return {
                    id,
                    voteCount
                };
            });

            return {
                diffSecond: name,
                statistic
            };
        });
        this.setState({
            chartData
        });
    }

    public componentDidMount(): void {
        const host = window.location.host;
        const tls = window.location.protocol.indexOf('s:')>0;
        const ws = new WebSocket(`${tls?'wss':'ws'}://${host}/game`);
        ws.onopen = (): void => {
            setTimeout((): void=>{
                ws.close();
                this.onSummarize();
            }, 5000);
        }
        ws.onmessage = (evt: MessageEvent): void => {
            const message: GameVoteMessage = JSON.parse(evt.data);
            if(message.voteTo) {
                this.setState((prevState: SocketState) => {
                    const {votes} = prevState;
                    if(!votes[message.voteTo]) {
                        votes[message.voteTo] = [];
                    }
                    votes[message.voteTo].push(Date.now().valueOf());
                    return {
                        votes
                    };
                })
            }
        };
    }

    public render(): JSX.Element {
        const {options} = this.props;
        const {votes} = this.state;
        const {chartData} = this.state;

        const gameUrl = `http://${window.location.host}/client`;
        return (<div>
            
            <Dashboard options={options} votes={chartData} />

            <div>
                {options ? options.map((o)=>{
                    const voteCount: number = votes[o.id] ? votes[o.id].length : 0;
                    return <CounterDisplay key={`c-${o.id}`} option={o} count={voteCount} />
                }) : null}
            </div>

            <div>
            Please go to <a target="blank" href={gameUrl}>{gameUrl}</a> to join the game.
            <div>
                <QrCode size={256} value={gameUrl} bgColor="#FFF" fgColor="#000" includeMargin/>
            </div>
            </div>
        </div>);
    }
}

export default SocketContainer;