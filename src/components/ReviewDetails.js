import styles from "./ReviewDetails.module.css";

const ReviewDetails = ({ onClose }) => {
  return (
    <div className={styles.reviewdetails}>
      <img
        className={styles.reviewdetailsChild}
        alt=""
        src="/rectangle-108.svg"
      />
      <div className={styles.rectangleParent}>
        <div className={styles.groupChild} />
        <img
          className={styles.crossIcon}
          alt=""
          src="/cross.svg"
          onClick={onClose}
        />
        <div className={styles.groupItem} />
        <button className={styles.reviewDetails}>Review Details</button>
      </div>
      <div className={styles.barchart} id="pi" />
      <img className={styles.usericon} alt="" src="/usericon@2x.png" />
      <div className={styles.mayeeshaMusarrat23SeptemberContainer}>
        <span className={styles.mayeeshaMusarrat23SeptemberContainer1}>
          <p className={styles.mayeeshaMusarrat}>
            <span>
              <span className={styles.mayeeshaMusarrat1}>
                mayeesha Musarrat
              </span>
            </span>
          </p>
          <p className={styles.september2023}>23 September 2023</p>
        </span>
      </div>
      <div
        className={styles.asSoonAs}
      >{`As soon as we arrived we were greeted by the villa staff so beautifully, as they put some flowers on our necks and welcoming drinks. Our stay was amazing we felt at peace. Also Agus and his wife made us wonderful welcoming dinner every bite was delicious. Thank you for the wonderful stay. `}</div>
    </div>
  );
};

export default ReviewDetails;
