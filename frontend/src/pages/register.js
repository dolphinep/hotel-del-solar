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
      tel: '',
      typeid: null,
      selectedCheckInDate: 'null',
      selectedCheckOutDate: 'null',
      amount: 0,
      customer_id: '',
      reserved_id:0,
      stay_night: 0,
      reserve_status:'Wait'
    }
  }

  componentDidMount() {

    this.setState({selectedCheckInDate:  this.getUrlVars()["checkin"]});
    this.setState({selectedCheckOutDate: this.getUrlVars()["checkout"]});
    //this.state.selectedCheckOutDate = this.getUrlVars()["checkout"];
    this.setState({typeid: this.getUrlVars()["typeid"]}) ;
    this.setState({amount: this.getUrlVars()["amount"]}) ;
    //console.log(this.state);
    //console.log("HI");
    this.setState({stay_night:parseInt(this.getUrlVars()["checkout"].slice(-2))
    -parseInt(this.getUrlVars()['checkin'].slice(-2))})
  }

  getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
      vars[key] = value;
    });
    return vars;
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

  addCustomer = async _ => {

    const that=this;
    await fetch(`http://localhost:4000/customerid`)
      .then(response=>response.json())
      .then(function(jsonData){
        return JSON.stringify(jsonData);
      })
      .then(function(jsonStr){
        var t=JSON.parse(jsonStr);
        var min=parseInt(t.data[0].CUSTOMER_ID)+1
        const min2 = min.toString();
        that.setState({customer_id: min2});
      })
      .catch(err=>console.error(err),this.setState({customer_id: '1'}))
      //console.log(this.state.customer_id)
    
    await fetch(`http://localhost:4000/reserveid`)
    .then(response=>response.json())
    .then(function(jsonData){
      return JSON.stringify(jsonData);
    })
    .then(function(jsonStr){
      var t=JSON.parse(jsonStr);
      var min=parseInt(t.data[0].RESERVED_ID)+1
      const min2 = min.toString();
      that.setState({reserved_id: min2});
    })
    .catch(err=>console.error(err),this.setState({reserved_id: 1}))

    //console.log(this.state)
    let data4 = {
      reserved_id:this.state.reserved_id,
      typeid:this.state.typeid,
      amount:this.state.amount
    }
    await fetch('http://localhost:4000/reserved', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data4)

    }).then(response => response.json)
      .catch(err => console.error(err),window.location.href = '/')

    let data3 = {
      reserved_id:this.state.reserved_id,
      checkin_date:this.state.selectedCheckInDate,
      checkout_date:this.state.selectedCheckOutDate,
      customer_id:this.state.customer_id,
      stay_night:this.state.stay_night,
      reserve_status:this.state.reserve_status
    }
    await fetch('http://localhost:4000/roomreserved', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data3)

    }).then(response => response.json)
      .catch(err => console.error(err),window.location.href = '/')

    let data = {
      citizenID: this.state.citizen_id,
      fname: this.state.fname,
      lname: this.state.lname,
      gender: this.state.gender,
      bdate: this.state.bdate,
      email: this.state.email,
      tel: this.state.tel
    }
    await fetch('http://localhost:4000/addcustomer2', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)

    }).then(response => response.json)
      .catch(err => console.error(err))

    let data2 = {
      citizenID: this.state.citizen_id,
      customer_id: this.state.customer_id
    }
    console.log("data2",data2)
    await fetch('http://localhost:4000/addcustomer', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data2)
    
    }).then(response => response.json)      
      //.then(window.location.href = '/')
      .then(alert("success"))
      .catch(err => console.error(err))

  }

  render() {
    console.log("state",this.state)
    //console.log('test',this.state.stay_night)
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
                  <MenuItem value={'Male'}>Male</MenuItem>
                  <MenuItem value={'Female'}>Female</MenuItem>
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
              //onClick={this.getCustomerID}
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


