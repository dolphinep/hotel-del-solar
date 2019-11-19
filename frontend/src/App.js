import React from 'react';
import './App.css';
import Nav from './pages/components/NavBar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import Client from './pages/Client';
import Admin from './pages/Admin';
import Register from './pages/register';

export default function App() {
  return (
    <Router>
      <div>
        <Nav />
        <nav>
          <ul align="center">
            <Link to="/">Client</Link>
            <Link to="/admin">Admin</Link>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/admin" component={Admin}/>
          <Route path="/register" component={Register}/>
          <Route exact path="/" component={withRouter(Client)}/>
        </Switch>
      </div>
    </Router>
  );
}
