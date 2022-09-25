const mysql = require('mysql')
const users = require('./seed-data/users')
const assessment = require('./seed-data/assessment')
const feedback = require('./seed-data/feedback')

// Create MySQL connection
const db = mysql.createConnection({
  host      : 'localhost',
  user      : 'root',
  password  : '',
  port      : "3306",
  database  : 'react_node'
  // socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
}) 

// Connect to MySQL database
db.connect((err) => {
  if(err){
    throw err
  }
  console.log('MySQL database connected...')
})


// todo: implement persistence
const reviews = {}
users.forEach(u => reviews[String(u.id)] = assessment)

// todo: replace header check with auth
/*
function routes (app) {
  app.get('/users', (req, res) => {
    res.send(users)
  })
*/
function routes (app) {
  
  // Get employees
  app.get('/employee/list', (req, res) => {
    let sql = 'SELECT * FROM employees'
    let query = db.query(sql, (err, results) => {
      if(err) throw err
      console.log(results)
      res.send(results)
    })
  })
 
  // Get employee
  app.post('/employee/get', (req, res) => {
    let sql = `SELECT * FROM employees where id = ${req.body.id}`
    let query = db.query(sql, (err, results) => {
      if(err) throw err
      console.log(results)
      res.send(results)
    })
  })

  // Edit employee
  app.post('/employee/update', (req, res) => {
    console.log('Updating employee...')
    console.log(req.body)
    let sql = `UPDATE employees SET first = '${req.body.firstName}', last = '${req.body.lastName}', age = '${req.body.age}' WHERE id = ${req.body.selectedId}`
    let query = db.query(sql, (err, result) => {
      if(err) throw err
      console.log(result)
      res.send(result)
    })
  })

  // Insert a new employee
  app.post('/employee/create', (req, res) => {
    console.log('Inserting a new employee...')
    console.log(req.body)
    let sql = `INSERT INTO employees (adminid, first, last, age) VALUES (1, '${req.body.firstName}', '${req.body.lastName}', '${req.body.age}')`
    let query = db.query(sql, (err, result) => {
      if(err) throw err
      console.log(result)
      res.send('Employee added...')
    })
  })


  // Delete employee
  console.log('Deleting employee...')
  app.get('/employee/delete/:id', (req, res) => {
    let sql = `DELETE FROM employees WHERE id = ${req.params.id}`
    let query = db.query(sql, (err, result) => {
      if(err) throw err
      console.log(result)
      res.send('Employee deleted...')
    })
  })

}

module.exports = routes
