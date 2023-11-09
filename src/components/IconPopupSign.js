import React, { useState,  useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './IconPopupSign.module.css';

const IconPopup = () => {


    // conditionally render the popups here pleaasee!!
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };




  return (
    <div className={styles.iconpopup} style = {{top: 20}}>
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
          


            <button className={styles.profilebtn} id="accSettings">
              <button className={styles.profile}> Sign in</button>
            </button>
         
            <button className={styles.signoutbtn} id="accSettings">
              <button className={styles.signOut}> Sign up</button>
            </button>


          </div>
        </div>
      </div>
    </div>
  );
};

export default IconPopup;
