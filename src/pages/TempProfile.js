import { useState, useCallback, useEffect } from "react";
import ProfileDetailsPopup from "../components/ProfileDetailsPopup";
import PortalPopup from "../components/PortalPopup";
import SignoutConfirmationPopup from "../components/SignoutConfirmationPopup";
import { useNavigate } from "react-router-dom";
import styles from "./TempProfile.module.css";
import { BarChart } from '@mui/x-charts/BarChart';
import IconPopupForGuest from '../components/IconPopupForGuest';
import IconPopup from '../components/IconPopup';
import Footer from '../components/Footer';
import Avatar from '@mui/material/Avatar';


const TempProfile = () => {

  const isGuest = localStorage.getItem('GuestOrHost');
  const user_name = localStorage.getItem('name');

  const [popup, setPopup] = useState(false);
  const toggle = () => {
    setPopup(!popup);
  };
 
  const email = localStorage.getItem('email');

  const [userData, setUserData] = useState([]);
 

  useEffect(() => {
    fetch(`http://localhost:5001/temp-profile?email=${email}`)
      .then(response => response.json())
      .then(data => {
        
        console.log("data from js page");
        console.log("data: ",data);
          
        const formattedUserData = data.searchResults.map(result => ({
          

          userName :  `${result.First_name} ${result.Last_name}`, /**/
          joinDate: new Date(result.Joining_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            
            
          }),
          description : result.description,
          city : result.City,
          country : result.Country,
          livesIn: `${result.City}, ${result.Country}`,
          phone : result.Phone,
          pass : result.Password,
          pic: result.Profile_picture,
          
        }));
        
        setUserData(formattedUserData);

        
        const city=result.City;
        const country = result.Country;


        
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const userName = userData.length > 0 ? userData[0].userName : '';
  const joinDate = userData.length > 0 ? userData[0].joinDate : '';
  const livesIn = userData.length > 0 ? userData[0].livesIn : '';
  const description = userData.length > 0 ? userData[0].description : '';
  const phone = userData.length > 0 ? userData[0].phone : '';
  const city = userData.length > 0 ? userData[0].city : '';
  const country = userData.length > 0 ? userData[0].country : '';
  const pass = userData.length > 0 ? userData[0].pass : '';
  const picSrc = userData.length > 0 ? userData[0].pic : '';

  console.log(picSrc);

  localStorage.setItem('Description', description);
  localStorage.setItem('City', city);
  localStorage.setItem('Country', country); 
  localStorage.setItem('phone', phone); 
  localStorage.setItem('pass', pass);

  const [isProfileDetailsPopupOpen, setProfileDetailsPopupOpen] =
    useState(false);
  const [isSignoutConfirmationPopupOpen, setSignoutConfirmationPopupOpen] =
    useState(false);
  const navigate = useNavigate();

  const openProfileDetailsPopup = useCallback(() => {
    setProfileDetailsPopupOpen(true);
  }, []);

  const closeProfileDetailsPopup = useCallback(() => {
    setProfileDetailsPopupOpen(false);
  }, []);

  const onGroupContainer1Click = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onBecomeHostBtnClick = useCallback(() => {
    navigate("/hosting-intro");
  }, [navigate]);

  const openSignoutConfirmationPopup = useCallback(() => {
    setSignoutConfirmationPopupOpen(true);
  }, []);

  const closeSignoutConfirmationPopup = useCallback(() => {
    setSignoutConfirmationPopupOpen(false);
  }, []);

  const onItemLink5Click = useCallback(() => {
    navigate("/mylistings");
  }, [navigate]);

  const onItemLink6Click = useCallback(() => {
    navigate("/myreservations");
  }, [navigate]);

  const onItemLink7Click = useCallback(() => {
    navigate("/mypastreservations");
  }, [navigate]);

  const onItemLink9Click = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <>
      <div className={styles.tempProfile}>
       
       <Footer />
        
       
       
        <div className={styles.testimonialSection}>
          <div className={styles.h3}>Welcome to Your Profile, {userName}!</div>
        </div>

       

        
        <div className={styles.h31}>
          <p className={styles.thankYouForCreatingAnAcco}>
            <b>
              <span>{`About me `}</span>
            </b>
          </p>
          <p className={styles.blankLine}>
            <b>
              <span>&nbsp;</span>
            </b>
          </p>
          <p className={styles.weHaveSent}>
          <div className={styles.weHaveSent}>{description}</div>
          <p className={styles.emailSection}>
          <b>
            <span>Email: {email}</span>
          </b>
        </p>

        {/* New Phone Section */}
        <p className={styles.phoneSection}>
          <b>
            <span>Phone: {phone}</span>
          </b>
        </p>
          </p>
        </div>
        <div
          className={styles.setupprofilebtn}
          onClick={openProfileDetailsPopup}
        >
          <button className={styles.setUpA}>{`Set up a Profile `}</button>
        

        
        </div>
        <div className={styles.profileCardParent}>
         <div className={styles.profileCard}>


         <Avatar className={styles.usericon} alt="" src={picSrc} />





            <div className={styles.userName}>{userName}</div>
            <div className={styles.profileCardChild} />
            <div className={styles.userjoin}>
              <img
                className={styles.solarcalendarOutlineIcon}
                alt=""
                src="/solarcalendaroutline.svg"
              />
              <div className={styles.joinedOn18}>
              <div className={styles.joinedOn18}>Joined on {joinDate}</div>
              </div>
            </div>
           
            <div className={styles.userlocation}>
              <img
                className={styles.carbonlocationIcon}
                alt=""
                src="/carbonlocation.svg"
              />
              
              
              
            </div>
            
          </div>
          <div className={styles.verifiedemail}>
            <div className={styles.verifiedEmail}>Verified Email</div>
            <img className={styles.charmtickIcon} alt="" src="/charmtick.svg" />
          </div>
        </div>
        
        <div className={styles.stickyNavBar}>
          <div className={styles.whiterectangle} />
          <div
            className={styles.urbanstayParent}
            onClick={onGroupContainer1Click}
          >
            <div className={styles.urbanstay}>
              <span className={styles.urbanstayTxt}>
                <b>URBAN</b>
                <span className={styles.stay}>STAY</span>
              </span>
            </div>
            <img className={styles.image31} alt="" src="/image-3-11@2x.png" />
          </div>


          { isGuest === '1' ? (

          <IconPopupForGuest topMargin = {20} name = {user_name} />

          ) : isGuest === '0' ? (

          <IconPopup topMargin = {23} name = {user_name} />

          ) : null } 

          <div className={styles.itemLinkParent}>
            <div className={styles.itemLink5} onClick={onItemLink5Click}>
              <div className={styles.reservations}>listings</div>
            </div>
            <div className={styles.itemLink6} onClick={onItemLink6Click}>
              <div className={styles.reservations}>Reservations</div>
            </div>
            <div className={styles.itemLink7} onClick={onItemLink7Click}>
              <div className={styles.reservations}>Past reservations</div>
            </div>
            <div className={styles.itemLink8}>
              <b className={styles.profile}>Profile</b>
            </div>
            <div className={styles.itemLink9} onClick={onItemLink9Click}>
              <div className={styles.reservations}>HOME</div>
            </div>
          </div>
        </div>
      </div>
      {isProfileDetailsPopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeProfileDetailsPopup}
        >
          <ProfileDetailsPopup onClose={closeProfileDetailsPopup} />
        </PortalPopup>
      )}
      {isSignoutConfirmationPopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeSignoutConfirmationPopup}
        >
        <SignoutConfirmationPopup onClose={closeSignoutConfirmationPopup} />
        </PortalPopup>
      )}
    </>
  );
};

export default TempProfile;