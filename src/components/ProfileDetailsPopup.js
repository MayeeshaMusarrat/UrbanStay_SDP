import { useCallback, useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./ProfileDetailsPopup.module.css";

const ProfileDetailsPopup = () => {
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [pass, setPass] = useState("");

  const email = localStorage.getItem("email");

  useEffect(() => {
    // Fetch data from localStorage and set the initial state
    const storedDescription = localStorage.getItem("Description");
    const storedCity = localStorage.getItem("City");
    const storedCountry = localStorage.getItem("Country");
    const storedPhone = localStorage.getItem("phone");
    const storedPass = localStorage.getItem("pass");

    setDescription(storedDescription);
    setCity(storedCity);
    setCountry(storedCountry);
    setPhone(storedPhone);
    setPass(storedPass);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const details = {
      email: email,
      description: description,
      phone: phone,
      pass: pass,
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
        // Update localStorage after a successful response
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
    setPhone(event.target.value);
  };

  const handleStateChange = (event) => {
    setPass(event.target.value);
  };

  return (
    <div className={styles.profileDetailsPopup}>
      <div className={styles.profileDetailsPopupChild} />
      <TextField
        className={styles.state}
        color="info"
        rows={1}
        maxRows={1}
        label="Edit Password"
        sx={{ width: 348 }}
        variant="outlined"
       
        onChange={handleStateChange}
      />
      <TextField
        className={styles.city}
        color="info"
        rows={1}
        maxRows={1}
        label="Edit Phone"
        sx={{ width: 348 }}
        variant="outlined"
        value={phone}
        onChange={handleCityChange}
      />
      <button className={styles.saveWrapper} onClick={handleSubmit}>
        <button className={styles.save}>{`Save `}</button>
      </button>
      <img className={styles.crossIcon} alt="" src="/cross1.svg" />
      <div className={styles.giveAShort}>
        Give a Short Description about Yourself!
      </div>
      <div className={styles.whereDoYou}>Update Your Information</div>
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
        onChange={handleDescriptionChange}
      />
    </div>
  );
};

export default ProfileDetailsPopup;
