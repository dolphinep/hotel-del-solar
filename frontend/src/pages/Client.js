import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import Room1 from './components/room1.jpg'
import Room2 from './components/room2.jpg'
import Room3 from './components/room3.jpg'
import Room4 from './components/room4.jpg'
import Radio from '@material-ui/core/Radio';
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ColorButton from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter
} from "react-router-dom";

class Client extends Component {

    constructor(props) {
        super(props);
        this.state = {
            availableroom: 'NULL',
            selectedValue: '101',
            selectedCheckInDate: null,
            selectedCheckOutDate: null,
            amount: 0,
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

    Type_IDToRoomName(id) {
        if (id === '101') return 'Standard';
        if (id === '102') return 'Superior';
        if (id === '103') return 'Deluxe';
        if (id === '104') return 'Suit';
        return 'NULL'
    }

    nextPage = _ => {
        console.log(this.state.availableroom)
        console.log(this.state.amount)
        if (this.state.availableroom < this.state.amount) alert("Sorry rooms are not enough for you T^T ");
        else if (this.state.availableroom >= this.state.amount) {
            const that = this;
            const { selectedCheckInDate, selectedCheckOutDate, selectedValue, amount } = this.state;
            fetch(`http://localhost:4000/upavailableroom?checkin=${selectedCheckInDate}&checkout=${selectedCheckOutDate}
            &typeid=${selectedValue}&amount=${amount}`)
            alert("Save to database");
            window.location.href = '/register';
        }
        else alert("Please fill in your conditions")
    }

    getAvailableroom = _ => {
        const that = this;
        const { selectedCheckInDate, selectedCheckOutDate, selectedValue } = this.state;
        fetch(`http://localhost:4000/availableroomcalendar?checkin=${selectedCheckInDate}&checkout=${selectedCheckOutDate}&typeid=${selectedValue}`)
            .then(response => response.json())
            .then(function (jsonData) {
                return JSON.stringify(jsonData);
            })
            .then(function (jsonStr) {
                //this.setState({apiInfo: jsonStr});
                var t = JSON.parse(jsonStr);
                var i;
                var min = 999;
                if (t.data.length - 1 !== 0) {
                    for (i = 0; i < t.data.length - 1; i++) {
                        if (t.data[i].AMOUNTAVAILABLE < min)
                            min = t.data[i].AMOUNTAVAILABLE;
                    }
                    console.log(min);
                    that.setState({ availableroom: min });
                    min = 999;
                }
                else {
                    that.setState({ availableroom: 'NULL' });
                }
            })
            .catch(err => console.error(err))
    }

    handleChange = event => {
        this.setState({
            selectedValue: event.target.value
        });
    }


    handleCheckInDateChange = date => {
        var d = new Date('Fri Nov 01 2019');
        var d2 = new Date('Mon Dec 1 2019');
        if (date < d) {
            alert("Sorry this day has passed.");
        }
        else if (date > d2) {
            alert("Sorry this day is out of provide.");
        }
        else {
            const newdate = this.formatDate(date);
            this.setState({
                selectedCheckInDate: newdate
            })
        };
    }

    handleCheckOutDateChange = date => {
        const newdate = this.formatDate(date);
        var d2 = new Date('Mon Dec 1 2019');
        console.log(date)
        if (newdate < this.state.selectedCheckInDate) {
            alert("Sorry you can not select this day.");
        }
        else if (date > d2) {
            alert("Sorry this day is out of provide.");
        }
        else {
            this.setState({
                selectedCheckOutDate: newdate
            });
        }
    }

    handleChangeAmount = event => {
        this.setState({
            amount: event.target.value,
        });
    }

    render() {
        return (
            <div align='center'>
                <h1 style={{ color: '#3f51b5' }}>
                    Let's select your Room & Date!
                </h1><br></br>
                <h3 style={{ color: '#1C265F' }}>
                    Step 1 : Please choose your room.
                </h3><br></br>
                <Grid container justify="center">
                    <Grid>
                        <img src={Room1} alt='Room1' width="330" height="201"></img>
                        <figcaption>
                            <Radio
                                checked={this.state.selectedValue === '101'}
                                onChange={this.handleChange}
                                value='101'
                                name="radio-button-demo"
                                inputProps={{ 'aria-label': '101' }}
                            />
                            Standard Room
                        </figcaption>
                    </Grid>
                    <Grid >
                        <img src={Room2} alt='Room2' width="330" height="201"></img>
                        <figcaption>
                            <Radio
                                checked={this.state.selectedValue === '102'}
                                onChange={this.handleChange}
                                value="102"
                                name="radio-button-demo"
                                inputProps={{ 'aria-label': '102' }}
                            />
                            Superior Room
                        </figcaption>
                    </Grid>
                    <Grid >
                        <img src={Room3} alt='Room3' width="330" height="201"></img>
                        <figcaption>
                            <Radio
                                checked={this.state.selectedValue === '103'}
                                onChange={this.handleChange}
                                value="103"
                                name="radio-button-demo"
                                inputProps={{ 'aria-label': '103' }}
                            />
                            Deluxe Room
                        </figcaption>
                    </Grid>
                    <Grid >
                        <img src={Room4} alt='Room4' width="330" height="201"></img>
                        <figcaption>
                            <Radio
                                checked={this.state.selectedValue === '104'}
                                onChange={this.handleChange}
                                value='104'
                                name="radio-button-demo"
                                inputProps={{ 'aria-label': '104' }}
                            />
                            Suit Room
                        </figcaption>
                    </Grid>
                </Grid>
                <br></br>
                <h3 style={{ color: '#1C265F' }}>
                    Step 2 : Please choose your check in/out date.
                </h3>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="center">
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Check in Date"
                            value={this.state.selectedCheckInDate}
                            onChange={this.handleCheckInDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        /> &nbsp;&nbsp;&nbsp;&nbsp;
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Check out Date"
                            value={this.state.selectedCheckOutDate}
                            onChange={this.handleCheckOutDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />

                    </Grid>
                </MuiPickersUtilsProvider><br></br>
                <ColorButton variant="contained" style={{ backgroundColor: '#65b33d', color: '#ffffff' }}
                    onClick={this.getAvailableroom}>
                    Search
                </ColorButton >
                &nbsp;&nbsp;Available of  {this.Type_IDToRoomName(this.state.selectedValue)} Room = {this.state.availableroom}
                <div><br></br>
                    <h3 style={{ color: '#1C265F' }}>
                        Step 3 : How many room do you want to reserve.
                </h3>
                    <FormControl>
                        <InputLabel id="demo-customized-select-label">Amount</InputLabel>
                        <Select
                            labelId="demo-customized-select-label"
                            id="demo-customized-select"
                            value={this.state.amount}
                            onChange={this.handleChangeAmount}
                        //input={<BootstrapInput />}
                        >
                            <MenuItem value='0'>
                                <em>0</em>
                            </MenuItem>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={7}>7</MenuItem>
                            <MenuItem value={8}>8</MenuItem>
                            <MenuItem value={9}>9</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                        </Select>
                    </FormControl><br></br>  <br></br>
                    <Link to='/register'>
                        <ColorButton variant="contained" style={{ backgroundColor: '#4BA7E3', color: '#ffffff' }}>
                            Next
                    </ColorButton >
                    </Link>
                    <ColorButton variant="contained" style={{ backgroundColor: '#4BA7E3', color: '#ffffff' }}
                        onClick={this.nextPage}>
                        Next
                    </ColorButton >
                </div><br></br>  <br></br>  <br></br>  <br></br>
            </div>
        )
    }
}
export default Client;