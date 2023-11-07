import React, { useState,  useCallback, useEffect, useNavigate } from 'react';
import styles from './IconPopup.module.css';

const IconPopup = () => {

    // conditionally render the popups here pleaasee!!
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };




  return (
    <div className={styles.iconpopup}>
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
            <div className={styles.groupChild} />
            <button className={styles.profilebtn} id="accSettings">
              <button className={styles.profile} > Profile</button>
            </button>
            <button className={styles.wishlistbtn} id="accSettings">
              <button className={styles.profile}> Wishlist</button>
            </button>
            <button className={styles.hostbtn} id="accSettings">
              <button className={styles.profile}> Host a place</button>
            </button>
            <button className={styles.notifbtn} id="accSettings">
              <button className={styles.profile}> Notifications</button>
            </button>
            <button className={styles.signoutbtn} id="accSettings">
              <button className={styles.signOut}> Sign out</button>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconPopup;
