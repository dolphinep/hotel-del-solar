const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const config = require('./config.json');
const app = express();
const bodyParser = require('body-parser')
console.log(config);
//const SELECT_ALL_PRODUCTS_QUERY = 'SELECT * FROM test';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Gamerpg46842', //////////////FILLHERE
    database: 'hotel', //////////////FILLHERE
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
app.use(bodyParser.json());

app.get('/addhousekeeping', (req, res)=>{
    const {housekeeping_id, age, first_name, last_name, tel} = req.query;
    const INSERT_HOUSEKEEPING = `INSERT INTO housekeeping(HOUSEKEEPING_ID, AGE, FIRST_NAME, LAST_NAME, TEL) 
    VALUES(${housekeeping_id}, ${age}, '${first_name}', '${last_name}', '${tel}')`;

    connection.query(INSERT_HOUSEKEEPING, (err, results) => {
        if (err) {
            return res.send("Error ", err);
        }
        else {
            return res.send('success add');
        }
    })
    console.log(INSERT_HOUSEKEEPING);

})

app.get('/availableroomcalendar', (req, res) => {
    const { typeid, checkin, checkout } = req.query;
    const SELECT_AMOUNT_IN_DAY = `SELECT AMOUNTAVAILABLE FROM availableroomcalendar WHERE SELECT_DATE >= '${checkin}' AND SELECT_DATE <= '${checkout}' AND TYPE_ID = ${typeid}`;
    connection.query(SELECT_AMOUNT_IN_DAY, (err, results) => {
        if (err) {
            return res.send(err)
        }
        else {
            return res.json({
                data: results
            })
        }
    })
})


app.get('/', (req, res) => {
    res.send('go to /add')
});

//PING add housekeeping
app.post('/addhousekeeping2', (req, res) => {
    const { housekeeping_id, age, first_name, last_name, tel } = req.body;
    const INSERT_HOUSEKEEPING = `INSERT INTO housekeeping(HOUSEKEEPING_ID, AGE, FIRST_NAME, LAST_NAME, TEL) 
    VALUES(${housekeeping_id}, ${age}, '${first_name}', '${last_name}', '${tel}')`;

    connection.query(INSERT_HOUSEKEEPING, (err, results) => {
        if (err) {
            return res.status("Error", err);
        }
        else {
            res.send(results);
            return res.status("Success :");
        }
    })
})
//PING add  to customer2 
app.post('/addcustomer2', (req, res) => {
    const { citizenID, fname, lname, gender, bdate, email, tel } = req.body;
    const Add = `INSERT INTO customer2(CITIZEN_ID, FNAME, LNAME, GENDER, BDATE, EMAIL, TEL) 
    VALUES(${citizenID}, '${fname}', '${lname}', '${gender}', '${bdate}', '${email}', '${tel}')`;

    connection.query(Add, (err, results) => {
        if (err) {
            return res.status("Error", err);
        }
        else {
            res.json(results);
        }
    })
})
//PING add room !!MUST already has type_id in room_type first
app.post('/room/add', (req,res) => {
    const {roomID, typeID, roomNum, floor} = req.body;
    const toAdd = `INSERT INTO room(ROOM_ID, TYPE_ID, ROOM_NUMBER, FLOOR) 
    VALUES(${roomID}, ${typeID}, ${roomNum}, ${floor})`;

    connection.query(toAdd, (err,results) => {
        if (err) {
            return res.status("Error", err);
        }
        else {
            console.log(results)
            res.json(results);
        }
    })
})
//PING get all customer
app.get('/customer2', (req, res) => {
    const cus = `SELECT * FROM customer2`

    connection.query(cus, (err, results) => {
        if (err) throw error;
        res.end(JSON.stringify(results));
    })
})

//Add by Nai
app.post('/addcustomer',(req,res)=>{
    const {citizenID,customer_id}=req.body;
    const toAdd=`INSERT INTO customer(CITIZEN_ID,CUSTOMER_ID)
    VALUES('${citizenID}',${customer_id})`;

    connection.query(toAdd, (err,results) => {
        if (err) {
            return res.status("Error", err);
        }
        else {
            console.log(results)
            res.json(results);
        }
    })
})

//Nai add room_reserved
app.post('/roomreserved',(req,res)=>{
    const {reserved_id,checkin_date,checkout_date,customer_id,stay_night}=req.bofy;
    const toAdd=`INSERT INTO room(RESERVED_ID, CHECKIN_DATE, CHECKOUT_DATE, CUSTOMER_ID,STAY_NIGHT) 
    VALUES(${reserved_id}, '${checkin_date}', '${checkout_date}', ${customer_id},${stay_night})`;
    connection.query(toAdd, (err,results) => {
        if (err) {
            return res.status("Error", err);
        }
        else {
            console.log(results)
            res.json(results);
        }
    })
})

//PING get all housekeeping
app.get('/housekeeping', (req, res) => {
    const cus = `SELECT * FROM housekeeping`

    connection.query(cus, (err, results) => {
        if (err) throw error;
        res.end(JSON.stringify(results));
    })
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

app.get('/upavailableroom',(req, res)=> {
    const {typeid, checkin, checkout, amount} = req.query;
    const UPDATE_AMOUNT_IN_DAY = `UPDATE availableroomcalendar SET AMOUNTAVAILABLE=AMOUNTAVAILABLE-'${amount}' WHERE SELECT_DATE >= '${checkin}' AND SELECT_DATE < '${checkout}' AND TYPE_ID = ${typeid}`;
    connection.query(UPDATE_AMOUNT_IN_DAY, (err, results) => {
        if(err){
            return res.send(err)
        }
        else{
            return res.json({
                data: results
            })
        }
    })
})

app.listen(4000, () => {
    console.log('Products server listening on port 4000');

})