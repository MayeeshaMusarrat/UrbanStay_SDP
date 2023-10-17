import { useState, useCallback } from "react";
import {
  TextField,
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Icon,
  InputAdornment,
  IconButton,
  Box,
  Autocomplete
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useNavigate } from "react-router-dom";
import styles from "./HostSignupPage.module.css";
import countryData from "./countryData";



const HostSignupPage = () => {

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  const handleCountryChange = (event, newValue) => {
    setSelectedCountry(newValue);
    setSelectedState(null); // Reset the selected state when the country changes
  };


  const [
    birthdateInputDateTimePickerValue,
    setBirthdateInputDateTimePickerValue,
  ] = useState(null);
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
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className={styles.hostSignupPage}>
        <div className={styles.gradient}>
          <div className={styles.chooseWrapper}>
            <div className={styles.choose}>Reserve</div>
          </div>
        </div>
        <img
          className={styles.hostSignupPageChild}
          alt=""
          src="/group-1945@2x.png"
        />
        <form className={styles.rectangleParent}>
          <div className={styles.frameChild} />
          <b className={styles.h3}>Sign Up for UrbanStay</b>
          <div className={styles.becomeAMember}>
            Become a member of our community and enjoy the privileges from the
            comfort of your homes!
          </div>
          <TextField
            className={styles.firstnameinput}
            color="info"
            placeholder="Enter First Name"
            required={true}
            fullWidth={true}
            sx={{ width: 336 }}
            variant="outlined"
            multiline
          />
          <TextField
            className={styles.lastnameinput}
            color="info"
            placeholder="Enter Last Name"
            required={true}
            fullWidth={true}
            sx={{ width: 336 }}
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


          <FormControl
            className={styles.countryinput}
            sx={{ width: 832 }}
            variant="outlined">

              
            <Autocomplete
            id="country-select-demo"
            sx={{ width: 480 }}
            fullwidth = {true}
            options={countryData}
            value={selectedCountry}
             onChange={handleCountryChange}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                <img
                  loading="lazy"
                  width="20"
                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                  alt=""
                />
                {option.label} ({option.code}) +{option.phoneCode}
                
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder = "Select Country"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password', 
                }}
               
              />
            )}
          />
          </FormControl>


          <div className={styles.email}>
            Make sure the provided information matches your Government ID.
          </div>
          <div className={styles.formControl2}>
            <span className={styles.firstName}>{`Country/Region `}</span>
            <span className={styles.span}>*</span>
          </div>
          <div className={styles.formControl3}>
            <span className={styles.firstName}>{`Phone Number `}</span>
            <span className={styles.span}>*</span>
          </div>
          <div className={styles.formControl4}>
            <span className={styles.firstName}>{`City `}</span>
            <span className={styles.span}>*</span>
          </div>




          <FormControl
            className={styles.cityinput}
            sx={{ width: 505 }}
            variant="outlined">

          <Autocomplete
                  options={selectedCountry?.states || []}
                  getOptionLabel={(option) => option}
                  value={selectedState}
                  onChange={(_, newValue) => setSelectedState(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select a State"
                      variant="outlined"
                    />
                  )}
          />
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
                    <Icon>
                      {showPassword ? "visibility_off" : "visibility"}
                    </Icon>
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
                    <Icon>
                      {showPassword ? "visibility_off" : "visibility"}
                    </Icon>
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <div className={styles.formControl5}>
            <span className={styles.firstName}>{`Birthdate `}</span>
            <span className={styles.span}>*</span>
          </div>
          <div className={styles.formControl6}>
            <span
              className={styles.firstName}
            >{`Choose a Strong Password `}</span>
            <span className={styles.span}>*</span>
          </div>
          <div className={styles.formControl7}>
            <span className={styles.firstName}>{`Confirm Password `}</span>
            <span className={styles.span}>*</span>
          </div>
          <div className={styles.formControl8}>
            <span className={styles.firstName}>{`Email `}</span>
            <span className={styles.span}>*</span>
          </div>
          <div className={styles.uploadYourPhoto}>Upload Your Photo</div>
          <div className={styles.putimage}>
            <div className={styles.putimageChild} />
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
          <button
            className={styles.becomememberbtn}
            id="member"
            onClick={onBecomeMemberBtnClick}
          >
            <button
              className={styles.becomememberbtnChild}
              id="becomeMemberBtn"
            />
            <div className={styles.becomeAMember1}>Become a Member</div>
          </button>
          <TextField
            className={styles.phonenumberinput}
            color="info"
            placeholder="Enter Phone Number"
            required={true}
            fullWidth={true}
            sx={{ width: 336 }}
            variant="outlined"
            multiline
          />
        </form>
        <div className={styles.urbanstayLogo}>
          <b className={styles.urbanstaylogotext}>URBANSTAY</b>
          <img
            className={styles.urbanstaylogopicIcon}
            alt=""
            src="/urbanstaylogopic@2x.png"
          />
        </div>
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
      </div>
    </LocalizationProvider>
  );
};

export default HostSignupPage;
