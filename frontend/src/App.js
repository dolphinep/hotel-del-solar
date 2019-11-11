import React from 'react';
import './App.css';
import Nav from './pages/components/NavBar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './pages/Home';
import Register from './pages/Register';
import Admin from './pages/Admin';

export default function App() {
  return (
    <Router>
      <div>
        <Nav/>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/register">Registeration</Link>
            </li>
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
