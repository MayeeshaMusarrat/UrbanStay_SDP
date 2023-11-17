import { useCallback, useState, useEffect } from "react";
import { TextField, Checkbox, FormControlLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./ProfileDetailsPopup.module.css";

const ProfileDetailsPopup = () => {
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const email = localStorage.getItem('email');

  useEffect(() => {
    // Fetch data from localStorage and set the initial state
    const storedDescription = localStorage.getItem('Description');
    const storedCity = localStorage.getItem("City") ;
    const storedCountry = localStorage.getItem("Country");

    setDescription(storedDescription);
    setCity(storedCity);
    setCountry(storedCountry);
  }, []);

const handleSubmit = (e) => {
    e.preventDefault();

    const details = {
      email: email,
      description: description,
      city: city,
      country: country,
    };

    fetch("http://localhost:5001/temp-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    })
      .then((response) => {
        if (response.status === 200) {
          navigate("/temp-profile");
          return response.json();
        } else {
          // Handle other response statuses here
          console.log("Unexpected response:", response.status);
        }
      })
      .then((data) => {
        // Update localStorage after successful response
        localStorage.setItem("Description", description);
        localStorage.setItem("City", city);
        localStorage.setItem("Country", country);
      })
      .catch((error) => {
        console.log("Error occurred:", error);
      });
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleStateChange = (event) => {
    setCountry(event.target.value);
  };



  return (
    <div className={styles.profileDetailsPopup}>
      <div className={styles.profileDetailsPopupChild} />
      <TextField
      className={styles.state}
      color="info"
      rows={1}
      maxRows={1}
      label="Enter State"
      sx={{ width: 348 }}
      variant="outlined"
      value={country}
      onChange={handleStateChange}
    />
      <TextField
      className={styles.city}
      color="info"
      rows={1}
      maxRows={1}
      label="Enter City"
      sx={{ width: 348 }}
      variant="outlined"
      value={city}
      onChange={handleCityChange}
    />
      <button className={styles.saveWrapper} onClick={handleSubmit}>
        <button className={styles.save}>{`Save `}</button>
      </button>
      <img className={styles.crossIcon} alt="" src="/cross1.svg" />
      <div className={styles.giveAShort}>
        Give a Short Description about Yourself!
      </div>
      <div className={styles.selectLanguagesYou}>
        Select Languages You can Speak
      </div>
      <div className={styles.whereDoYou}>Where Do You Live?</div>
      <TextField
      className={styles.descriptionbox}
      color="info"
      rows={3}
      maxRows={6}
      label="Add Description (Maximum 500 words)"
      fullWidth={true}
      sx={{ width: 753 }}
      value={description}
      variant="outlined"
      multiline
      onChange={handleDescriptionChange} // This line adds the onChange event handler
    />
      <FormControlLabel
        className={styles.profileDetailsPopupItem}
        label="Bangla"
        control={<Checkbox color="info" />}
      />
      <FormControlLabel
        className={styles.profileDetailsPopupInner}
        label="English"
        control={<Checkbox color="info" />}
      />
      <FormControlLabel
        className={styles.groupFormcontrollabel}
        label="Español"
        control={<Checkbox color="info" />}
      />
      <FormControlLabel
        className={styles.profileDetailsPopupChild1}
        label="Hindi"
        control={<Checkbox color="info" />}
      />
      <FormControlLabel
        className={styles.profileDetailsPopupChild2}
        label="Mandarin"
        control={<Checkbox color="info" />}
      />
    </div>
  );
};

export default ProfileDetailsPopup;
