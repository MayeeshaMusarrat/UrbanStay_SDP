
import React from 'react';
import styles from './notifications.module.css';  

const RejectionNotification = () => {
  return (
    <> 

        
      <div className={styles.rejectionnotif}>
        <div className={styles.apologiesYourPendingContainer}>
          <span className={styles.urbanstayTxt}>
            <p className={styles.congratulationsYourPending}>
              Apologies! Your pending reservation has been Rejected.
            </p>
            <p className={styles.yourReservationApplied}>
              Your Reservation Applied in 6 Oct, 2023 has been Rejected by the
              host.
            </p>
          </span>
        </div>
        <img className={styles.vectorIcon1} alt="" src="/vector1.svg" />
      </div>

   
    </>
  );
};

export default RejectionNotification;
