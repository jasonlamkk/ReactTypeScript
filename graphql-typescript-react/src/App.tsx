import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { PreSocketContainer,  VoteContainer } from './containers';
import './App.css';

function NavMenu(): JSX.Element {
  return <nav>
    <ul>
      <li>
        <Link to="/">Default</Link>
      </li>
      <li>
        <Link to="/client">Client</Link>
      </li>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
    </ul>
  </nav>;
}

function Home(): JSX.Element {
  return <div>
    <h4>Please select a feature</h4>
    {<NavMenu/>}
  </div>;
}

const App = () => <Router>
  <div className="App">
    <section>
      <Switch>
        <Route path="/dashboard">
          <PreSocketContainer />
        </Route>
        <Route path="/client">
          <VoteContainer />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </section>
  </div>
</Router>;

export default App;
