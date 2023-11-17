import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignoutConfirmationPopup.module.css";

const SignoutConfirmationPopup = ({ onClose }) => {
  const navigate = useNavigate();

  const onSignOutBtnClick = useCallback(() => {
    localStorage.clear();
    onclose
    navigate("/");
  }, [navigate]);

  
  return (
    <div className={styles.signoutConfirmationPopup}>
      <div className={styles.loginPopupWithoutLogoutGrp}>
        <div className={styles.loginPopupWithoutLogoutGrpChild} />
        <div className={styles.loginPopupWithoutLogoutGrpChild} />
        <div className={styles.loginPopupWithoutLogoutGrpChild} />

        <button className={styles.cancelbtn} 
        id="cancel"
        onClick={onClose} >
          <button className={styles.cancel} >
            
          Cancel
          
        </button>
        </button>


        <div className={styles.signoutbtnParent}
       
        >
          <button
            className={styles.signoutbtn}
            id="signOut"
            onClick={onSignOutBtnClick}
          >
            <button className={styles.cancel}>Sign out</button>
          </button>
          <div className={styles.groupChild} />
          <div className={styles.areYouSure}>
            Are you sure you want to sign out?
          </div>
          <div className={styles.separator} />
        </div>
      </div>
    </div>
  );
};

export default SignoutConfirmationPopup;
