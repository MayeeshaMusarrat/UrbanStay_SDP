
import React from 'react';
import styles from './notifications.module.css';  

const SuccessNotification = ({ Heading, comment }) => {

  console.log("info", Heading);
  return (
    <> 

<div className={styles.successnotif}>
        <div className={styles.confirmationnotif}>
          <img
            className={styles.confirmationnotifChild}
            alt=""
            src="/group-2013.svg"
          />
          <div className={styles.congratulationsYourPendingContainer}>
            <span className={styles.urbanstayTxt}>
              <p className={styles.congratulationsYourPending}>
                {Heading}
              </p>
              <p className={styles.yourReservationApplied}>
                {comment}
              </p>
            </span>
          </div>
          <img className={styles.vectorIcon} alt="" src="/tick.svg" />
        </div>
      </div>


   
    </>
  );
};

export default SuccessNotification;
