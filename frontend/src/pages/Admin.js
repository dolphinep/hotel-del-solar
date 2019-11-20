
import React from "react";
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import Table from './components/Table';
import Login from './Login';
import Container from '@material-ui/core/Container';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Grid from '@material-ui/core/Grid';
import Roomreservation from "./roomreservation";
import RoomHistory from "./RoomHistory";


function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pass: false,
        };
    }

    isLogin = (childLogin) => {
        this.setState({
            pass: childLogin,
        })
        if (this.state.pass) {
            this.props.history.push("/admin/add")
        }


    }


    render() {
        let { path,url } = this.props.match;
        //<Roomreservation />
        return (
            <div>
{/*                 
                {
                    this.state.pass ? <Redirect to="/admin/add" /> : <Redirect to="/admin" />
                } */}
                <Grid container justify="center" alignItems="center">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link to={`${url}/add`} color="inherit">
                            Room Reserve
                        </Link>
                        <Link to={`${url}/assign`} color="inherit" >
                            Assign Room
                        </Link>
                        <Link to={`${url}/history`} color="inherit" >
                            Room History
                        </Link>
                    </Breadcrumbs>
                </Grid>

                <Switch>
                    <Route exact path={path}>
                        <Login parentLogin={this.isLogin} />
                    </Route>
                    <Route path={`${path}/add`}>
                        <Container>
                            <Roomreservation />
                        </Container>
                    </Route>
                    <Route path={`${path}/assign`}>
                        <Container>
                            <Table />
                        </Container>
                    </Route>
                    <Route path={`${path}/history`}>
                        <RoomHistory/>
                    </Route>
                </Switch>

            </div>
        );
    }
}


export default withRouter(Admin);