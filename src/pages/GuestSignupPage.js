import { useState, useCallback } from "react";
import {
  TextField,
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  InputAdornment,
  Icon,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./GuestSignupPage.module.css";
import MuiAlert from "@mui/material/Alert";
import emailjs from "@emailjs/browser";

const MyComponent = () => {
  useEffect(() => {
    const emailJsScript = document.createElement('script');
    emailJsScript.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    emailJsScript.async = true;
    document.head.appendChild(emailJsScript);

    emailJsScript.onload = () => {
      emailjs.init("FjbpWqPaNlRVTl0tE");
    };

    return () => {
      document.head.removeChild(emailJsScript);
    };
  }, []);

}

const GuestSignupPage = () => {

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const navigate = useNavigate();

  const handleShowPasswordClick1 = () => {
    setShowPassword1(!showPassword1);
  };

  const handleShowPasswordClick2 = () => {
    setShowPassword2(!showPassword2);
  }


  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [Error, setError] = useState(null);

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }


  const sendMail = async (e) => {
    e.preventDefault();


    localStorage.setItem("firstname", firstname);
    localStorage.setItem("lastname", lastname);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("phone", phone);
    localStorage.setItem('ishost', '0');

    console.log("Firstname:", firstname);
    console.log("Lastname:", lastname);
    console.log("Email:", email);

    const generateOTP = () => {
      return Math.floor(1000 + Math.random() * 9000);
    };

    const OTP = generateOTP();
    localStorage.setItem("OTP1", OTP.toString());

    console.log(OTP);

    const emailData = {
      to_name: `${firstname} ${lastname}`,
      from_name: "UrbanStay",
      message: `Here is your four-digit OTP: ${OTP}`,
      email: `${email}`,
    };

    try {
      // Send the email using EmailJS
      const emailResponse = await emailjs.send(
        "service_7yhjxvg",
        "template_66yihk3",
        emailData,
        "FjbpWqPaNlRVTl0tE"
      );

      // Log the response
      console.log("Email sent successfully:", emailResponse);
    } catch (error) {
      // Log any errors
      console.error("Error sending email:", error);
    }

    navigate("/otp-page")

  }


  const handleChange = event => {
    if (!isValidEmail(event.target.value)) {
      setError('Email is invalid');
    } else {
      setError(null);
    }

    setEmail(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    const user = {
      firstname: firstname,
      lastname: lastname,
      phone_number: phone,
      email: email,
      password: password
    };


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
  const onAlreadyHaveAnClick = useCallback(() => {
    navigate("/sign-in-page");
  }, [navigate]);

  return (

    <div className={styles.guestSignupPage}>
      <div className={styles.gradient}>
        <div className={styles.chooseWrapper}>
          <div className={styles.choose}>Reserve</div>
        </div>
      </div>
      <img
        className={styles.guestSignupPageChild}
        alt=""
        src="/group-1945@2x.png"
      />
      <form className={styles.rectangleParent} onSubmit={sendMail}>
        <div className={styles.frameChild} />
        <b className={styles.h3}>Create a Guest Account on UrbanStay</b>
        <div className={styles.becomeAGuest}>
          Become a Guest of our community and enjoy the privileges from the
          comfort of your homes!
        </div>
        <TextField
          className={styles.firstnameinput}
          color="info"
          placeholder="Enter First Name"
          required={true}
          fullWidth={true}
          sx={{ width: 473 }}
          variant="outlined"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <TextField
          className={styles.lastnameinput}
          color="info"
          placeholder="Enter Last Name"
          required={true}
          fullWidth={true}
          sx={{ width: 495 }}
          variant="outlined"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <div className={styles.formControl}>
          <span className={styles.firstName}>{`First Name `}</span>
          <span className={styles.span}>*</span>
        </div>
        <div className={styles.formControl1}>
          <span className={styles.firstName}>{`Last Name `}</span>
          <span className={styles.span}>*</span>
        </div>
        <div className={styles.email}>
          Make sure the provided information matches your Government ID.
        </div>
        <div className={styles.formControl2}>
          <span className={styles.firstName}>{`Phone Number `}</span>
          <span className={styles.span}>*</span>
        </div>

        <TextField
          className={styles.pwdinput}
          color="info"
          placeholder="Choose a password (At least 8 characters long)"
          required={true}
          sx={{ width: 482 }}
          variant="outlined"
          type={showPassword1 ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleShowPasswordClick1}
                  aria-label="toggle password visibility"
                >
                  <Icon>{showPassword1 ? "visibility_off" : "visibility"}</Icon>
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          className={styles.emailinput}
          color="info"
          placeholder="Enter Email"
          required={true}
          fullWidth={true}
          sx={{ width: 496 }}
          variant="outlined"
          value={email}
          onChange={handleChange}
          error={Error && email.length != 0}
          helperText={Error && email.length != 0 ? 'Email is not valid.' : ''}
        />
        <TextField
          className={styles.pwdconfirminput}
          color="info"
          placeholder="Confirm Password"
          required={true}
          error={password != confirmPassword && confirmPassword.length != 0}
          helperText={password != confirmPassword && confirmPassword.length != 0 ? 'Password does not match' : ''}
          sx={{ width: 496 }}
          variant="outlined"
          type={showPassword2 ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleShowPasswordClick2}
                  aria-label="toggle password visibility"
                >
                  <Icon>{showPassword2 ? "visibility_off" : "visibility"}</Icon>
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <div className={styles.formControl3}>
          <span
            className={styles.firstName}
          >{`Choose a Strong Password `}</span>
          <span className={styles.span}>*</span>
        </div>
        <div className={styles.formControl4}>
          <span className={styles.firstName}>{`Confirm Password `}</span>
          <span className={styles.span}>*</span>
        </div>
        <div className={styles.formControl5}>
          <span className={styles.firstName}>{`Email `}</span>
          <span className={styles.span}>*</span>
        </div>
        <button
          className={styles.becomememberbtn}
          id="member"

        >
          <button
            className={styles.becomememberbtnChild}
            id="becomeMemberBtn"
            type="submit"
          />
          <div className={styles.becomeAGuest1}>Become a Guest</div>
        </button>
        <TextField
          className={styles.phonenumberinput}
          color="info"
          placeholder="Enter Phone Number"
          required={true}
          fullWidth={true}
          error={phone.length != 11 && phone.length > 0}
          helperText={phone.length != 0 && phone.length != 11 ? 'Phone Number must be of 11 digits' : ''}
          sx={{ width: 469 }}
          variant="outlined"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <div
          className={styles.alreadyHaveAnContainer}
          onClick={onAlreadyHaveAnClick}
        >
          <span className={styles.alreadyHaveAnContainer1}>
            <span
              className={styles.alreadyHaveAn}
            >{`Already have an account? `}</span>
            <b className={styles.signIn}>Sign In</b>
          </span>
        </div>
      </form>
      <div className={styles.urbanstayLogo}>
        <b className={styles.urbanstaylogotext}>URBANSTAY</b>
        <img
          className={styles.urbanstaylogopicIcon}
          alt=""
          src="/urbanstaylogopic@2x.png"
        />
      </div>
    </div>
  );
};

export default GuestSignupPage;