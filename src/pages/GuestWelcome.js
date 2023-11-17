import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./GuestWelcome.module.css";

const GuestWelcome = () => {
  const navigate = useNavigate();

  const onFrameButtonClick = useCallback(() => {
    navigate("/guest-signup-page");
  }, [navigate]);

  const onGroupContainerClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className={styles.guestWelcome}>
      <div className={styles.frameParent}>
        <button
          className={styles.createAGuestAccountWrapper}
          onClick={onFrameButtonClick}
        >
          <button className={styles.createAGuest}>
            Create a Guest Account
          </button>
        </button>
        <img className={styles.renterpicIcon} alt="" src="/renterpic@2x.png" />
        <div
          className={styles.toRentOut}
        >{`to rent out a place, you will have to fill up some important information required to authenticate your presence. You can create a detailed profile later anytime if you want to host your place later on! `}</div>
        <b className={styles.h3}>
          Searching for Homes? You’re at the Right Place!
        </b>
        <div className={styles.urbanstayParent} onClick={onGroupContainerClick}>
          <b className={styles.urbanstay}>UrbanStay</b>
          <img className={styles.image31} alt="" src="/image-3-1@2x.png" />
        </div>
      </div>
    </div>
  );
};

export default GuestWelcome;
