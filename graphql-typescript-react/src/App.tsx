import React, { Component } from 'react';
// import logo from './logo.svg';
// import { useVoteResultQuery, VoteOption } from './models/react';
// 
import VoteContainer from './containers/VoteContainer';
import './App.css';

interface Props {};
interface State {
  page: string
}

class App extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      page: '/client'
    };
  }

  render() {
    const {page} = this.state;
    return (
    <div className="App">
      <header className="App-header">
        link
      </header>
      <section>
        <VoteContainer 
          page={page}
        />
      </section>
    </div>
    );
  }
}

export default App;
