import styles from "./UserInfoPopup.module.css";

const UserInfoPopup = ({ onClose }) => {
  return (
    <div className={styles.userinfopopup}>
      <img
        className={styles.userinfopopupChild}
        alt=""
        src="/rectangle-1081.svg"
      />
      <button className={styles.guestDetails}>Guest Details</button>
      <div className={styles.livesInDhaka}>Lives in Dhaka, Bangladesh</div>
      <div className={styles.contactNumber01711897088Container}>
        <span className={styles.emailMusarratgmailcomTxtContainer}>
          <span className={styles.contactNumber}>{`Contact Number: `}</span>
          <span>01711897088</span>
        </span>
      </div>
      <div className={styles.emailMusarratgmailcom}>
        <span className={styles.emailMusarratgmailcomTxtContainer}>
          <span className={styles.contactNumber}>Email:</span>
          <span> musarrat@gmail.com</span>
        </span>
      </div>
      <div className={styles.joinedOn31}>Joined on 31 Oct, 2023</div>
      <img className={styles.pic21Icon} alt="" src="/pic2-1@2x.png" />
      <div className={styles.mayeeshaMusarrat}>Mayeesha Musarrat</div>
      <div className={styles.userinfopopupItem} />
      <div className={styles.userinfopopupInner} />
      <div className={styles.lineDiv} />
      <div className={styles.aboutMayeesha}>About Mayeesha</div>
      <div
        className={styles.ourBeautifullyDesigned}
      >{`Our beautifully designed, brand new villa, offering a large space with fantastic amenities to ensure a comfortable and enjoyable stay. Our villa features a spacious working space area/conference room and a rooftop with a full mountain view, perfect for catching up on work or relaxing with friends and family. Our property is maintained and `}</div>
      <div className={styles.guestrating} />
      <div className={styles.rectangleDiv} />
      <img className={styles.frameIcon} alt="" src="/frame.svg" />
      <img className={styles.groupIcon} alt="" src="/group.svg" />
    </div>
  );
};

export default UserInfoPopup;
