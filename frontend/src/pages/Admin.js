import React,{ Component } from "react";

const validate = [{id:"p",password: '1234'}];


class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: ' '
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

   onSubmit = (e) => {
       e.preventDefault();
       const form = {
        password: this.state.password
       }
      
       this.setState({
            password: ''
       })

       if(form.password == validate[0].password){
            alert("success")
       }
       else{
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
                        onChange={e => this.handleChange(e)}/>
                </label>
                <button onClick={(e) => this.onSubmit(e)}>SUBMIT</button>         
            </form>
            </div>
        );
    }
}


export default Admin;