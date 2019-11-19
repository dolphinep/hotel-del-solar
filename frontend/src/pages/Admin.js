
import React from "react";
import { Switch, Route, Link, withRouter, Redirect } from 'react-router-dom';
import Table from './components/Table';
import Login from './Login';
import Container from '@material-ui/core/Container';
import Roomreservation from "./roomreservation";

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

                
                <Switch>
                    <Route exact path={"/admin"}>
                        <Login parentLogin={this.isLogin} />
                    </Route>
                    <Route path={`/admin/:topicId`}>
                        <Container>
                        <Link to={`${url}/add`}>Table</Link>
                            {
                                this.state.pass ? <Redirect to="/admin/add" /> : <Redirect to="/admin" />
                            }
                                <Roomreservation />
                        </Container>
                    </Route>
                </Switch>
                
            </div>
        );
    }
}


export default withRouter(Admin);