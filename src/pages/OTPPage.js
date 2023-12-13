import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./OTPPage.module.css"; 
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const OTPPage = () => {
  const [otp, setOTP] = useState("");
  const navigate = useNavigate();

  // Get the value from local storage

  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleClick = () => {
    setOpenSnackbar(true);
    setTimeout(() => {
      setOpenSnackbar(false);
    }, 1050);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const goToHome = () => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
}

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedOTP = localStorage.getItem("OTP1");

    // Convert the stored value to a number if needed
    //const retrievedOTP = parseInt(storedOTP, 10);


    console.log("OTP is ", otp);
    console.log("OTP from local storage is ", storedOTP);
  

    if (otp === storedOTP.toString() && localStorage.getItem('ishost') === '1') {
     




      // OTP matched, proceed with the fetch request
      const storedFirstname = localStorage.getItem("firstname");
      const storedLastname = localStorage.getItem("lastname");
      const storedPhone = localStorage.getItem("phone");
      const storedBirthdate = localStorage.getItem("birthdate");
      const storedEmail = localStorage.getItem("email");
      const storedPassword = localStorage.getItem("password");
      const storedProfilePic = localStorage.getItem("profile_pic");

      const user = {
        firstname: storedFirstname,
        lastname: storedLastname,
        phone_number: storedPhone,
        birthdate: storedBirthdate,
        email: storedEmail,
        password: storedPassword,
        profile_pic: storedProfilePic,
      };
      localStorage.clear();


      fetch("http://localhost:5001/host-signup-page", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((result) => {
          if (result.status === 200) {
            handleClick();
            goToHome();
          } else {
            console.log("Oops");
          }
        });
    }
    else if (otp === storedOTP.toString() && localStorage.getItem('ishost') === '0') {
      console.log("i m doin guest sign-up");
      console.log("OTP did match");
     
      <Snackbar open={openSnackbar} autoHideDuration={1050} onClose={handleCloseSnackbar}>
      <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
        Email is verified! You have successfully registered as a guest in UrbanStay.
      </Alert>
     </Snackbar>
      // OTP matched, proceed with the fetch request
      const storedFirstname = localStorage.getItem("firstname");
      const storedLastname = localStorage.getItem("lastname");
      const storedPhone = localStorage.getItem("phone");
      const storedBirthdate = localStorage.getItem("birthdate");
      const storedEmail = localStorage.getItem("email");
      const storedPassword = localStorage.getItem("password");
      const storedProfilePic = localStorage.getItem("profile_pic");
      const user = {
        firstname: storedFirstname,
        lastname: storedLastname,
        phone_number: storedPhone,
        email: storedEmail,
        password: storedPassword
      };
      localStorage.clear();


      fetch("http://localhost:5001/guest-signup-page", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      }).then(result => {

        if (result.status == 500) {
          alert("Error occured.");
        }
        else {
          navigate("/");
        }
      })
    }
    else {
      console.log("OTP DID NOT MATCH!");
      // OTP did not match, show an alert
      alert("OTP did not match. Try again.");
    }

    // Redirect to another page after OTP verification
    // navigate("/");
  };

  return (
    <> 
    
    <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
      <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
        Email is verified! You have successfully registered in UrbanStay.
      </Alert>
    </Snackbar>


    <img
    className={styles.guestSignupPageChild}
    alt=""
    src="/group-1945@2x.png"
  />
    <div className={styles.container}>
     
      <div className={styles.formContainer}>
      
        <h2 className={styles.formTitle}>Enter OTP</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            className={styles.otpInput}
            label="OTP"
            type="text"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
            required
          />
          <Button
            className={styles.submitButton}
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
    </>
  );
};

export default OTPPage;
