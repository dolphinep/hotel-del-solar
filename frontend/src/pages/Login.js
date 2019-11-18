import React, { Component } from "react";
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import { Table } from "@material-ui/core";

const validate = { id: "p", password: '1234' };


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: null,
            pass: false,
        };
        this.onSubmit.bind(this)
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const form = {
            password: this.state.password
        }

        this.setState({
            password: ''
        })

        if (await form.password == validate.password) {
            alert("success")
            this.props.parentLogin(true);
        } else {
            alert("Fail")
        }
    }


    render() {
        return (
            <div>
                <form>
                    <label>
                        <h1>Password:</h1>
                        <input
                            name='password'
                            value={this.state.password}
                            onChange={e => this.handleChange(e)} />
                    </label>

                    <button onClick={(e) => this.onSubmit(e)}>
                        SUBMIT
                    </button>
                </form>
            </div>
        );
    }
}

export default Login;