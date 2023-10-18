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
    const date = new Date(birthdate);
    const birthdatePart = date.toISOString().split('T')[0];
    console.log(req.body);

    pool.getConnection((err, connection) => {
      if (err) throw err;
      const userSql = `INSERT INTO USER (First_name, Last_name, Phone, Birthdate, Email, Password, Joining_date) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      const userValues = [firstname, lastname, phone_number, birthdatePart, email, password, currentDate];
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


  app.post('/', async (req, res) => {
    const {destination, checkin, checkout, rooms, guests} = req.body;
    const check_in = checkin.toString().split('T')[0];
    const check_out = checkout.split('T')[0];
    console.log(req.body);

    pool.getConnection((err, connection) => {
      if (err) throw err;

      const searchSql = `SELECT * FROM PROPERTY WHERE Country = ? AND ? BETWEEN Check_in_date AND Check_out_date AND ? BETWEEN Check_in_date AND Check_out_date AND Num_of_rooms >= ? AND Num_of_guests >= ?;`;

      const searchValues = [destination, checkin, checkout, rooms, guests ];

      connection.query(searchSql, searchValues, (searchErr, searchResults) => {
        if (searchErr) {
          console.error('Error fetching data:', searchErr);
          res.status(500).json({ message: 'Fetching Error' });
        } else {
          console.log('Data fetched from PROPERTY successfully.');
          console.log(searchResults);
          res.status(200).json({message: "Data fetched"});
        }
      });
      connection.release(); 
    });
  });


  app.post('/confirm-listing', async (req, res) => {
    const {
      property_title,
      property_category,
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
      pics,
      pricePerNight,
      email,
    } = req.body;
  
    console.log(req.body);
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const startDate = new Date(availability[0]);
    const endDate = new Date(availability[1]);
    const formattedStartDate = startDate.toISOString().slice(0, 19).replace('T', ' ');
    const formattedEndDate = endDate.toISOString().slice(0, 19).replace('T', ' ');
  
    console.log(formattedStartDate);
  
    pool.getConnection((err, connection) => {
      if (err) {
        throw err;
      }
  
      const userSql = `SELECT UID FROM user WHERE Email = '${email}'`;
  
      connection.query(userSql, (userErr, userResults) => {

        if (userErr) 
        {
          console.error('Error extracting data from USER:', userErr);
          res.status(500).json({ message: 'Error inserting data into USER' });
        } 
        else 
        {
          console.log('USER UID extracted successfully');
          const userUID = userResults[0].UID;
  
          const listingSql = `INSERT INTO PROPERTY (Property_title, Zipcode, Num_of_guests, Price_per_night, Created, Check_in_date, Check_out_date, Num_of_ratings, Avg_ratings, UID, City, Country, Description, Num_of_rooms, Address_line, Category, Num_of_bedrooms, Num_of_bathrooms, Num_of_beds ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
          
          const price = parseFloat(Price_per_night);

          const listingValues = [property_title, zipcode, guest_count, price, currentDate, formattedStartDate, formattedEndDate, '0', '0.0', userUID, state, country, description, room_count, address_line, property_category, bedroom_count, bathroom_count, bed_count];
  
          connection.query(listingSql, listingValues, (listingErr, listingResults) => {
            if (listingErr) {
              console.error('Error inserting data into PROPERTY:', listingErr);
              res.status(500).json({ message: 'Error inserting data into PROPERTY' });
            } else {
              console.log('Data inserted into PROPERTY successfully');
              res.status(200).json({ message: 'Data inserted successfully' });
            }
          });
        }
        connection.release();
      });
    });
  });
  

  

  app.listen(5001, () => {
    console.log(`Example app listening on port 5001`);
  });
}

connectAndStartServer().catch(err => {
  console.error(err);
});



