
import React from 'react';
import styles from './notifications.module.css';  

const PendingNotification = () => {
  return (
    <> 

    <div className={styles.pendingnotif}>
        <div className={styles.knockKnockYouContainer}>
          <span className={styles.urbanstayTxt}>
            <p className={styles.congratulationsYourPending}>
              Knock knock! You have pending reservation requests!
            </p>
            <p className={styles.yourReservationApplied}>
              Your property “Cozy Coop” hosted on 13 Oct, 2023 has 3 Pending
              approvals.
            </p>
          </span>
        </div>
        <img className={styles.vectorIcon2} alt="" src="/vector2.svg" />
    </div>
   
    </>
  );
};

export default PendingNotification;
