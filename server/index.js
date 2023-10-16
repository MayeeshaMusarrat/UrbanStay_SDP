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
  connectionLimit: 10, // Adjust as needed
}); 

const port = 5001;

async function connectAndStartServer() 
{

  app.get('/', (req, res) => {
    res.send('Hello World!');
  }); 
  
  app.post('/guest-signup-page', async (req, res) => {

    const {firstname, lastname, phone_number, email, password} = req.body;
    console.log(req.body);
    pool.getConnection((err, connection) => {
      if (err) throw err;
      
      console.log("Successful");  
      var sql = `INSERT INTO USER_INFO (Fname, Lname, Phone, Email, pass) VALUES ('${firstname}', '${lastname}', '${phone_number}', '${email}', '${password}') `;
      connection.query(sql,function(err,results,fields)
      {
        if(err) throw err;

      });
      
      connection.release(); // Release the connection back to the pool
  });

  });

  app.post('/signin-page', async (req, res) => {

      const { email, password } = req.body;
      console.log("HII I'm in the sign-in page!");

      pool.getConnection((err, connection) => {
        if (err) throw err;
        
        // Use the connection
        console.log("Successful");
        var sql = `select pass from user_info where Email = '${email}'`;
        connection.query(sql,function(err,results,fields)
        {
          if(err) throw err;
          result = results[0].pass;
          if (result === password)
          {
            console.log("PASSWORD MATCHEDD!!");
            res.send({userMatched: 1, userData: result});
          }
          else {
            res.send({userMatched : -1});
          }
        });
        connection.release(); // Release the connection back to the pool
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

        console.log("HII I'm in hosting backend!");
  
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



