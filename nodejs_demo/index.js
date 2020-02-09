/*
1. create a new folder in the Desktop with the name 'nodejs_demo'

2. fire up a terminal (cmd), browse to 'nodejs_demo'

3. npm -v
this confirms that you have successfully installed nodejs

4. npm init
5. keep pressing Enter
6. code .

7.

npm install express --save
npm install mysql --save
npm install nodemon --save
npm install pug --save

8. run the below command
nodemon index.js

https://codeshare.io/al1Vng
*/

/**
 * SQL COMMANDS
CREATE DATABSE iot;

USE iot;

CREATE TABLE iotdemo(
	deviceId INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(32),
	val DOUBLE NOT NULL
);

INSERT INTO iotdemo(name, val) VALUES(
	'thermostat',
	32.98
);

INSERT INTO iotdemo(name, val) VALUES(
	'light',
	127
);

INSERT INTO iotdemo(name, val) VALUES(
	'air conditioner',
	1
);

INSERT INTO iotdemo(val) VALUES(
	28.3
);
 */

// adding the dependencies
const express = require('express')
const mysql = require('mysql')
const app = express()

// connecting app to mysql
const con = mysql.createConnection({
    host: 'localhost',
    user: 'john',
    password: 'john123',
    database: 'nodejsdemo'
})

// check if the connection was successful
con.connect((err) => {
    if (err) throw err;
    //else
    console.log('database connected!')
})

// iot devices data
app.get('/iotdevices', (req, res) => {

    var sql = "SELECT * FROM iotdemo;";

    console.log(sql);

    con.query(sql, (err, result) => {
        if (err) {
            res.send('an error has occured')
        }
        // else
        res.json(result);
    })

})

// setting view engine
app.set('view engine', 'pug')

// port no. which our program will listen to
const PORT = 3000

app.get("/", (req, res) => {
    res.send("<html><body><b>hello world 2!</b></body></html>")
})

app.get("/data", (req, res) => {
    res.json({
        "name": "John Doe",
        "age": 21,
        "dob": "1997-08-12",
        "siblings": {
            "hasSiblings": true,
            "nSiblings": 3
        }
    })
})

app.get("/thermostat", (req, res) => {
    res.json({
        "deviceId": "9f2a3b",
        "value": 32
    })
})

// rendering the html file
app.get("/hello", (req, res) => {
    res.render('hello')
})

// starts listening on the specified PORT
app.listen(PORT, () => {
    console.log("goto https://localhost:3000/")
})