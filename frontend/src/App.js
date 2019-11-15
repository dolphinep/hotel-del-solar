import React from 'react';
import './App.css';
import Nav from './pages/components/NavBar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Client from './pages/Client';
import Admin from './pages/Admin';

export default function App() {
  return (
    <Router>
      <div>
        <Nav/>
        <nav>
          <ul align="center">
            <Link to="/">Client</Link>
            &emsp;&emsp;            
            <Link to="/admin">Admin</Link>              
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>          
          <Route path="/admin">
            <Admin />
          </Route>          
          <Route path="/">
            <Client />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
