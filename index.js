const express = require('express');

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


const Pool = require('pg').Pool;
const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'MyGym',
	password: 'Plifplouf123',
	dialect: 'postgres',
	port: 5432
});

pool.connect((err, client, release) => {
	if (err) {
		return console.error(
			'Error acquiring client', err.stack)
	}
	client.query('SELECT NOW()', (err, result) => {
		release()
		if (err) {
			return console.error(
				'Error executing query', err.stack)
		}
		console.log("Connected to Database ! App running on port 3000")
	})
})



const db = require('./queries')
app.get('/users', (res, req)=> {
	pool.query('SELECT * FROM users', (error, results) => {
        if(error) 
			req
	
	
})
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

const server = app.listen(3000, function () {
	let host = server.address().address
	let port = server.address().port
})
