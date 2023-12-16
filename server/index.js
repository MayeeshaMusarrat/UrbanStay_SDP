const express = require('express');
const app = express();

var mysql = require('mysql2');
const cors = require('cors');
app.use(cors(), express.json());

const pool = mysql.createPool({
  host: "mysql-264db198-musarratmayeesha-0001.a.aivencloud.com",
  port: 16798,
  user: "avnadmin",
  password: "AVNS_TvZaCuiGGGrRVds4PvY",
  database: "defaultdb",
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
      res.send("Hello from backend");
      const userSql = `INSERT INTO user (First_name, Last_name, Phone, Email, Password, Joining_date) VALUES (?, ?, ?, ?, ?, ?)`;
      const userValues = [firstname, lastname, phone_number, email, password, currentDate];
      connection.query(userSql, userValues, (userErr, userResults) => {
        if (userErr) 
        {
          console.error('Error inserting data into user:', userErr);
          res.status(500).json({ message: 'Error inserting data into user' });
        } 
        else 
        {
          console.log('Data inserted into user successfully');
          const guestSql = `INSERT INTO guest (UID, Guest_rating_num, Avg_rating) VALUES (?, ?, ?)`;
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
      const userSql = `INSERT INTO user (First_name, Last_name, Phone, Birthdate, Email, Password, Joining_date, Profile_picture) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      const userValues = [firstname, lastname, phone_number, birthdatePart, email, password, currentDate, profile_pic];
      connection.query(userSql, userValues, (userErr, userResults) => {
        if (userErr) {
          console.error('Error inserting data into user:', userErr);
          res.status(500).json({ message: 'Error inserting data into user' });
        } else {
          console.log('Data inserted into user successfully');
          const hostSql = `INSERT INTO host (UID, Host_rating_num, Avg_rating) VALUES (?, ?, ?)`;
          const hostValues = [userResults.insertId, '0','0'];
          connection.query(hostSql, hostValues, (hostErr, hostResults) => {
            if (hostErr) 
            {
              console.error('Error inserting data into HOST:', guestErr);
              res.status(500).json({ message: 'Error inserting data into HOST' });
            } else 
            
            {
              console.log('Data inserted into HOST successfully');
              const guestSql = `INSERT INTO guest (UID, Guest_rating_num, Avg_rating) VALUES (?, ?, ?)`;
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
    console.log("came in: ", req.body);

    console.log("sign in");
  
    pool.getConnection((err, connection) => {
      if (err) throw err;
      var sql = `SELECT password FROM user WHERE Email = '${email}'`;

  
      connection.query(sql, function (err, results, fields) {
       
        if (err) throw err;
         console.log(results[0].password);
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
  
      const picSql = `SELECT Picture_url FROM property_pictures WHERE PID = ?`;
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




  app.get('/getHostAndAmenities/:PID', async (req, res) => {
    const PID = req.params.PID;
  
    console.log("HOST er pid: ", PID);
  
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error getting database connection:", err);
        return res.status(500).json({ message: 'Database Connection Error' });
      }
  
      const hostSql = `SELECT * from seeAllHosts where userUID = (SELECT UID from property where PID = '${PID}')`;
      const amenitiesSql = `SELECT Name from amenities where property_PID = '${PID}'`;

      Promise.all([
        new Promise((resolve, reject) => {
          connection.query(hostSql, (err, hostResults) => {
            if (err) {
              reject(err);
            } else {
              console.log("host: ", hostResults);
              resolve({ hostResults: hostResults });
            }
          });
        }),
        new Promise((resolve, reject) => {
          connection.query(amenitiesSql, (err, amenitiesResults) => {
            if (err) {
              reject(err);
            } else {
              console.log("Amenities: ", amenitiesResults);
              resolve({ amenitiesResults: amenitiesResults });
            }
          });
        }),
      ]).then(([s1, s2]) => {
          
        const responseObj = {
          hostResults: s1.hostResults,
          amenitiesResults: s2.amenitiesResults,
        };

        console.log("Response object: ", responseObj);

        res.status(200).json(responseObj);
        connection.release(); 
      })
      .catch((error) => {
        console.error('Error executing SQL queries:', error);
        res.status(500).json({ message: 'Error executing SQL queries' });
        connection.release(); 
      });
  
     
    });
  });
  



  app.get('/browse', async (req, res) => {
    const { destination, checkIn, checkOut, rooms, guests, proptype, minprice, maxprice } = req.query;
  
    const check_in = (new Date(checkIn)).toISOString().split('T')[0];
    const check_out = (new Date(checkOut)).toISOString().split('T')[0];
  
    console.log("property info: ", req.query);
    console.log("checkin: ", check_in);
  
    pool.getConnection((err, connection) => {
      if (err) throw err;
  
      let searchSql = `
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
          )`;
  
      const searchValues = [destination, destination, rooms, guests, check_in, check_out, check_in, check_out];
  
      if (proptype !== 'null') {
        console.log("proptype is not null");
        searchSql += ` AND p.Category = ?`;
        searchValues.push(proptype);
      }
  
      if (minprice !== 'null' && maxprice !== 'null') {
        console.log("minprice and maxprice are not null");
        searchSql += ` AND p.Price_per_night BETWEEN ? AND ?`;
        searchValues.push(minprice, maxprice);
      }
  
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
          const userSql = `SELECT * FROM user WHERE UID = ?`;
          const userValues = [results[0].UID];
          connection.query(userSql, userValues, (userErr, userResults) => {
            if (userErr) {
              connection.release();
              console.error('Error querying user data:', userErr);
              return res.status(500).json({ message: 'Fetching Error' });
            }
  
            const hostSql = `SELECT * FROM host WHERE UID = ?`;
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
          res.status(404).json({ message: 'user not found' });
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

    startDate.setDate(startDate.getDate() + 1);
    endDate.setDate(endDate.getDate() + 1);


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
          console.error('Error extracting data from user:', userErr);
          res.status(500).json({ message: 'Error inserting data into user' });
        } 
        else 
        {
          console.log('user UID extracted successfully');
          const userUID = userResults[0].UID;
  
          const listingSql = `INSERT INTO property (Property_title, Zipcode, Num_of_guests, Price_per_night, Created, Check_in_date, Check_out_date, Num_of_ratings, Avg_ratings, UID, City, Country, Description, Num_of_rooms, Address_line, Category, Num_of_bedrooms, Num_of_bathrooms, Num_of_beds, pics, service_fee, base_fee, num_of_days, Area ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
          
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
                const sql = `INSERT INTO amenities (Name, property_PID) VALUES (?, ?)`;
                
                connection.query(sql, [amenity, PID], (error, results) => {
                  if (error) {
                    console.error('Error inserting amenity:', error);
                  } else {
                    console.log(`Amenity inserted: ${amenity}`);
                  }
                });

              });

              five_pics.forEach((pic) => {
                const picSql = `INSERT INTO property_pictures (PID, Picture_url) VALUES (?, ?)`;
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
    const currentDate = new Date().toISOString().split('T')[0];
  
    pool.getConnection((err, connection) => {
      if (err) {
        return res.status(500).json({ message: 'Database Connection Error' });
      }
  
      const pendingSql = `SELECT * FROM PendingReservations WHERE Email = '${userEmail}' && CheckOutDate >= '${currentDate}'`;
      const approvedSql = `SELECT * FROM ApprovedReservations WHERE Email = '${userEmail}' && CheckOutDate >= '${currentDate}' `;
  
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
          
          const responseObj = {
            pendingReservations: s1.pendingReservations,
            approvedReservations: s2.approvedReservations,
          };
  
          console.log("Response object: ", responseObj);
  
          res.status(200).json(responseObj);
          connection.release(); 
        })
        .catch((error) => {
          console.error('Error executing SQL queries:', error);
          res.status(500).json({ message: 'Error executing SQL queries' });
          connection.release(); 
        });
    });
  });
  



  



  app.get('/getPendingReservations/:PID', (req, res) => {
    const PID = req.params.PID;

    console.log("Pending reservation shw: ", PID);
  
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
        const getPropertyName = `SELECT Property_title FROM property WHERE PID = '${PID}'`;
        connection.query(getPropertyName, function (propErr, propResults, propFields) {
          if (propErr) {
            connection.release();
            return res.status(500).json({ message: 'Error executing SQL query' });
          }
  
          const combinedResults = {
            pendingReservations: results,
            propertyDetails: propResults[0],
          };
  
          console.log('Combined results:', combinedResults);
          res.status(200).json(combinedResults);
          connection.release(); 
        });
      });
    });
  });




  app.get('/getPresentReservations/:PID', (req, res) => {
    const PID = req.params.PID;
    const currentDate = new Date().toISOString().split('T')[0];
    console.log("Present reservation shw -> ", PID);
  
    pool.getConnection((err, connection) => {
      if (err) {
        return res.status(500).json({ message: 'Database Connection Error' });
      }
  
      const sql = `SELECT * FROM approvedreservations WHERE PID = '${PID}' and CheckOutDate >= '${currentDate}'`;
  
      connection.query(sql, function (err, results, fields) {
        if (err) {
          connection.release();
          console.log("debug -> ", results);
          return res.status(500).json({ message: 'Error executing SQL query' });
        }
      
        const getPropertyName = `SELECT Property_title FROM property WHERE PID = '${PID}'`;
        connection.query(getPropertyName, function (propErr, propResults, propFields) {
          if (propErr) {
            connection.release();
            return res.status(500).json({ message: 'Error executing SQL query' });
          }
  
          const combinedResults = {
            presentReservations: results,
            propertyDetails: propResults[0], 
          };
  
          console.log('Combined results:', combinedResults);
          res.status(200).json(combinedResults);
          connection.release(); 
        });
      });
    });
  });
  
  app.get('/getPastlyReservations/:PID', (req, res) => {
    const PID = req.params.PID;
    const currentDate = new Date().toISOString().split('T')[0];
    console.log("Past reservation shw -> ", PID);
  
    pool.getConnection((err, connection) => {
      if (err) {
        return res.status(500).json({ message: 'Database Connection Error' });
      }
  
      const sql = `SELECT * FROM approvedreservations WHERE PID = '${PID}' and CheckOutDate < '${currentDate}'`;
  
      connection.query(sql, function (err, results, fields) {
        if (err) {
          connection.release();
          console.log("debug -> ", results);
          return res.status(500).json({ message: 'Error executing SQL query' });
        }
      
        const getPropertyName = `SELECT Property_title FROM property WHERE PID = '${PID}'`;
        connection.query(getPropertyName, function (propErr, propResults, propFields) {
          if (propErr) {
            connection.release();
            return res.status(500).json({ message: 'Error executing SQL query' });
          }
  
          const combinedResults = {
            presentReservations: results,
            propertyDetails: propResults[0], 
          };
  
          console.log('Combined results:', combinedResults);
          res.status(200).json(combinedResults);
          connection.release(); 
        });
      });
    });
  });



    
  app.post('/approve-reservation', (req, res) => {
    const {
      GID,
      PID,
      checkin,
      checkout,
      total_price,
      rooms,
      guests,
      Email,
      AppliedIn,
      location,
      reservedForStart,
      property_title
    } = req.body;
  
    console.log("Appproved one: ", req.body);
  
    const check_in = new Date(checkin);
    const check_out = new Date(checkout);
    check_in.setDate(check_in.getDate() + 1);
    check_out.setDate(check_out.getDate() + 1);

  
    const CHECK_IN_A = check_in.toISOString().split('T')[0];
    const CHECK_IN_B = check_out.toISOString().split('T')[0];

    console.log("check_in: ", CHECK_IN_A);
    console.log("check_out: ", CHECK_IN_B);
  
    const currentDate = new Date();
  
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error getting database connection:", err);
        return res.status(500).json({ message: 'Database Connection Error' });
      }
  
      // Insert into property_reserved_on table
      const p_r_oSql = 'INSERT INTO property_reserved_on (PID, Start_date, End_date) VALUES (?,?,?)';
      const p_r_oValues = [PID, check_in, check_out];
      connection.query(p_r_oSql, p_r_oValues, (p_r_oErr, p_r_oResults) => {
        if (p_r_oErr) {
          console.error('Error updating data:', p_r_oErr);
          connection.release();
          return res.status(500).json({ message: 'Updating Error' });
        }
  
        console.log("property reserved on updated!");
        console.log(p_r_oResults);
  
        // Insert into reservations table
        const gidSql =
          'INSERT INTO reservations (PID, GID, Check_in_date, Check_out_date, total_price, pending_Guests, pending_Rooms) VALUES (?, ?, ?, ?, ?,  ? , ?)';
        const gidValues = [PID, GID, check_in, check_out, total_price, guests, rooms];
        connection.query(gidSql, gidValues, (gidErr, gidResults) => {
          if (gidErr) {
            console.error("Error executing GID query:", gidErr);
            connection.release();
            return res.status(500).json({ message: 'Database Query Error' });
          }
  
          console.log("Into the reservations");
  
          // Delete overlapping pending reservations
          const againSql =
            'DELETE FROM reservation_requests WHERE (Check_in BETWEEN ? AND ?) AND (Check_out BETWEEN ? AND ?) AND PID = ?';
          const againValues = [CHECK_IN_A, CHECK_IN_B, CHECK_IN_A, CHECK_IN_B, PID];
          connection.query(againSql, againValues, (fetchErr, againResults) => {
            if (fetchErr) {
              console.error("Error executing INSERT query:", fetchErr);
              connection.release();
              return res.status(500).json({ message: 'Database Query Error' });
            }
  
            console.log("Overlapping pending reservations are gone! yay!");
            console.log(againResults);
  
            // Insert into notifications table
            const notificationSql =
              'INSERT INTO notifications (email, notification_text, Created, Heading, type, seen) VALUES (?, ?, ?, ?, ?, ?)';
            const notificationValues = [
              Email,
              `Your Reservation applied in ${AppliedIn} has been approved by the host. The property titled ${property_title} located in ${location} has been reserved for ${reservedForStart}, Enjoy!`,
              currentDate,
              'Congratulations! Your pending reservation has been approved.',
              'success',
              '0'
            ];
            connection.query(notificationSql, notificationValues, (notifErr, notifResults) => {
              if (notifErr) {
                console.error("Error executing notification query:", notifErr);
                connection.release();
                return res.status(500).json({ message: 'Notification Query Error' });
              }
  
              connection.release();
              res.json({ message: 'Reservation approved successfully' });
            });
          });
        });
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

  app.get('/getAvatars/:userId', (req, res) => {
    const PID = req.params.userId;

    console.log("Pid from backedn: ", PID);
  
    console.log("for avatar");
  
    pool.getConnection((err, connection) => {
      if (err) {
        return res.status(500).json({ error: 'Database connection error' });
      }
  
      const query = 'SELECT Profile_pic FROM PendingReservations WHERE PID = ?';
  
      connection.query(query, [PID], (fetchErr, fetchResults) => {
        connection.release();
  
        if (fetchErr) {
          return res.status(500).json({ error: 'Fetch query error' });
        }
  
        console.log("profile_pics: ", fetchResults);

        const avatarUrls = fetchResults.map((row) => row.Profile_pic);
  
        res.json({ avatars: avatarUrls });
      });
    });
  });


  /// ------------------------------------------------------- GET CURRENTLY RESERVED AVATAR =======================================

  app.get('/getAvatarsPresentlyReserved/:userId', (req, res) => {
    const PID = req.params.userId;
    const currentDate = new Date();

    console.log("Pid from backedn: ", PID);
  
    console.log("for avatar");
  
    pool.getConnection((err, connection) => {
      if (err) {
        return res.status(500).json({ error: 'Database connection error' });
      }
  
      const query = 'SELECT Profile_pic FROM approvedreservations WHERE PID = ? AND CheckOutDate >= ?';
  
      connection.query(query, [PID, currentDate], (fetchErr, fetchResults) => {
        connection.release();
  
        if (fetchErr) {
          return res.status(500).json({ error: 'Fetch query error' });
        }
  
        console.log("profile_pics: ", fetchResults);

        const avatarUrls = fetchResults.map((row) => row.Profile_pic);
  
        res.json({ avatars: avatarUrls });
      });
    });
  });

  app.get('/getAvatarsPastlyReserved/:userId', (req, res) => {
    const PID = req.params.userId;
    const currentDate = new Date();

    console.log("Pid from backedn: ", PID);
  
    console.log("for avatar");
  
    pool.getConnection((err, connection) => {
      if (err) {
        return res.status(500).json({ error: 'Database connection error' });
      }
  
      const query = 'SELECT Profile_pic FROM approvedreservations WHERE PID = ? AND CheckOutDate < ?';
  
      connection.query(query, [PID, currentDate], (fetchErr, fetchResults) => {
        connection.release();
  
        if (fetchErr) {
          return res.status(500).json({ error: 'Fetch query error' });
        }
  
        console.log("profile_pics: ", fetchResults);

        const avatarUrls = fetchResults.map((row) => row.Profile_pic);
  
        res.json({ avatars: avatarUrls });
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
  
      var sql = `DELETE FROM reservation_requests WHERE Email = '${Email}' AND PID = '${PID}' `;
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
      var sql = `SELECT UID FROM user WHERE Email = '${userEmail}'`;
      connection.query(sql, function (err, results, fields) {
        if (err) throw err;
        const userUID = results[0].UID;
  
        const fetchSql = `SELECT * FROM property WHERE UID = ?`;
        const fetchValues = [userUID];
        connection.query(fetchSql, fetchValues, (fetchErr, fetchResults) => {
          console.log(fetchResults);
          res.json(fetchResults);
        });
      });
      connection.release();
    });
  });


  app.get('/getNotifs/:email', (req, res) => {
    const email = req.params.email;
  
    pool.getConnection((err, connection) => {
      if (err) throw err;
      var sql = `SELECT * FROM notifications WHERE Email = '${Email}'`;
      connection.query(sql, function (err, results, fields) {
        if (err) throw err;
        res.json({results});
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
          const hostSql = `SELECT HID FROM host WHERE UID = ?`;
          const hostValues = [userUID];
  
          connection.query(hostSql, hostValues, (hostErr, hostResults) => {
            if (hostErr) {
              connection.release();
              console.error('Error querying host data:', hostErr);
              return res.status(500).json({ message: 'Fetching Error' });
            }
  
            if (hostResults.length > 0) {
              console.log("host name: ", results[0].First_name);
              connection.release();
              res.json({ message: 'yes', name: results[0].First_name });
              
            } 
            else 
            {
              const guestSql = `SELECT GID FROM guest WHERE UID = ?`;
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

  


    app.get('/seenNotifYet', async (req, res) => {
    const {email} = req.query;
  
    console.log("seenNotif? email :");
    console.log(email);
  
  
    pool.getConnection((err, connection) => {
      if (err) throw err;
  
      const searchSql = `SELECT seen, notification_text FROM notifications WHERE email = ?`;
  
      const searchValues = [email];
  
      connection.query(searchSql, searchValues, (searchErr, searchResults) => {
        if (searchErr) {
          console.error('Error fetching data:', searchErr);
          res.status(500).json({ message: 'Fetching Error' });
        } else {
          console.log('Data fetched from notification successfully.');
          console.log(searchResults);
          res.json({ searchResults });
        }
      });
      connection.release(); 
    });
  });





  app.get('/notifSeen', async (req, res) => {
    const {email} = req.query;
  
    console.log("seenNotif? email :");
    console.log(email);
  
  
    pool.getConnection((err, connection) => {
      if (err) throw err;
  
      const searchSql = `Update notifications SET seen = '1' WHERE email = ?`;
  
      const searchValues = [email];
  
      connection.query(searchSql, searchValues, (searchErr, searchResults) => {
        if (searchErr) {
          console.error('Error fetching data:', searchErr);
          res.status(500).json({ message: 'Fetching Error' });
        } else {
          console.log('Data fetched from notification successfully.');
          console.log(searchResults);
          res.json({ searchResults });
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

    const searchSql = `SELECT * FROM user WHERE Email = ?`;

    const searchValues = [email];

    connection.query(searchSql, searchValues, (searchErr, searchResults) => {
      if (searchErr) {
        console.error('Error fetching data:', searchErr);
        res.status(500).json({ message: 'Fetching Error' });
      } else {
        console.log('Data fetched from user successfully.');
        console.log(searchResults);
        res.json({ searchResults });
      }
    });
    connection.release(); 
  });
});


app.get('/getPastReservations/:userEmail', async (req, res) => {
  const email = req.params.userEmail;
 
  console.log("email receive for pastReservations :");
  console.log(email);
 
  const currentDate = new Date();
  console.log("Current Date be like : ", currentDate);

  pool.getConnection((err, connection) => {
    if (err) throw err;

    const searchSql = `SELECT * FROM ApprovedReservations WHERE Email = ? AND CheckOutDate < ?`;

    const searchValues = [email, currentDate];

    connection.query(searchSql, searchValues, (searchErr, searchResults) => {
      if (searchErr) {
        console.error('Error fetching data:', searchErr);
        res.status(500).json({ message: 'Fetching Error' });
      } else {
        console.log('Data fetched from APPROVEDRESERVATIONS successfully.');
        console.log(searchResults);
        res.json({ searchResults });
      }
    });
    connection.release(); 
  });
});


app.get('/getAmenities/:PID', async (req, res) => {
  const PID = req.params.PID;

 
  const currentDate = new Date();
  console.log("Current PID be like : ", PID);

  pool.getConnection((err, connection) => {
    if (err) throw err;

    const searchSql = `SELECT Name FROM Amenities where property_PID = ?`;

    const searchValues = [PID];

    connection.query(searchSql, searchValues, (searchErr, searchResults) => {
      if (searchErr) {
        console.error('Error fetching data:', searchErr);
        res.status(500).json({ message: 'Fetching Error' });
      } else {
        console.log('Data fetched from AMENITIES successfully.');
        console.log(searchResults);
        res.json({ searchResults });
      }
    });
    connection.release(); 
  });
});

app.get('/getAmenitiesChoose/:PID', async (req, res) => {
  const PID = req.params.PID;

 
  const currentDate = new Date();
  console.log("Current PID be like : ", PID);

  pool.getConnection((err, connection) => {
    if (err) throw err;

    const searchSql = `SELECT Name FROM Amenities where property_PID = ?`;

    const searchValues = [PID];

    connection.query(searchSql, searchValues, (searchErr, searchResults) => {
      if (searchErr) {
        console.error('Error fetching data:', searchErr);
        res.status(500).json({ message: 'Fetching Error' });
      } else {
        console.log('Data fetched from AMENITIES successfully.');
        console.log(searchResults);
        res.json({ searchResults });
      }
    });
    connection.release(); 
  });
});






app.post('/guest-give-review', async (req, res) => {
  const {
    PID,
    email,
    scenery,
    accuracy,
    location,
    reception,
    cleanliness,
    service,
    overall,
    review
  } = req.body;

  console.log("guest give review : ", req.body);

  const created = new Date().toISOString().slice(0, 19).replace('T', ' ');

  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ error: 'Database connection error' });
    }

    const userSql = `select GID from guest where guest.UID = (select UID from user where email = ?);`;

    connection.query(userSql, [email], (userErr, userResults) => {
      if (userErr) {
        console.log("no");
        connection.release();
        return res.status(500).json({ error: 'user query error' });
      }

      console.log("user result: ", userResults);

      // now I have the gid, insert in the review table
      const reviewSql = `insert into Property_review
        (PID, GID, Comment, Location_rating, Reception_rating, Cleanliness_rating, Accuracy_rating, Overall_rating, Created, Email, Scenery_rating, Service_rating)
        values (?, ?, ?, ?, ? , ? , ? , ? , ? , ?, ?, ?);`;

      const reviewValues = [PID, userResults[0].GID, review, location, reception, cleanliness, accuracy, overall, created, email, scenery, service];

      connection.query(reviewSql, reviewValues, (reviewErr, reviewResults) => {
        if (reviewErr) {
          connection.release();
          return res.status(500).json({ error: 'Review query error' });
        } else {
          connection.release();
          return res.status(200).json({ message: 'Review worked!' });
        }
      });
    });
  });
});



app.get('/getReviews/:PID', async (req, res) => {
  const PID = req.params.PID;
 
  console.log("PID received for reviews :");
  console.log(PID);

  pool.getConnection((err, connection) => {
    if (err) throw err;

    const searchSql = `SELECT * FROM guestreviewsproperty WHERE PID = ?`;

    const searchValues = [PID];

    connection.query(searchSql, searchValues, (searchErr, searchResults) => {
      if (searchErr) {
        console.error('Error fetching data:', searchErr);
        res.status(500).json({ message: 'Fetching Error' });
      } else {
        console.log('Data fetched from GUESTREVIEWSPROPERTY successfully.');
        console.log(searchResults);
        res.json({ searchResults });
      }
    });
    
    connection.release(); 
  });
});



app.get('/getNotifications/:email', async (req, res) => {
  const email = req.params.email;
 
  console.log("email received in notif :");
  console.log(email);

  pool.getConnection((err, connection) => {
    if (err) throw err;

    const searchSql = `SELECT * FROM notifications WHERE email = ?`;

    const searchValues = [email];

    connection.query(searchSql, searchValues, (searchErr, searchResults) => {
      if (searchErr) {
        console.error('Error fetching data:', searchErr);
        res.status(500).json({ message: 'Fetching Error' });
      } else {
        console.log('Data fetched from notifications successfully.');
        console.log(searchResults);
        res.json({ searchResults });
      }
    });
    
    connection.release(); 
  });
});




app.get('/getRatings/:PID', async (req, res) => {
  const PID = req.params.PID;
 

  pool.getConnection((err, connection) => {
    if (err) throw err;

    const pieSql = `
    SELECT
    COUNT(CASE WHEN Overall_rating = 0.5 THEN 1 END) AS overall_point_5_start,
    COUNT(CASE WHEN Overall_rating = 1 THEN 1 END) AS overall_1_start,
    COUNT(CASE WHEN Overall_rating = 1.5 THEN 1 END) AS overall_1_point_5_start,
    COUNT(CASE WHEN Overall_rating = 2 THEN 1 END) AS overall_2_start,
    COUNT(CASE WHEN Overall_rating = 2.5 THEN 1 END) AS overall_2_point_5_start,
    
    COUNT(CASE WHEN Overall_rating = 3 THEN 1 END) AS overall_3_start,
    COUNT(CASE WHEN Overall_rating = 3.5 THEN 1 END) AS overall_3_point_5_start,
    COUNT(CASE WHEN Overall_rating = 4 THEN 1 END) AS overall_4_start,
    COUNT(CASE WHEN Overall_rating = 4.5 THEN 1 END) AS overall_4_point_5_start,
    COUNT(CASE WHEN Overall_rating = 5 THEN 1 END) AS overall_5_start
    from property_review
    where PID = '${PID}';
    `;

    const barSql = `
    SELECT

    COUNT(CASE WHEN Scenery_rating = 1 THEN 1 END) AS scenery_1_star,
    COUNT(CASE WHEN Scenery_rating = 2 THEN 1 END) AS scenery_2_star,
    COUNT(CASE WHEN Scenery_rating = 3 THEN 1 END) AS scenery_3_star,
    COUNT(CASE WHEN Scenery_rating = 4 THEN 1 END) AS scenery_4_star,
    COUNT(CASE WHEN Scenery_rating = 5 THEN 1 END) AS scenery_5_star,

    COUNT(CASE WHEN Accuracy_rating = 1 THEN 1 END) AS accuracy_1_star,
    COUNT(CASE WHEN Accuracy_rating = 2 THEN 1 END) AS accuracy_2_star,
    COUNT(CASE WHEN Accuracy_rating = 3 THEN 1 END) AS accuracy_3_star,
    COUNT(CASE WHEN Accuracy_rating = 4 THEN 1 END) AS accuracy_4_star,
    COUNT(CASE WHEN Accuracy_rating = 5 THEN 1 END) AS accuracy_5_star,
   
    COUNT(CASE WHEN Reception_rating = 1 THEN 1 END) AS reception_1_star,
    COUNT(CASE WHEN Reception_rating = 2 THEN 1 END) AS reception_2_star,
    COUNT(CASE WHEN Reception_rating = 3 THEN 1 END) AS reception_3_star,
    COUNT(CASE WHEN Reception_rating = 4 THEN 1 END) AS reception_4_star,
    COUNT(CASE WHEN Reception_rating = 5 THEN 1 END) AS reception_5_star,
    
	  COUNT(CASE WHEN Location_rating = 1 THEN 1 END) AS location_1_star,
    COUNT(CASE WHEN Location_rating = 2 THEN 1 END) AS location_2_star,
    COUNT(CASE WHEN Location_rating = 3 THEN 1 END) AS location_3_star,
    COUNT(CASE WHEN Location_rating = 4 THEN 1 END) AS location_4_star,
    COUNT(CASE WHEN Location_rating = 5 THEN 1 END) AS location_5_star,
    
    COUNT(CASE WHEN Cleanliness_rating = 1 THEN 1 END) AS cleanliness_1_star,
    COUNT(CASE WHEN Cleanliness_rating = 2 THEN 1 END) AS cleanliness_2_star,
    COUNT(CASE WHEN Cleanliness_rating = 3 THEN 1 END) AS cleanliness_3_star,
    COUNT(CASE WHEN Cleanliness_rating = 4 THEN 1 END) AS cleanliness_4_star,
    COUNT(CASE WHEN Cleanliness_rating = 5 THEN 1 END) AS cleanliness_5_star,
    
	  COUNT(CASE WHEN Service_rating = 1 THEN 1 END) AS service_1_star,
    COUNT(CASE WHEN Service_rating = 2 THEN 1 END) AS service_2_star,
    COUNT(CASE WHEN Service_rating = 3 THEN 1 END) AS service_3_star,
    COUNT(CASE WHEN Service_rating = 4 THEN 1 END) AS service_4_star,
    COUNT(CASE WHEN Service_rating = 5 THEN 1 END) AS service_5_star
    
    FROM property_review
    WHERE property_review.PID =  '${PID}';
    `;


    const propertyNameSql = `SELECT Property_title FROM property WHERE PID = '${PID}'`;

    Promise.all([
      new Promise((resolve, reject) => {
        connection.query(pieSql, (err, pieResults) => {
          if (err) {
            reject(err);
          } else {
           
            resolve({ pieResults: pieResults });
          }
        });
      }),
      new Promise((resolve, reject) => {
        connection.query(barSql, (err, barResults) => {
          if (err) {
            reject(err);
          } else {
           
            resolve({ barResults: barResults });
          }
        });
      }),
      new Promise((resolve, reject) => {
        connection.query(propertyNameSql, (err, propertyNameResults) => {
          if (err) {
            reject(err);
          } else {
            
            resolve({ propertyNameResults: propertyNameResults[0].Property_title });
          }
        });
      }),
    ]) .then(([s1, s2, s3]) => {
          
      const responseObj = {
        pieResults: s1.pieResults,
        barResults: s2.barResults,
        propertyNameResults:  s3.propertyNameResults
      };

      console.log("Response object: ", responseObj);

      res.status(200).json(responseObj);
      connection.release(); 
    })
    .catch((error) => {
      console.error('Error executing SQL queries:', error);
      res.status(500).json({ message: 'Error executing SQL queries' });
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


