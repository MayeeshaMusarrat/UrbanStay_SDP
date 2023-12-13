import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './IconPopup.module.css';
import SignoutConfirmationPopup from '../components/SignoutConfirmationPopup';
import PortalPopup from './PortalPopup';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';

const IconPopup = ({ topMargin, name = "" }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const storedValue = localStorage.getItem('email');

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
    
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: 'red',
      color: 'red',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    }
  }));


  const [invisible, setInvisible] = useState(false);

  const handleBadgeVisibility = () => {
    setInvisible(!invisible);
  };

  const navigate = useNavigate();
  const handleProfileClick = () => {
    navigate('/temp-profile');
  };

  const handleNotificationClick = () => {
    navigate('/notifications');
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


  function stringToColor(string) {
    let hash = 0;
    let i;
  
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
      children: `${name.split(' ')[0][0]}`,
    };
  }


  const [seenValue, setSeenValue] = useState(1);
  
  useEffect(() => {
    fetch(`http://localhost:5001/seenNotifYet?email=${storedValue}`)
      .then(response => response.json())
      .then(data => {
        console.log("data: ", data);
        setSeenValue(data.searchResults[0].seen);
      
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const notificationTextStyles = seenValue === 0 ? styles.blinkingText : '';
  

  return (
    <div className={styles.iconpopup} style={{ top: topMargin }}>

    <div> 
      
          <Avatar
            alt="Default User"
          
            style = {{left: 259, top: 23.5, zIndex: 1000, height: 31, width: 31, cursor: "pointer"}}
            {...stringAvatar(name)}
            
          />
      
      <div className={styles.overall}>
      {seenValue === 0 && (
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
            style={{ right: -277, top: -10, zIndex: 1000 }}
          />
        )}
    
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
            <button className={styles.wishlistbtn} id="accSettings" onClick={handleProfileClick}>
              <button className={styles.profile}> Account Settings </button>
            </button>
            <button className={styles.hostbtn} id="accSettings" onClick={handleHostPlaceClick}>
              <button className={styles.profile}> Host a place</button>
            </button>
            <button className={styles.notifbtn} id="accSettings" onClick = {handleNotificationClick} >
            <button className={`${styles.profile} ${notificationTextStyles}`}>
              
              Notifications
              
              
              
              </button>
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
    </div>
  );
};

export default IconPopup;
