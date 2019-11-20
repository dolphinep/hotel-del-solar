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
<<<<<<< HEAD
import Register from './pages/Register';
||||||| merged common ancestors
import Register from './pages/register';
=======
import Register from './pages/register';
import RoomHistory from './pages/RoomHistory'
>>>>>>> 03461ed8e8a3f98cd3d00fcb894473c242fb1540

export default function App() {
  return (
    <Router>
      <div>
        <Nav />
        <nav>
          <ul align="center">
            <Link to="/">Client</Link>
            <br></br>
            <Link to="/admin">Admin</Link>
            <br></br>
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
