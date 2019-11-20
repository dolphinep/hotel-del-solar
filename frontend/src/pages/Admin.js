
import React from "react";
import { Switch, Route, Link, withRouter, Redirect } from 'react-router-dom';
import Table from './components/Table';
import Login from './Login';
import Container from '@material-ui/core/Container';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Grid from '@material-ui/core/Grid';
import Roomreservation from "./roomreservation";
import { Tab } from "@material-ui/core";


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
        let { url } = this.props.match;
        //<Roomreservation />
        return (
            <div>
                <Grid container justify="center" alignItems="center">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link to="/admin/add" color="inherit" href="/" onClick={handleClick}>
                            Room Reserve
                        </Link>
                        <Link to="/admin/assign" color="inherit" href="/getting-started/installation/" onClick={handleClick}>
                            Assign Room
                        </Link>
                        <Link color="inherit" href="/getting-started/installation/" onClick={handleClick}>
                            Room History
                        </Link>
                    </Breadcrumbs>
                </Grid>

                {
                    this.state.pass ? <Redirect to="/admin/add" /> : <Redirect to="/admin" />
                }
                <Switch>
                    <Route exact path={"/admin"}>
                        <Login parentLogin={this.isLogin} />
                    </Route>
                    <Route path={`/admin/add`}>
                        <Container>
                            <Roomreservation />
                        </Container>
                    </Route>
                    <Route path={'/admin/assign'}>
                        <Container>
                            <Table />
                        </Container>
                    </Route>
                </Switch>

            </div>
        );
    }
}


export default withRouter(Admin);