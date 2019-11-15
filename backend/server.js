
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

//const SELECT_ALL_PRODUCTS_QUERY = 'SELECT * FROM test';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1480', //////////////FILLHERE
    database: 'hotel' //////////////FILLHERE
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