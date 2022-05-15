const express = require('express') 
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//Connecting to the Database
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
		console.log("Connected to Database ! App running on http://localhost:5000/")
	})
})

app.get('/', async (request, response)=>{
  //get all users, as an array of objects
  pool.query(`SELECT * FROM users`, async (error, results) => {
        if (error) {
            response.status(400).send(error)
        }
        response.status(200).json( results.rows);
    });
})



app.get('/:id', async(request,response)=>{
    //get user by id and returns a json object
    const id = request.params.id;    
    pool.query(`SELECT * FROM users WHERE userid = ${id}`, async (error, results) => {
        if (error) {
            response.status(400).send(error)
        }
        response.status(200).json(results.rows[0]);
    });
    
})

// post will create one user 
app.post('/', async(request ,response)=>{
    const { email, password, fname, lname, age, gender, height, weight, trainingstatus } = request.body
  
    const QueryCommand = `INSERT INTO users (user_email, user_password, user_fname, user_lname, user_age, gender, user_height, user_weight, user_trainingstatus) values('${request.body.user_email}', '${request.body.user_password}', '${request.body.user_fname}', '${request.body.user_lname}', 
        '${request.body.user_age}', '${gender}', '${request.body.user_height}', '${request.body.user_weight}', '${request.body.user_trainingstatus}')`
    pool.query(QueryCommand, async(error, results) => {
        if(error){
            console.log(QueryCommand)
            console.log(error)
            response.status(400).send(error)
        }
        response.status(201).json(results)
    })
})


// Update the user by id 
app.put('/:id', async (request, response) => {
    // 
    pool.query(`UPDATE users SET user_email = '${ request.body.user_email}', user_password = '${request.body.user_password}', user_fname = '${request.body.user_fname}', user_lname = '${request.body.user_lname}', user_age = '${request.body.user_age}', gender = '${request.body.gender}', user_height = '${request.body.user_height}', user_weight = '${request.body.user_weight}',user_trainingstatus = '${request.body.user_trainingstatus}' WHERE userid = ${request.params.id}`,async  (error, results) => {
        if (error) {
          response.status(400).send(error)
        }
        response.status(200).send(results)
      })
    
})


// delete by the id 
app.delete('/:id', async (request, response) => {
    pool.query(`DELETE FROM users WHERE userid = ${request.params.id}`,async  (error, results) => {
        if (error) {
          response.status(400).send(error)
        }
        response.status(200).send(results)
      })
    
})

