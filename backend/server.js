
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

//const SELECT_ALL_PRODUCTS_QUERY = 'SELECT * FROM test';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
<<<<<<< HEAD
    password: 'Gamerpg46842', //////////////FILLHERE
    database: 'hotel' //////////////FILLHERE
=======
    password: 'minus51973', //////////////FILLHERE
    database: 'hoteldelsolar', //////////////FILLHERE
>>>>>>> 874a259f88c450919f0758438c981e9223a108d4
});

connection.connect(err => {
    if (err) {
        console.log(err);
    } 
    else {
        console.log('Connected to the MySQL server');
    }
});

app.use(cors());

app.get('/addhousekeeping', (req, res)=>{
    const {housekeeping_id, age, first_name, last_name, tel} = req.query;
    const INSERT_HOUSEKEEPING = `INSERT INTO housekeeping(HOUSEKEEPING_ID, AGE, FIRST_NAME, LAST_NAME, TEL) 
    VALUES(${housekeeping_id}, ${age}, '${first_name}', '${last_name}', '${tel}')`;

    connection.query(INSERT_HOUSEKEEPING, (err,results)=>{
        if(err){
            return res.send(err);
        }
        else{
            return res.send('success add');
        }
    })
    console.log(INSERT_HOUSEKEEPING);
    
})

app.get('/', (req,res) => {
    res.send('go to /add')    
});

app.listen(4000, () => {
    console.log('Products server listening on port 4000');

})

// Roomreservation
app.get('/roomreservation', (req, res)=>{
    const SELECTROOMRESERVATION = `SELECT * FROM roomreserved WHERE STATUS="wait"`;

    connection.query(SELECTROOMRESERVATION, (err,results)=>{
        if(err){
            
            return res.send(err);
        }
        else{
            return res.json({
                data: results
            })
        }
    })
    
})

app.get('/roomreservationdelete', (req, res)=>{
    const {cusid} = req.query;
    const SELECTROOMRESERVATION = `DELETE FROM roomreserved WHERE CUSTOMER_ID='${cusid}'`;

    connection.query(SELECTROOMRESERVATION, (err,results)=>{
        if(err){
            
            return res.send(err);
        }
        else{
            return res.json({
                data: results
            })
        }
    })
    
})

app.get('/roomreservationpayed', (req, res)=>{
    const {cusid} = req.query;
    const SELECTROOMRESERVATION = `UPDATE roomreserved SET STATUS = 'payed' WHERE CUSTOMER_ID='${cusid}'`;

    connection.query(SELECTROOMRESERVATION, (err,results)=>{
        if(err){
            
            return res.send(err);
        }
        else{
            return res.json({
                data: results
            })
        }
    })
    
})

app.get('/createpayment', (req, res)=>{
    const {cusid} = req.query;
    const SELECTROOMRESERVATION = `INSERT INTO payment WHERE CUSTOMER_ID='${cusid}'`;

    connection.query(SELECTROOMRESERVATION, (err,results)=>{
        if(err){
            
            return res.send(err);
        }
        else{
            return res.json({
                data: results
            })
        }
    })
    
})