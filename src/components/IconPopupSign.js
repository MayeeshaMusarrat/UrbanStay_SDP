import React, { useState,  useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './IconPopupSign.module.css';
import SignoutConfirmationPopup from "../components/SignoutConfirmationPopup";
import PortalPopup from './PortalPopup';

const IconPopupSign = ({topMargin}) => {

  console.log(
    "topMargin", topMargin
  );

    // conditionally render the popups here pleaasee!!
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const navigate = useNavigate();

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleSignInPage = () => {
    navigate('/sign-in-page'); 
  };

  const handleSignUpPage = () => {
    navigate('/leading-page'); 
  };

 
  return (
    <div className={styles.iconpopup} style = {{top: topMargin}}>
      <div className={styles.overall}>
        <img
          className={styles.profileIcon}
          alt=""
          src="/profile-icon@2x.png"
          onClick={togglePopup}
        />
        <div
          className={`${styles.loginPopupWithLogoutGrp} ${
            isPopupVisible ? styles.active : ''
          }`}
        >
          {/* Popup content here */}
          <div className={styles.loginPopupWithLogoutGrpChild} />
          <div className={styles.lineParent}>

            <button className={styles.profilebtn} id="accSettings" onClick = {handleSignInPage} >
              <button className={styles.profile}> Sign in</button>
            </button>
         
            <button className={styles.signoutbtn} id="accSettings" onClick = {handleSignUpPage} >
              <button className={styles.signOut}> Sign up</button>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default IconPopupSign;
