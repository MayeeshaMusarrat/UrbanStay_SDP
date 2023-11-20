import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './IconPopup.module.css';
import SignoutConfirmationPopup from '../components/SignoutConfirmationPopup';
import PortalPopup from './PortalPopup';

const IconPopup = ({ topMargin }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupZIndex, setPopupZIndex] = useState(1); // Initial z-index value

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
    setPopupZIndex(isPopupVisible ? 100000001 : 1); // Update z-index based on visibility
    console.log("visiility: ", popupZIndex);
    console.log("popup: ", isPopupVisible);
  };

  

  const navigate = useNavigate();
  const handleProfileClick = () => {
    navigate('/temp-profile');
  };

  const handleHostPlaceClick = () => {
    navigate('/hosting-intro');
  };

  const [isSignoutConfirmationPopupOpen, setSignoutConfirmationPopupOpen] = useState(false);

  const openSignoutConfirmationPopup = useCallback(() => {
    setSignoutConfirmationPopupOpen(true);
  }, []);

  const closeSignoutConfirmationPopup = useCallback(() => {
    setSignoutConfirmationPopupOpen(false);
  }, []);

  useEffect(() => {
    // Apply dynamic z-index after the state change
    document.getElementById('popupContainer').style.zIndex = popupZIndex;
   
  }, [popupZIndex]);


  function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }
  
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }
  

  return (
    <div className={styles.iconpopup} style={{ top: topMargin }}>
      <div className={styles.overall}>
        <img className={styles.profileIcon} alt="" src="/profile-icon@2x.png" onClick={togglePopup} />
        <div
          className={`${styles.loginPopupWithLogoutGrp} ${isPopupVisible ? styles.active : ''}`}
          id="popupContainer"
        >
          <div className={styles.loginPopupWithLogoutGrpChild} />
          <div className={styles.lineParent}>
            <div className={styles.groupChild} />
            <button className={styles.profilebtn} id="accSettings" onClick={handleProfileClick}>
              <button className={styles.profile}> Profile</button>
            </button>
            <button className={styles.wishlistbtn} id="accSettings">
              <button className={styles.profile}> Wishlist</button>
            </button>
            <button className={styles.hostbtn} id="accSettings" onClick={handleHostPlaceClick}>
              <button className={styles.profile}> Host a place</button>
            </button>
            <button className={styles.notifbtn} id="accSettings">
              <button className={styles.profile}> Notifications</button>
            </button>
            <button className={styles.signoutbtn} id="accSettings">
              <button className={styles.signOut} onClick={openSignoutConfirmationPopup}>
                Sign out
              </button>
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

export default IconPopup;
