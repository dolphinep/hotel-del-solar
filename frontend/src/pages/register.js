import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {
  KeyboardDatePicker, MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

class Register extends Component {

  constructor(props) {
    super();
    this.state = {
      citizen_id: '',
      fname: '',
      lname: '',
      gender: '',
      bdate: null,
      email: '',
      tel: ''
    }
  }

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  handleChangeCit = event => {
    this.setState({
      citizen_id: event.target.value
    });
  }

  handleChangeFname = event => {
    this.setState({
      fname: event.target.value
    });
  }

  handleChangeLname = event => {
    this.setState({
      lname: event.target.value
    });
  }

  handleBdateChange = date => {
    const newdate = this.formatDate(date);
    this.setState({
      bdate: newdate
    });
  }

  handleChangeGender = event => {
    this.setState({
      gender: event.target.value,
    });
  }

  handleChangeEmail = event => {
    this.setState({
      email: event.target.value
    });
  }

  handleChangeTel = event => {
    this.setState({
      tel: event.target.value
    });
  }

  addCustomer = _ => {
    console.log(this.state)
    let data = {
      citizenID: this.state.citizen_id,
      fname: this.state.fname,
      lname: this.state.lname,
      gender: this.state.gender,
      bdate: this.state.bdate,
      email: this.state.email,
      tel:this.state.tel
    }
    fetch('http://localhost:4000/addcustomer2', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
      
    }).then(response => response.json)
      .then(response => console.log("Hi"))
      .catch(err => console.error(err))
  }

  render() {
    return (
      <Container component="main" maxWidth="xs">

        <div align='center' spacing={5}>
          <h1 style={{ color: '#3f51b5' }}>
            We'd like to know more about you!
      </h1><br></br>
          <h3 style={{ color: '#1C265F' }}>
            Step 4 : Please fill your information.
        </h3><br></br>
          <form>
            <Grid container spacing={5} >
              <Grid item xs={12}>
                <TextField
                  value={this.state.citizen_id}
                  onChange={this.handleChangeCit}
                  name="citizen_id"
                  required
                  fullWidth
                  id="citizen_id"
                  label="Citizen ID or Passport ID"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={this.state.fname}
                  onChange={this.handleChangeFname}
                  name="fname"
                  required
                  fullWidth
                  id="fname"
                  label="First Name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={this.state.lname}
                  onChange={this.handleChangeLname}
                  required
                  fullWidth
                  id="lname"
                  label="Last Name"
                  name="lname"
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <InputLabel id="gender_label">Gender*</InputLabel>
                <Select
                  value={this.state.gender}
                  onChange={this.handleChangeGender}
                  required
                  variant="standard"
                  label="Gender"
                  id="gender"
                  name="gender"

                //input={<BootstrapInput />}
                >
                  <MenuItem value={1}>Male</MenuItem>
                  <MenuItem value={2}>Female</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={10}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>

                  <KeyboardDatePicker
                    required
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    id="bdate"
                    name="bdate"
                    label="Birthday"
                    value={this.state.bdate}
                    onChange={this.handleBdateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}>

                  </KeyboardDatePicker>
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={this.state.email}
                  onChange={this.handleChangeEmail}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={this.state.tel}
                  onChange={this.handleChangeTel}
                  required
                  fullWidth
                  name="tel"
                  id="tel"
                  label="Telephone Number"
                  id="tel" />

              </Grid>

            </Grid>

            <Grid container justify="flex-end">

            </Grid>
            <br></br>
            <Button
              onClick={this.addCustomer}
              type="submit"
              size="medium"
              variant="contained"
              color="primary">
              SUBMIT
        </Button>
          </form>

        </div>

      </Container>
    );
  }
}

export default Register;


