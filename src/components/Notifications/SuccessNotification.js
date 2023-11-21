
import React from 'react';
import styles from './notifications.module.css';  

const SuccessNotification = () => {
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
                Congratulations! Your pending reservation has been approved.
              </p>
              <p className={styles.yourReservationApplied}>
                Your Reservation applied in 6 Oct, 2023 has been approved by the
                host. The property titled “Cozy Coop” located in Dhaka,
                Bangladesh has been reserved for 10 oct, 2023 - 15 oct, 2023.
                Enjoy!
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
