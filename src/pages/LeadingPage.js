import { useCallback, useState } from "react";
import { Radio, FormControlLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./LeadingPage.module.css";

const LeadingPage = () => {
  const navigate = useNavigate();

  const onFrameButtonClick = useCallback(() => {
    navigate("/host-welcome");
  }, [navigate]);

  const onGroupContainerClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const [value,setValue] = useState("");

  const handleRadioChange = (event) => {
    setValue(event.target.value);
   
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    if (value === "1") {
      navigate("/host-welcome");
     
    } else if (value === "2") {
      navigate("/guest-welcome");
      
    } 
  };

  return (
    <div className={styles.leadingPage}>
      <div className={styles.groupParent}>
        <img className={styles.groupChild} alt="" src="/group-1996@2x.jpg" />
        <b className={styles.h3}>
          We are extremely grateful to you for wanting to join our vast
          community!
        </b>
        <b className={styles.h31}>{`Let’s Get Started! `}</b>
        <div className={styles.groupItem} />
        <div className={styles.groupInner} />
        <div className={styles.lineDiv} />
        <FormControlLabel
          className={styles.radio2}
          label=""
          control={<Radio color="info" />}
          value = "2"
          onChange={handleRadioChange}
        />
        <FormControlLabel
          className={styles.radio1}
          label=""
          control={<Radio color="info" />}
          value = "1"
          onChange={handleRadioChange}
        />
        <form  onSubmit={handleSubmit} > 
        <button className={styles.continueWrapper}>
          <button className={styles.continue} >Continue</button>
        </button>
        </form>
        <div className={styles.iWantTo}>I want to rent out my place</div>
        <div className={styles.iWantTo1}>
          I want to Browse for places to stay
        </div>
        <div
          className={styles.kindlySelectOne}
        >{`Kindly select one of the options below to jumpstart your journey with UrbanStay. `}</div>
        <div
          className={styles.youCanGet}
        >{`You can get to the process of renting and hosting a place of your preference in a minute! Allow us to guide you through our service for optimal experience. `}</div>
        <div className={styles.urbanstayParent} onClick={onGroupContainerClick}>
          <div className={styles.urbanstay}>
            <span className={styles.urbanstayTxt}>
              <b>URBAN</b>
              <span className={styles.stay}>STAY</span>
            </span>
          </div>
          <img className={styles.image31} alt="" src="/image-3-11@2x.png" />
        </div>
      </div>
    </div>
  );
};

export default LeadingPage;
