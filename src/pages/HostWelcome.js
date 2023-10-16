import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HostWelcome.module.css";

const HostWelcome = () => {
  const navigate = useNavigate();

  const onGroupContainerClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onFrameButtonClick = useCallback(() => {
    navigate("/host-signup-page");
  }, [navigate]);

  return (
    <div className={styles.hostWelcome}>
      <div className={styles.groupParent}>
        <div className={styles.urbanstayParent} onClick={onGroupContainerClick}>
          <b className={styles.urbanstay}>UrbanStay</b>
          <img className={styles.image31} alt="" src="/image-3-1@2x.png" />
        </div>
        <button
          className={styles.createAHostAccountWrapper}
          onClick={onFrameButtonClick}
        >
          <button className={styles.createAHost}>Create a Host Account</button>
        </button>
        <b className={styles.h3}>Great Choice to be a Host!</b>
        <div className={styles.toActAs}>
          To act as a host in UrbanStay, you will have to fill up some
          information necessary to authenticate your identity and you offered
          place. Kindly sign up for an account and we will guide you from there!
        </div>
        <img className={styles.hostpicIcon} alt="" src="/hostpic@2x.png" />
      </div>
    </div>
  );
};

export default HostWelcome;
