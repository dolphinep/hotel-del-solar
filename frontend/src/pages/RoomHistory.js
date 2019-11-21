import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class RoomHistory extends Component{

    constructor(props){
        super(props);
        this.createData = this.createData.bind(this);
        this.getHistory = this.getHistory.bind(this);
    }

    state ={
        history: []
    }

    useStyles = makeStyles({
        root: {
          width: '100%',
          overflowX: 'auto',
        },
        table: {
          minWidth: 650,
        },
        
      });
      
      useStyles2 = makeStyles(theme => ({
        button: {
          margin: theme.spacing(1),
        },
        input: {
          display: 'none',
        },
      }));

      createData(ROOM_ID,DATE,CUSTOMER_ID) {
        return {ROOM_ID,DATE,CUSTOMER_ID};
      }

      rows = [

      ];

    componentDidMount(){
        this.getHistory();
    }

    getHistory = _ => {
        fetch('http://localhost:4000/history')
            .then(response => response.json())
            .then(response => this.setState({ history: response.data }))
            .then(data => console.log(data))
            .then(console.log(this.state.history))
            // .then(response => this.rows.push(createData(response.data))
            .catch(err => console.error(err))
    }

    render(){
        const {history} = this.state;
        const classes = this.useStyles;
        const classes2 = this.useStyles2;
        this.rows =  history ;
        console.log(history)
        console.log(this.rows)
        
        return(
            <div>
                <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>RoomID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>CustomerID</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {this.rows.map(row => (
            <TableRow >
              
              <TableCell align="left">{row.ROOM_ID}</TableCell>
              <TableCell align="left">{row.DATE}</TableCell>
              <TableCell align="left">{row.CUSTOMER_ID}</TableCell>
            </TableRow>
          ))}

        </TableBody>
      </Table>
    </Paper>



            </div>
        )
    }
}

export default RoomHistory;
