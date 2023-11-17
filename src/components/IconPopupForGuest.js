import React, { useState,  useCallback, useEffect } from 'react';
import styles from './IconPopupForGuest.module.css';
import { useNavigate } from 'react-router-dom';
import SignoutConfirmationPopup from "../components/SignoutConfirmationPopup";
import PortalPopup from './PortalPopup';

const IconPopupForGuest = ({topMargin}) => {

    // conditionally render the popups here pleaasee!!
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const navigate = useNavigate(); 

  const handleProfileClick = () => {
    navigate('/temp-profile'); 
  };

  const handleBecomeHostClick = () => {
    navigate('/become-host'); 
  };

  const handleNotifications = () => {
    navigate('/notifications'); 
  };

  const [isSignoutConfirmationPopupOpen, setSignoutConfirmationPopupOpen] = useState(false);
  const openSignoutConfirmationPopup = useCallback(() => {
    setSignoutConfirmationPopupOpen(true);
  }, []);

  const closeSignoutConfirmationPopup = useCallback(() => {
    setSignoutConfirmationPopupOpen(false);
  }, []);


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
            <div className={styles.groupChild} />
            <button className={styles.profilebtn} id="accSettings" onClick = {handleProfileClick} >
              <button className={styles.profile}  > Profile</button>
            </button>
            <button className={styles.wishlistbtn} id="accSettings">
              <button className={styles.profile}> Wishlist</button>
            </button>
            <button className={styles.hostbtn} id="accSettings" onClick = {handleBecomeHostClick}>
              <button className={styles.profile}> Become A Host</button>
            </button>
            <button className={styles.notifbtn} id="accSettings" onClick = {handleNotifications} >
              <button className={styles.profile}> Notifications</button>
            </button>
            <button className={styles.signoutbtn} id="accSettings" onClick={openSignoutConfirmationPopup} >
              <button className={styles.signOut}> Sign out</button>
            </button>
            {isSignoutConfirmationPopupOpen && (
            <PortalPopup
              overlayColor="rgba(113, 113, 113, 0.3)"
              placement="Centered"
              onOutsideClick={closeSignoutConfirmationPopup}
            >
              <SignoutConfirmationPopup onClose={closeSignoutConfirmationPopup} />
            </PortalPopup>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconPopupForGuest;
