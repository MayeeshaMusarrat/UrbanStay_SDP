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
    const {firstname, lastname, phone_number, country, city, birthdate, email, password, profile_pic} = req.body;
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const date = new Date(birthdate);
    const birthdatePart = date.toISOString().split('T')[0];
    console.log(req.body);

    pool.getConnection((err, connection) => {
      if (err) throw err;
      const userSql = `INSERT INTO USER (First_name, Last_name, Phone, Birthdate, Email, Password, Joining_date, Profile_picture) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      const userValues = [firstname, lastname, phone_number, birthdatePart, email, password, currentDate, profile_pic];
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

    console.log("sign in");
  
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



  /********************************** Browse   */ 




  app.get('/browse', async (req, res) => {
    const { destination, checkIn, checkOut, rooms, guests } = req.query;
   
    console.log(req.query);

    pool.getConnection((err, connection) => {
      if (err) throw err;

      const searchSql = `
      SELECT p.*
      FROM property p
      WHERE
      (p.Country = ? OR p.City = ?)
      AND p.Num_of_rooms >= ?
      AND p.Num_of_guests >= ?
      AND p.Check_in_date <= ?
      AND p.Check_out_date >= ?
      AND NOT EXISTS (
        SELECT 1
        FROM property_reserved_on r
        WHERE p.PID = r.PID
          AND ? <= r.End_date
          AND ? >= r.Start_date
      );
      `;

      
      const searchValues = [destination, destination, rooms, guests, checkIn, checkOut, checkIn, checkOut ];

      connection.query(searchSql, searchValues, (searchErr, searchResults) => {
        if (searchErr) {
          console.error('Error fetching data:', searchErr);
          res.status(500).json({ message: 'Fetching Error' });
        } else {
          console.log('Data fetched from PROPERTY successfully.');
          console.log(searchResults);
          res.json({ searchResults });
        }
      });
      connection.release(); 
    });

  });


  app.get('/getUserData', (req, res) => {
    const { email } = req.query;
  
    console.log(req.query);
  
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error getting a database connection:', err);
        return res.status(500).json({ message: 'Database Connection Error' });
      }
  
      const sql = `SELECT UID FROM user WHERE Email = ?`;
      connection.query(sql, [email], (err, results) => {
        if (err) {
          connection.release();
          console.error('Error querying UID:', err);
          return res.status(500).json({ message: 'Fetching Error' });
        }
  
        if (results.length > 0) {
          const userSql = `SELECT * FROM USER WHERE UID = ?`;
          const userValues = [results[0].UID];
          connection.query(userSql, userValues, (userErr, userResults) => {
            if (userErr) {
              connection.release();
              console.error('Error querying user data:', userErr);
              return res.status(500).json({ message: 'Fetching Error' });
            }
  
            const hostSql = `SELECT * FROM HOST WHERE UID = ?`;
            const hostValues = [userResults[0].UID];
            connection.query(hostSql, hostValues, (hostErr, hostResults) => {
              connection.release();
  
              if (hostErr) {
                console.error('Error querying host data:', hostErr);
                return res.status(500).json({ message: 'Fetching Error' });
              }
  
              console.log('Data fetched from user successfully.');
              res.json({ userResults, hostResults });
            });
          });
        } else {
          connection.release();
          res.status(404).json({ message: 'User not found' });
        }
      });
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
      base_price,
      serviceCharge,
      number_of_days
    } = req.body;

    console.log(req.body);
  
    const currentDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(availability[0]);
    const endDate = new Date(availability[1]);
    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];
  
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
  
          const listingSql = `INSERT INTO PROPERTY (Property_title, Zipcode, Num_of_guests, Price_per_night, Created, Check_in_date, Check_out_date, Num_of_ratings, Avg_ratings, UID, City, Country, Description, Num_of_rooms, Address_line, Category, Num_of_bedrooms, Num_of_bathrooms, Num_of_beds, pics, service_fee, base_fee, num_of_days, Area ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
          
          const price = parseFloat(pricePerNight);
  
          const listingValues = [property_title, zipcode, guest_count, price, currentDate, formattedStartDate, formattedEndDate, '0', '0.0', userUID, state, country, description, room_count, address_line, property_category, bedroom_count, bathroom_count, bed_count, pics, serviceCharge, base_price, number_of_days, area];
  
          connection.query(listingSql, listingValues, (listingErr, listingResults) => {
            if (listingErr) {
              console.error('Error inserting data into PROPERTY:', listingErr);
              res.status(500).json({ message: 'Error inserting data into PROPERTY' });
            } 
            else 
            {
              console.log('Data inserted into PROPERTY successfully');
              const PID = listingResults.insertId;
  
              amenities.forEach((amenity) => {
                const sql = `INSERT INTO Amenities (Name, property_PID) VALUES (?, ?)`;
                
                connection.query(sql, [amenity, PID], (error, results) => {
                  if (error) {
                    console.error('Error inserting amenity:', error);
                  } else {
                    console.log(`Amenity inserted: ${amenity}`);
                  }
                });

              });

              const picSql = `INSERT INTO PROPERTY_PICTURES (PID, Picture_url) VALUES (?, ?)`;
              connection.query(picSql, [PID, pics], (picErr, picResults) => {
                if(picErr)
                {
                  console.log('Error inserting into Property picture:', picErr);
                }
                else
                {
                  console.log(picResults);
                }
              })

              res.status(200).json({ message: 'Data inserted successfully' });
            }
          });
        }
        connection.release();
      });
    });
  });


  /*
  app.get('/getReservations/:userEmail', (req, res) => {
    const userEmail = req.params.userEmail;
  
    pool.getConnection((err, connection) => {
      if (err) throw err;
      var sql = `SELECT UID FROM USER WHERE Email = '${userEmail}'`;
      connection.query(sql, function (err, results, fields) {
        if (err) throw err;
        const userUID = results[0].UID;
  
        const fetchSql = `SELECT * FROM GUEST WHERE UID = ?`;
        const fetchValues = userUID;
        connection.query(fetchSql, fetchValues, (fetchErr, fetchResults) => {
          if (err) throw err;
          const guestID=fetchResults[0].GID;

          const againSql = `SELECT
          u.*, g.GID, g.Guest_rating_num, g.Avg_rating AS Guest_Avg_rating,
          r.RID, r.PID, r.Check_in_date, r.Check_out_date, r.number_of_days, r.total_price,
          p.*
      FROM user u JOIN guest g ON u.UID = g.UID JOIN reservations r ON g.GID = r.GID
      JOIN property p ON r.PID = p.PID
      WHERE
          g.GID = ?`;
          const againValues = [guestID];

          connection.query(againSql, againValues, (fetchErr, againResults) => {

          console.log("listings are");
          console.log(againResults);
          res.json(againResults);
          });
        });
      });
      connection.release();
    });
  });
  */

  

 /* app.post('/confirm-reservation', async (req, res) => {
    const { PID, checkIn, checkOut, em } = req.body;
  
    pool.getConnection((err, connection) => {
      if (err) throw err;
      var sql = `SELECT UID FROM user WHERE Email = '${email}'`;
      connection.query(sql, function (err, results, fields) {
        if (err) throw err;
        const guestSql = `INSERT INTO GUEST (UID, Guest_rating_num, Avg_rating) VALUES (?,?,?)`;
        const guestValues = [results[0].UID, '0','0.0'];
        connection.query(guestSql, guestValues, (guestErr, guestResults) => {
          console.log("GUEST inserted successfully for reservations!");

          //check if the property with the given PID is already reserved or not. 
          // no need! We can take care from browse page maybe.

        const reserveSql = `INSERT  `;
        const reserveValues = [results[0].UID, '0','0.0'];


        });
      });
      connection.release();
    });
  });*/
  

  app.get('/getListings/:userEmail', (req, res) => {
    const userEmail = req.params.userEmail;
  
    pool.getConnection((err, connection) => {
      if (err) throw err;
      var sql = `SELECT UID FROM USER WHERE Email = '${userEmail}'`;
      connection.query(sql, function (err, results, fields) {
        if (err) throw err;
        const userUID = results[0].UID;
  
        const fetchSql = `SELECT * FROM PROPERTY WHERE UID = ?`;
        const fetchValues = [userUID];
        connection.query(fetchSql, fetchValues, (fetchErr, fetchResults) => {
          console.log(fetchResults);
          res.json(fetchResults);
        });
      });
      connection.release();
    });
  });

  app.get('/isGuest', (req, res) => {
    const { email } = req.query;
  
    console.log(req.query);
  
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error getting a database connection:', err);
        return res.status(500).json({ message: 'Database Connection Error' });
      }
  
      const sql = `SELECT UID FROM user WHERE Email = ?`;
      connection.query(sql, [email], (err, results) => {
        if (err) {
          connection.release();
          console.error('Error querying UID:', err);
          return res.status(500).json({ message: 'Fetching Error' });
        }
  
        if (results.length > 0) {
          const userSql = `SELECT * FROM USER WHERE UID = ?`;
          const userValues = [results[0].UID];
          connection.query(userSql, userValues, (userErr, userResults) => {
            if (userErr) {
              connection.release();
              console.error('Error querying user data:', userErr);
              return res.status(500).json({ message: 'Fetching Error' });
            }
  
            const hostSql = `SELECT HID FROM HOST WHERE UID = ?`;
            const hostValues = [userResults[0].UID];
            connection.query(hostSql, hostValues, (hostErr, hostResults) => {
              connection.release();
  
              if (hostErr) {
                console.error('Error querying host data:', hostErr);
                return res.status(500).json({ message: 'Fetching Error' });
              }
  
              console.log('Data fetched from user successfully.');
  
              if (hostResults.length > 0) {
                res.json({ message: 'yes'});
              } else {
               
                res.json({ message: 'no' });
              }
            });
          });
        } else {
          connection.release();
          res.status(404).json({ message: 'User not found' });
        }
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


