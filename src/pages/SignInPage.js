import { useState, useCallback } from "react";
import { TextField, InputAdornment, Icon, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./SignInPage.module.css";

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

///===================================================================

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const signin = {
      email: email,
      password: password
    };

    fetch("http://localhost:5001/signin-page", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signin),
    })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem('email', email);
          navigate("/temp-profile");
          return response.json();
        } 
        else if(response.status === 404) {
          alert("No such user found.");
          throw new Error("Sign in failed");
        }
        else if(response.status === 500) {
          alert("Invalid sign-in attempt.");
          throw new Error("Sign in failed");
        }
      })
      .catch((error) => {
        console.log("Error occurred:", error);
      
      });
  };

//======================================================================


  const onDontHaveAnClick = useCallback(() => {
    navigate("/leading-page");
  }, [navigate]);

  return (
    <div className={styles.signInPage}>
      <div className={styles.gradient}>
        <div className={styles.chooseWrapper}>
          <div className={styles.choose}>Reserve</div>
        </div>
      </div>
      <img
        className={styles.signInPageChild}
        alt=""
        src="/group-19451@2x.png"
      />

      <form onSubmit = {handleSubmit} > 
      <div className={styles.rectangleParent}>
        <div className={styles.groupChild} />
        <b className={styles.h3}>Sign In</b>
        <div className={styles.emaillabel}>{`Email `}</div>
        <div className={styles.pwdlabel}>Password</div>


        <TextField
          className={styles.pwd}
          color="info"
          placeholder="Enter Password"
          sx={{ width: 420 }}
          variant="outlined"
          type={showPassword ? "text" : "password"}
          value = {password}
          onChange = {(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleShowPasswordClick}
                  aria-label="toggle password visibility"
                >
                  <Icon>{showPassword ? "visibility_off" : "visibility"}</Icon>
                </IconButton>
              </InputAdornment>
            ),
          }}
        />


        <button className={styles.enterbtn} id="enterBtn">
          <img
            className={styles.enterbtnChild}
            alt=""
            src="/rectangle-98.svg"
          />
          <div className={styles.enter}>Enter</div>
        </button>


        <TextField
          className={styles.email}
          color="info"
          placeholder="Enter Email"
          fullWidth={true}
          sx={{ width: 420 }}
          variant="outlined"
          value = {email}
          onChange = {(e) => setEmail(e.target.value)}
        />
        <b className={styles.continueYourJourney}>
          Continue your journey with UrbanStay
        </b>
      </div>

      </form>


      <div className={styles.dontHaveAnContainer} onClick={onDontHaveAnClick}>
        <span className={styles.dontHaveAnContainer1}>
          <span className={styles.dontHaveAn}>{`Don’t have an account? `}</span>
          <b className={styles.signUp}>Sign Up</b>
        </span>
      </div>
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

export default SignInPage;
