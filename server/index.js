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


    pool.getConnection((err, connection) => 
    {
      if (err) throw err;
      const userSql = `INSERT INTO USER (First_name, Last_name, Phone, Email, Password, Joining_date) VALUES (?, ?, ?, ?, ?, ?)`;
      const userValues = [firstname, lastname, phone_number, email, password, currentDate];
      connection.query(userSql, userValues, (userErr, userResults) => {
        if (userErr) 
        {
          console.error('Error inserting data into USER:', userErr);
          res.status(500).json({ message: 'Error inserting data into USER' });
        } 
        else 
        {
          console.log('Data inserted into USER successfully');
          const guestSql = `INSERT INTO GUEST (UID, Guest_rating_num, Avg_rating) VALUES (?, ?, ?)`;
          const guestValues = [userResults.insertId, '0','0'];
          connection.query(guestSql, guestValues, (guestErr, guestResults) => 
          {
            if (guestErr) 
            {
              console.error('Error inserting data into GUEST:', guestErr);
              res.status(500).json({ message: 'Error inserting data into GUEST' });
            } 
            else 
            {
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
            if (hostErr) 
            {
              console.error('Error inserting data into HOST:', guestErr);
              res.status(500).json({ message: 'Error inserting data into HOST' });
            } else 
            
            {
              console.log('Data inserted into HOST successfully');
              const guestSql = `INSERT INTO GUEST (UID, Guest_rating_num, Avg_rating) VALUES (?, ?, ?)`;
              const guestValues = [userResults.insertId, '0','0'];
              connection.query(guestSql, guestValues, (guestErr, guestResults) => 
              {
                if (guestErr) 
                {
                  console.error('Error inserting data into GUEST:', guestErr);
                  res.status(500).json({ message: 'Error inserting data into GUEST' });
                } 
                else 
                {
                  console.log('Data inserted into GUEST successfully');
                  res.status(200).json({ message: 'Data inserted successfully' });
                }
              });
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


  app.get('/view', async (req, res) => {
    const { PID } = req.query;
    console.log("PID: ", PID);
  
  
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error getting database connection:", err);
        return res.status(500).json({ message: 'Database Connection Error' });
      }
  
      const picSql = `SELECT Picture_url FROM PROPERTY_PICTURES WHERE PID = ?`;
      const picValues = [PID];
  
      connection.query(picSql, picValues, (picErr, picResult) => {
        if (picErr) {
         
          console.log("Error while fetching pics:", picErr);
          return res.status(500).json({ message: 'Error while fetching pictures' });
        } 
        else 

        res.send({picResult});

        connection.release();
      });
    });
  });




  app.get('/getHostResult/:PID', async (req, res) => {
    const PID = req.params.PID;
  
    console.log("HOST er pid: ", PID);
  
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error getting database connection:", err);
        return res.status(500).json({ message: 'Database Connection Error' });
      }
  
      const getHost = `SELECT UID from Property where PID = ?`;
      const value = [PID];
  
      connection.query(getHost, value, (err, uidResult) => {
        if (err) {
          console.log("Error hoise");
          connection.release(); // Release the connection in case of an error
          return res.status(500).json({ message: 'Database Query Error' });
        } else {
          const UID = uidResult[0].UID;
          console.log(UID);
          const getHostInfo = `SELECT * FROM seeAllHosts WHERE userUID = ?`;
          const getHostInfoValue = [UID];
  
          connection.query(getHostInfo, getHostInfoValue, (hostErr, hostResults) => {
            if (hostErr) {
              console.log("Error fetching host info", hostErr);
              connection.release(); // Release the connection in case of an error
              return res.status(500).json({ message: 'Database Query Error' });
            }
  
            console.log('host results:', hostResults);
            res.json({ hostResults });
  
            connection.release(); // Release the connection after a successful query
          });
        }
      });
    });
  });
  



  app.get('/browse', async (req, res) => {
    const { destination, checkIn, checkOut, rooms, guests} = req.query;

    const check_in = new Date(checkIn);
    const check_out = new Date(checkOut);

    check_in.setDate(check_in.getDate() + 1);
    check_out.setDate(check_out.getDate() + 1);

   
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
        );`
        ;

      
      const searchValues = [destination, destination, rooms, guests, check_in, check_out, check_in, check_out ];

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
      number_of_days,
      pics_array
    } = req.body;

    console.log(req.body);
  
    const currentDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(availability[0]);
    const endDate = new Date(availability[1]);



    console.log("endDate: ", endDate);

    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];

    const five_pics = pics_array.slice(-5);
  
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

              five_pics.forEach((pic) => {
                const picSql = `INSERT INTO PROPERTY_PICTURES (PID, Picture_url) VALUES (?, ?)`;
                connection.query(picSql, [PID, pic], (PicErr, Picresults) => {
                  if (PicErr) {
                    console.error('Error inserting pics:', PicErr);
                  } else {
                    console.log(`Amenity inserted: ${pic}`);
                  }
                });

              });

              res.status(200).json({ message: 'Data inserted successfully' });
            }
          });
        }
        connection.release();
      });
    });
  });


  
  app.get('/getReservations/:userEmail', (req, res) => {
    const userEmail = req.params.userEmail;
  
    pool.getConnection((err, connection) => {
      if (err) {
        return res.status(500).json({ message: 'Database Connection Error' });
      }
  
      const pendingSql = `SELECT * FROM PendingReservations WHERE Email = '${userEmail}'`;
      const approvedSql = `SELECT * FROM ApprovedReservations WHERE Email = '${userEmail}'`;
  
      // Use Promise.all to execute both queries concurrently
      Promise.all([
        new Promise((resolve, reject) => {
          connection.query(pendingSql, (err, pendingResults) => {
            if (err) {
              reject(err);
            } else {
              console.log("Pending: ", pendingResults);
              resolve({ pendingReservations: pendingResults });
            }
          });
        }),
        new Promise((resolve, reject) => {
          connection.query(approvedSql, (err, approvedResults) => {
            if (err) {
              reject(err);
            } else {
              console.log("Approved: ", approvedResults);
              resolve({ approvedReservations: approvedResults });
            }
          });
        }),
      ])
        .then(([s1, s2]) => {
          // Combine results into a single object
          const responseObj = {
            pendingReservations: s1.pendingReservations,
            approvedReservations: s2.approvedReservations,
          };
  
          console.log("Response object: ", responseObj);
  
          res.status(200).json(responseObj);
          connection.release(); // Release the database connection
        })
        .catch((error) => {
          console.error('Error executing SQL queries:', error);
          res.status(500).json({ message: 'Error executing SQL queries' });
          connection.release(); // Ensure connection is released in case of an error
        });
    });
  });
  



  app.get('/getPendingReservations/:PID', (req, res) => {
    const PID = req.params.PID;
  
    pool.getConnection((err, connection) => {
      if (err) {
        return res.status(500).json({ message: 'Database Connection Error' });
      }
  
      const sql = `SELECT * FROM PendingReservations WHERE PID = '${PID}'`;
  
      connection.query(sql, function (err, results, fields) {
        if (err) {
          connection.release();
          return res.status(500).json({ message: 'Error executing SQL query' });
        }
  
        // Retrieve property details for the given PID
        const getPropertyName = `SELECT Property_title FROM Property WHERE PID = '${PID}'`;
        connection.query(getPropertyName, function (propErr, propResults, propFields) {
          if (propErr) {
            connection.release();
            return res.status(500).json({ message: 'Error executing SQL query' });
          }
  
          // Combine pending reservation details with property details
          const combinedResults = {
            pendingReservations: results,
            propertyDetails: propResults[0], // Assuming there's only one property matching the PID
          };
  
          console.log('Combined results:', combinedResults);
          res.status(200).json(combinedResults);
          connection.release(); // Release the database connection
        });
      });
    });
  });
  

  


  
  app.post('/approve-reservation', async (req, res) => {
    const { GID, PID, checkin, checkout, total_price, rooms, guests } = req.body;


    console.log(req.body);

    /// 8-15  --->> 7 -14 (checkin ke ek barao, checkout ke ek barao)
    
    console.log(req.body);

    const a = checkin.substring(0, 10);
    const b = checkout.substring(0, 10);

    const check_in = new Date(a);
    const check_out = new Date(b);

    check_in.setDate(check_in.getDate() + 1);
    check_out.setDate(check_out.getDate() + 1);

    const aa = check_in.toISOString().split('T')[0];
    const bb = check_out.toISOString().split('T')[0];


    
    console.log("checkin: ", check_in);
    console.log("checkin: ", check_out);
  
    
  
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error getting database connection:", err);
        return res.status(500).json({ message: 'Database Connection Error' });
      }
  
      const p_r_oSql = `INSERT INTO property_reserved_on (PID, Start_date, End_date) VALUES (?,?,?)`;
      const p_r_oValues = [PID, check_in, check_out];
  
      connection.query(p_r_oSql, p_r_oValues, (p_r_oErr, p_r_oResults) => {
        if (p_r_oErr) {
          console.error('Error updating data:', p_r_oErr);
          connection.release();
          return res.status(500).json({ message: 'Updating Error' });
        } 
        else 
        {
          console.log("property reserved on updated!");
          console.log(p_r_oResults);
  
          const gidSql = `INSERT INTO reservations (PID, GID, Check_in_date, Check_out_date, total_price, pending_Guests, pending_Rooms) VALUES (?, ?, ?, ?, ?,  ? , ?)`;
          const gidValues = [PID, GID, check_in, check_out, total_price, guests, rooms];
  
          connection.query(gidSql, gidValues, (gidErr, gidResults) => 
          {
            if (gidErr) {
              console.error("Error executing GID query:", gidErr);
              connection.release();
              return res.status(500).json({ message: 'Database Query Error' });
            } 
            else 
            {
             
              console.log("Into the reservtions");
              const againSql = `DELETE FROM reservation_requests
              WHERE (Check_in BETWEEN ? AND ?)
              AND (Check_out BETWEEN ? AND ?)
              AND PID = ?`;
              const againValues = [aa, bb,  aa, bb, PID];
  
              connection.query(againSql, againValues, (fetchErr, againResults) => {
                if (fetchErr) {
                  console.error("Error executing INSERT query:", fetchErr);
                  connection.release();
                  return res.status(500).json({ message: 'Database Query Error' });
                }
  
                console.log("Overlapping pending reservations are gone! yay!");
                console.log(againResults);
                res.json(againResults);
  
                connection.release();
              });
            }
          });
        }
      });
    });
  });
  




  app.post('/pending-reservation', async (req, res) => {
    const { em, PID, check_in, check_out, price, rooms, guests } = req.body;
    const email = em;
    console.log(req.body);
  
    const a = check_in.substring(0, 10);
    const b = check_out.substring(0, 10);
  
    const checkin = new Date(a);
    const checkout = new Date(b);
  
    const priceTotal = parseFloat(price);
    console.log("price: ", price);
  
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error getting database connection:", err);
        return res.status(500).json({ message: 'Database Connection Error' });
      }
  
      const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
      const p_r_oSql = `INSERT INTO Reservation_requests (PID, Email, Check_in, Check_out, total_price, rooms, guests, request_date) VALUES (?,?,?,?, ?, ?, ?, ?)`;
      const p_r_oValues = [PID, email, checkin, checkout, priceTotal, rooms, guests, currentDate];
  
      connection.query(p_r_oSql, p_r_oValues, (p_r_oErr, p_r_oResults) => {
        if (p_r_oErr) {
          console.error('Error updating data:', p_r_oErr);
          connection.release();
          return res.status(500).json({ message: 'Updating Error' });
        } else {
          console.log("Property reserved on updated!");
          console.log(p_r_oResults);
          connection.release(); // Release the database connection
          return res.status(200).json({ message: 'Reservation confirmed' });
        }
      });
    });
  });


  app.get('/disabled-dates/:PID', (req, res) => {
    const PID = req.params.PID;
    
    pool.getConnection((err, connection) => {
      if (err) {
        return res.status(500).json({ error: 'Database connection error' });
      }
  
      const query = 'SELECT Start_date, End_date FROM property_reserved_on WHERE PID = ?';
      
      // Execute the query with PID as a parameter
      connection.query(query, [PID], (fetchErr, fetchResults) => {
        connection.release();
  
        if (fetchErr) {
          return res.status(500).json({ error: 'Fetch query error' });
        }
  
        console.log("disabled: ", fetchResults);
       
        res.json(fetchResults);
      });
    });
  });
  


  app.post('/reject-reservation', (req, res) => {
    const { Email, PID } = req.body;

    console.log(req.body);
  
    pool.getConnection((err, connection) => {
      if (err) {
        
        console.error("Error getting database connection:", err);
        return res.status(500).json({ message: 'Database Connection Error' });
      }
  
      var sql = `DELETE FROM RESERVATION_REQUESTS WHERE Email = '${Email}' AND PID = '${PID}' `;
      connection.query(sql, function (err, results, fields) {
        connection.release();
  
        if (err) {
         
          console.error("Error executing SQL query:", err);
          return res.status(500).json({ message: 'Database Query Error' });
        }

        res.status(200).json({ message: 'Reservation rejected successfully' });
      });
    });
  });
  


    



  

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
  
      const sql = `SELECT * FROM user WHERE Email = ?`;
      connection.query(sql, [email], (err, results) => 
      {
        if (err) 
        {
          connection.release();
          console.error('Error querying UID:', err);
          return res.status(500).json({ message: 'Fetching Error' });
        }
  
        if (results.length > 0) 
        {
          const userUID = results[0].UID;
          const hostSql = `SELECT HID FROM HOST WHERE UID = ?`;
          const hostValues = [userUID];
  
          connection.query(hostSql, hostValues, (hostErr, hostResults) => {
            if (hostErr) {
              connection.release();
              console.error('Error querying host data:', hostErr);
              return res.status(500).json({ message: 'Fetching Error' });
            }
  
            if (hostResults.length > 0) {
              res.json({ message: 'yes', name: results[0].First_name });
            } else {
              const guestSql = `SELECT GID FROM GUEST WHERE UID = ?`;
              const guestValues = [userUID];
  
              connection.query(guestSql, guestValues, (guestErr, guestResults) => {
                connection.release();
  
                if (guestErr) {
                  console.error('Error querying guest data:', guestErr);
                  return res.status(500).json({ message: 'Fetching Error' });
                }
  
                if (guestResults.length > 0) 
                {
                  res.json({ message: 'no', name: results[0].First_name });
                } else 
                {
                  console.log("no user");
                  res.json({ message: 'X', name: '' });
                }
              });
            }
          });
        } 
        
        else 
        {
          connection.release();
          res.json({ message: 'X', name: '' });
        }
      });
    });
  });
  
  ///Delete from Listing (check for existing reservations!)

  app.delete('/deleteProperty/:PID', (req, res) => {
    const { PID } = req.params;
  
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error acquiring a connection from the pool:', err);
        return res.status(500).json({ message: 'Error acquiring a connection' });
      }
  
      const checkPropertyQuery = 'SELECT * FROM property_reserved_on WHERE PID = ?';
  
      connection.query(checkPropertyQuery, [PID], (checkError, checkResults) => {
        if (checkError) {
          connection.release();
          console.error('Error checking property:', checkError);
          return res.status(500).json({ message: 'Error checking property' });
        }
  
        if (checkResults.length > 0) {
          connection.release();
          return res.status(400).json({ message: 'Property is reserved and cannot be deleted' });
        }
  
        const deletePropertyQuery = 'DELETE FROM Property WHERE PID = ?';
  
        connection.query(deletePropertyQuery, [PID], (deleteError, deleteResults) => {
          connection.release();
  
          if (deleteError) {
            console.error('Error deleting property:', deleteError);
            return res.status(500).json({ message: 'Error deleting property' });
          }
  
          res.json({ message: 'Property deleted successfully' });
        });
      });
    });
  });
  
  app.post('/temp-profile', async (req, res) => {
    const { email, description, city, country } = req.body; // Change to req.body
  
    console.log("from the post method");
    console.log(req.body); // Change to req.body
  
    pool.getConnection((err, connection) => {
      if (err) throw err;
  
      const updateSql = `
        UPDATE user 
        SET description = ?,
        City = ?,
        Country = ?
        WHERE Email = ? 
      `;
  
      const updateValues = [description, city, country, email];
  
      connection.query(updateSql, updateValues, (updateErr, updateResults) => {
        if (updateErr) {
          console.error('Error updating data:', updateErr);
          res.status(500).json({ message: 'Updating Error' });
        } else {
          console.log('Data updated successfully.');
          console.log(description);
          res.json({ updateResults });
        }
      });
  
      connection.release();
    });
  });



app.get('/temp-profile', async (req, res) => {
  const {email} = req.query;

  console.log("u :");
 console.log(email);
 
  console.log(req.query);
  

  pool.getConnection((err, connection) => {
    if (err) throw err;

    const searchSql = `SELECT * FROM USER WHERE Email = ?`;

    const searchValues = [email];

    connection.query(searchSql, searchValues, (searchErr, searchResults) => {
      if (searchErr) {
        console.error('Error fetching data:', searchErr);
        res.status(500).json({ message: 'Fetching Error' });
      } else {
        console.log('Data fetched from USER successfully.');
        console.log(searchResults);
        res.json({ searchResults });
      }
    });
    connection.release(); 
  });
});
  
  

  

  app.listen(5001, () => {
    console.log(`Example app listening on port 5001`);
  });
}

connectAndStartServer().catch(err => {
  console.error(err);
});


