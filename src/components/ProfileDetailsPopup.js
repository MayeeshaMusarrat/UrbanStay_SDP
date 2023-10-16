import { useCallback } from "react";
import { TextField, Checkbox, FormControlLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./ProfileDetailsPopup.module.css";

const ProfileDetailsPopup = () => {
  const navigate = useNavigate();

  const onFrameButtonClick = useCallback(() => {
    navigate("/profile");
  }, [navigate]);

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
        multiline
      />
      <TextField
        className={styles.city}
        color="info"
        rows={1}
        maxRows={1}
        label="Enter City"
        sx={{ width: 348 }}
        variant="outlined"
        multiline
      />
      <button className={styles.saveWrapper} onClick={onFrameButtonClick}>
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
        variant="outlined"
        multiline
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
