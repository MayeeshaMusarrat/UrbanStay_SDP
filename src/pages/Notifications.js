import { useCallback, useEffect } from "react";
import styles from "./Notifications.module.css";
import IconPopup from "../components/IconPopup";
import IconPopupForGuest from "../components/IconPopupForGuest";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import SuccessNotification from "../components/Notifications/SuccessNotification";
import RejectionNotification from "../components/Notifications/RejectionNotification";
import PendingNotification from "../components/Notifications/PendingNotification";

const Notifications = () => {
  const navigate = useNavigate();
  const onGroupContainerClick = useCallback(() => {
    navigate("/");
  }, []);

  const storedNotifications = localStorage.getItem('notifications');
  const notificationsArray = JSON.parse(storedNotifications) || [];
  const isGuest = localStorage.getItem('GuestOrHost');

  const storedValue = localStorage.getItem('email');
  const user_name = localStorage.getItem('name');
  
  useEffect(() => {
    fetch(`http://localhost:5001/notifSeen?email=${storedValue}`)
      .then(response => response.json())
      .then(data => {
        console.log("data: ", data);
        
      
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  return (
    <div className={styles.notifications}>
      <Footer />
      <b className={styles.h3}>Notifications</b>

      <div className={styles.stickyNavBar}>
        <div className={styles.whiterectangle} />
        <div className={styles.urbanstayParent} onClick={onGroupContainerClick}>
          <div className={styles.urbanstay}>
            <span className={styles.urbanstayTxt}>
              <b>URBAN</b>
              <span className={styles.stay}>STAY</span>
            </span>
          </div>
          <img className={styles.image31} alt="" src="/image-3-1@2x.png" />
        </div>
      </div>


      { isGuest ==='1' ? (

      <IconPopupForGuest topMargin = {6} name = {user_name} />

      ) : isGuest==='0'? (

      <IconPopup topMargin = {6} name = {user_name} />

      ) : null }


      {notificationsArray && notificationsArray.length > 0 &&
        notificationsArray.map((notification, index) => {
         
          switch (notification.type) {
            case 'success':
              return <SuccessNotification key={index} Heading={notification.Heading} comment={notification.comment} />;
            case 'error':
              return <RejectionNotification key={index} Heading={notification.Heading} comment={notification.comment} />;
            case 'info':
              return <PendingNotification key={index} Heading={notification.Heading} comment={notification.comment} />;
            default:
              return null;
          }
        })}
    </div>
  );
};

export default Notifications;
