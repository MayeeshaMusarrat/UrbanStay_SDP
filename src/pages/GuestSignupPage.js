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

const GuestSignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  const onBecomeMemberBtnClick = useCallback(() => {
    navigate("/urbanstay-landing-page");
  }, [navigate]);

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
      <form className={styles.rectangleParent}>
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
          multiline
        />
        <TextField
          className={styles.lastnameinput}
          color="info"
          placeholder="Enter Last Name"
          required={true}
          fullWidth={true}
          sx={{ width: 495 }}
          variant="outlined"
          multiline
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
        <FormControl
          className={styles.stateinput}
          sx={{ width: 336 }}
          variant="outlined"
        >
          <InputLabel color="info" />
          <Select color="info" />
          <FormHelperText />
        </FormControl>
        <TextField
          className={styles.pwdinput}
          color="info"
          placeholder="Choose a password (At least 8 characters long)"
          required={true}
          sx={{ width: 482 }}
          variant="outlined"
          type={showPassword ? "text" : "password"}
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
        <TextField
          className={styles.emailinput}
          color="info"
          placeholder="Enter Email"
          required={true}
          fullWidth={true}
          sx={{ width: 496 }}
          variant="outlined"
          multiline
        />
        <TextField
          className={styles.pwdconfirminput}
          color="info"
          placeholder="Confirm Password"
          required={true}
          sx={{ width: 496 }}
          variant="outlined"
          type={showPassword ? "text" : "password"}
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
          onClick={onBecomeMemberBtnClick}
        >
          <button
            className={styles.becomememberbtnChild}
            id="becomeMemberBtn"
          />
          <div className={styles.becomeAGuest1}>Become a Guest</div>
        </button>
        <TextField
          className={styles.phonenumberinput}
          color="info"
          placeholder="Enter Phone Number"
          required={true}
          fullWidth={true}
          sx={{ width: 469 }}
          variant="outlined"
          multiline
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
