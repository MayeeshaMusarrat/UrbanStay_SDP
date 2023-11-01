import { useState } from "react";
import {
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  TextField,
  Icon,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import styles from "./BecomeHostSignupPage.module.css";

const BecomeHostSignupPage = () => {
  const [
    birthdateInputDateTimePickerValue,
    setBirthdateInputDateTimePickerValue,
  ] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className={styles.becomeHostSignupPage}>
        <div className={styles.frame}>
          <div className={styles.gradient}>
            <div className={styles.chooseWrapper}>
              <div className={styles.choose}>Reserve</div>
            </div>
          </div>
        </div>
        <img
          className={styles.becomeHostSignupPageChild}
          alt=""
          src="/group-1945@2x.png"
        />
        <div className={styles.frame1}>
          <form className={styles.rectangleParent}>
            <div className={styles.frameChild} />
            <b className={styles.h3}>Become a Host</b>
            <div className={styles.bySigningUp}>
              By signing up as a host, you can easily put your property up for
              rent in urbanStay!
            </div>
            <FormControl
              className={styles.countryinput}
              sx={{ width: 482 }}
              variant="outlined"
            >
              <InputLabel color="primary" />
              <Select color="primary">
                <MenuItem value="United States of America">
                  United States of America
                </MenuItem>
                <MenuItem value="Bangladesh">Bangladesh</MenuItem>
                <MenuItem value="India">India</MenuItem>
                <MenuItem value="Spain">Spain</MenuItem>
                <MenuItem value="China">China</MenuItem>
              </Select>
              <FormHelperText />
            </FormControl>
            <div className={styles.selectcountrytext}>Select Country</div>
            <div className={styles.email}>
              Make sure the provided information matches your Government ID.
            </div>
            <div className={styles.formControl}>
              <span className={styles.countryregion}>{`Country/Region `}</span>
              <span className={styles.span}>*</span>
            </div>
            <div className={styles.formControl1}>
              <span className={styles.countryregion}>{`City `}</span>
              <span className={styles.span}>*</span>
            </div>
            <FormControl
              className={styles.cityinput}
              sx={{ width: 505 }}
              variant="outlined"
            >
              <InputLabel color="info" />
              <Select color="info" size="medium" />
              <FormHelperText />
            </FormControl>
            <div className={styles.birthdateinput}>
              <DatePicker
                value={birthdateInputDateTimePickerValue}
                onChange={(newValue) => {
                  setBirthdateInputDateTimePickerValue(newValue);
                }}
                slotProps={{
                  textField: {
                    variant: "standard",
                    size: "medium",
                    fullWidth: true,
                    required: true,
                    color: "info",
                  },
                }}
              />
            </div>
            <TextField
              className={styles.pwdinput}
              color="info"
              placeholder="Choose a password (At least 8 characters long)"
              required={true}
              sx={{ width: 493 }}
              variant="outlined"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleShowPasswordClick}
                      aria-label="toggle password visibility"
                    >
                      <Icon>
                        {showPassword ? "visibility_off" : "visibility"}
                      </Icon>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <div className={styles.formControl2}>
              <span className={styles.countryregion}>{`Birthdate `}</span>
              <span className={styles.span}>*</span>
            </div>
            <div className={styles.formControl3}>Confirm Your Password</div>
            <div className={styles.uploadYourPhotoParent}>
              <div className={styles.uploadYourPhoto}>Upload Your Photo</div>
              <div className={styles.putimage}>
                <div className={styles.dragYourImagesHereOrBrowParent}>
                  <div className={styles.dragYourImagesContainer}>
                    <span
                      className={styles.dragYourImages}
                    >{`Drag your images here, or `}</span>
                    <b className={styles.browse}>browse</b>
                  </div>
                  <div className={styles.supportedJpgJpeg}>
                    Supported: JPG, JPEG, PNG
                  </div>
                </div>
              </div>
            </div>
            <button className={styles.becomememberbtn} id="member">
              <button
                className={styles.becomememberbtnChild}
                id="becomeMemberBtn"
              />
              <div className={styles.becomeAHost}>Become a Host</div>
            </button>
          </form>
        </div>
        <div className={styles.frame2}>
          <div className={styles.urbanstayLogo}>
            <b className={styles.urbanstaylogotext}>URBANSTAY</b>
            <img
              className={styles.urbanstaylogopicIcon}
              alt=""
              src="/urbanstaylogopic@2x.png"
            />
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default BecomeHostSignupPage;
