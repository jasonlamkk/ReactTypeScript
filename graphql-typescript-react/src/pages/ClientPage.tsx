import React, { Component } from 'react';
import { VoteOption } from '../models/react';
import CircleButton from '../components/atoms/CircleButton';

interface Props {
    options: Array<VoteOption>;
}

class ClientPage extends Component<Props> {
    render(): JSX.Element {
        const {options}: Props = this.props;

        return (<div>
            {options ? options.filter((o)=>o.label).map((o: VoteOption) => {
                return (<CircleButton key={o.id} data={o}/>);
             }) : ''}
        </div>);
    }
  }

export default ClientPage;