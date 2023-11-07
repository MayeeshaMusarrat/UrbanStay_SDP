import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./OTPPage.module.css"; // Import the CSS module

const OTPPage = () => {
  const [otp, setOTP] = useState("");
  const navigate = useNavigate();

  // Get the value from local storage


  const handleSubmit = (e) => {
    e.preventDefault();

    const storedOTP = localStorage.getItem("OTP1");

    // Convert the stored value to a number if needed
    //const retrievedOTP = parseInt(storedOTP, 10);


    console.log("OTP is ", otp);
    console.log("OTP from local storage is ", storedOTP);

    if (otp === storedOTP.toString() && localStorage.getItem('ishost') === '1') {
      console.log("i m doin host sign-up");
      console.log("OTP did match");
      alert("OTP MATCHED! E-mail verified! You can Sign In now!");
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
            navigate("/");
          } else {
            console.log("Oops");
          }
        });
    }
    else if (otp === storedOTP.toString() && localStorage.getItem('ishost') === '0') {
      console.log("i m doin guest sign-up");
      console.log("OTP did match");
      alert("OTP MATCHED! E-mail verified! You can Sign In now!");
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
  );
};

export default OTPPage;
