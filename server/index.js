const express = require('express');
const app = express();

var mysql = require('mysql');
const cors = require('cors');
app.use(cors(), express.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'mayeesha8430',
  database: 'urbanstay',
  connectionLimit: 10, 
}); 

const port = 5001;

async function connectAndStartServer() 
{

  app.get('/', (req, res) => {
    res.send('Hello World!');
  }); 
  


  app.post('/guest-signup-page', async (req, res) => {
    const {firstname, lastname, phone_number, email, password} = req.body;

    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    pool.getConnection((err, connection) => {
      if (err) throw err;
      const userSql = `INSERT INTO USER (First_name, Last_name, Phone, Email, Password, Joining_date) VALUES (?, ?, ?, ?, ?, ?)`;
      const userValues = [firstname, lastname, phone_number, email, password, currentDate];
      connection.query(userSql, userValues, (userErr, userResults) => {
        if (userErr) {
          console.error('Error inserting data into USER:', userErr);
          res.status(500).json({ message: 'Error inserting data into USER' });
        } else {
          console.log('Data inserted into USER successfully');
          const guestSql = `INSERT INTO GUEST (UID, Guest_rating_num, Avg_rating) VALUES (?, ?, ?)`;
          const guestValues = [userResults.insertId, '0','0'];
          connection.query(guestSql, guestValues, (guestErr, guestResults) => {
            if (guestErr) {
              console.error('Error inserting data into GUEST:', guestErr);
              res.status(500).json({ message: 'Error inserting data into GUEST' });
            } else {
              console.log('Data inserted into GUEST successfully');
              res.status(200).json({ message: 'Data inserted successfully' });
            }
          });
        }
      });
      connection.release(); 
    });
  });






  app.post('/host-signup-page', async (req, res) => {
    const {firstname, lastname, phone_number, country, city, birthdate, email, password} = req.body;
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    pool.getConnection((err, connection) => {
      if (err) throw err;
      const userSql = `INSERT INTO USER (First_name, Last_name, Phone, Country, City, Birthdate, Email, Password, Joining_date) VALUES (?, ?, ?, ?, ?, ?)`;
      const userValues = [firstname, lastname, phone_number, country, city, birthdate, email, password, currentDate];
      connection.query(userSql, userValues, (userErr, userResults) => {
        if (userErr) {
          console.error('Error inserting data into USER:', userErr);
          res.status(500).json({ message: 'Error inserting data into USER' });
        } else {
          console.log('Data inserted into USER successfully');
          const hostSql = `INSERT INTO HOST (UID, Host_rating_num, Avg_rating) VALUES (?, ?, ?)`;
          const hostValues = [userResults.insertId, '0','0'];
          connection.query(hostSql, hostValues, (hostErr, hostResults) => {
            if (hostErr) {
              console.error('Error inserting data into HOST:', guestErr);
              res.status(500).json({ message: 'Error inserting data into HOST' });
            } else {
              console.log('Data inserted into HOST successfully');
              res.status(200).json({ message: 'Data inserted successfully' });
            }
          });
        }
      });
      connection.release(); 
    });
  });





  app.post('/signin-page', async (req, res) => {
    const { email, password } = req.body;
  
    pool.getConnection((err, connection) => {
      if (err) throw err;
      var sql = `SELECT password FROM user WHERE Email = '${email}'`;
      connection.query(sql, function (err, results, fields) {
        if (err) throw err;
  
        if (results.length > 0) 
        {
          result = results[0].password;
        
          if (result === password) 
          {
           
            res.status(200).send({ userMatched: 1, userData: results[0].email });
          } 
          else 
          {
            res.status(500).send({ userMatched: -1 });
          }
        } else {
          res.status(404).send({ userMatched: -1 });
        }
      });
      connection.release();
    });
  });














    app.post('/host-place', async (req, res) => {

        const { 
            property_name, 
            property_type, 
            bedroom_count, 
            bed_count, 
            bathroom_count, 
            room_count, 
            guest_count, 
            area, 
            availability, 
            description,
            country,
            state,
            zipcode,
            address_line,
            amenities,
            pics
         } = req.body;


         console.log(req.body);
  
        pool.getConnection((err, connection) => {
          if (err) throw err;
          
         
          connection.release(); // Release the connection back to the pool
      });
  

  });

  app.listen(5001, () => {
    console.log(`Example app listening on port 5001`);
  });
}

connectAndStartServer().catch(err => {
  console.error(err);
});



