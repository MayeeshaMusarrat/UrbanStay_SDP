import { useCallback } from "react";
import styles from "./Notifications.module.css";
import IconPopup from "../components/IconPopup";
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

  return (
    <div className={styles.notifications}>

      <Footer />
      <IconPopup />

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


    <RejectionNotification />
    <SuccessNotification />






     
    </div>
  );
};

export default Notifications;
