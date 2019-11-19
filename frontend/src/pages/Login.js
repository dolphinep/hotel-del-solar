import React from "react";
import ColorButton from '@material-ui/core/Button';


const validate = { id: "p", password: '1234' };


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: true,
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

        if (await form.password === validate.password) {
            //alert("success")
            this.props.parentLogin(true);
        } else {
            alert("Fail")
        }
    }


    render() {
        return (
            <div align='center'>
                <form>
                <br/>  <br></br> <br></br>  <br></br> <br></br>  <br></br> <br></br>  <br></br>
                    <label>
                        <h1 style={{ color: '#3f51b5' , fontSize: 40}}>Please Enter Password</h1>
                        <input
                            type={this.state.hidden ? "password" : "text"}
                            style={{width:420, height: 40,fontSize: 20,textAlign: 'center'}}
                        
                            placeholder="Type password here"
                            name='password'
                            value={this.state.password}
                            onChange={e => this.handleChange(e)} />
                        
                    </label>
                    <br></br>  <br></br>
                    <ColorButton variant="contained" style={{ width: 80, backgroundColor: '#4BA7E3', color: '#ffffff' }}
                    onClick={(e) => this.onSubmit(e)}>
                        SUBMIT
                    </ColorButton >
                </form>
            </div>
        );
    }
}

export default Login;