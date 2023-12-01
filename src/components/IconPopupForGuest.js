import React, { useState, useCallback } from 'react';
import styles from './IconPopupForGuest.module.css';
import { useNavigate } from 'react-router-dom';
import SignoutConfirmationPopup from "../components/SignoutConfirmationPopup";
import PortalPopup from './PortalPopup';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const IconPopupForGuest = ({ topMargin }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isSignoutConfirmationPopupOpen, setSignoutConfirmationPopupOpen] = useState(false);

  const openSignoutConfirmationPopup = useCallback(() => {
    setSignoutConfirmationPopupOpen(true);
  }, []);

  const closeSignoutConfirmationPopup = useCallback(() => {
    setSignoutConfirmationPopupOpen(false);
  }, []);

  const handleToggle = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);

  const id = open ? 'transitions-popper' : undefined;

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

  return (
    <div className={styles.iconpopup} style={{ top: topMargin }}>
      <div className={styles.overall}>
        <img
          className={styles.profileIcon}
          alt=""
          src="/profile-icon@2x.png"
          onClick={handleToggle}
        />
        <Popper
          id={id}
          open={open}
          anchorEl={anchorEl}
          placement="bottom-end"
          transition
        >
          {({ TransitionProps }) => (
            <Paper>
              <Typography>
                {/* Popup content here */}
                <div className={styles.loginPopupWithLogoutGrpChild} />
                <div className={styles.lineParent}>
                  <div className={styles.groupChild} />
                  <button className={styles.profilebtn} id="accSettings" onClick={handleProfileClick}>
                    <button className={styles.profile}  > Profile</button>
                  </button>
                  <button className={styles.wishlistbtn} id="accSettings">
                    <button className={styles.profile}> Wishlist</button>
                  </button>
                  <button className={styles.hostbtn} id="accSettings" onClick={handleBecomeHostClick}>
                    <button className={styles.profile}> Become A Host</button>
                  </button>
                  <button className={styles.notifbtn} id="accSettings" onClick={handleNotifications}>
                    <button className={styles.profile}> Notifications</button>
                  </button>
                  <button className={styles.signoutbtn} id="accSettings" onClick={openSignoutConfirmationPopup}>
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
              </Typography>
            </Paper>
          )}
        </Popper>
      </div>
    </div>
  );
};

export default IconPopupForGuest;
