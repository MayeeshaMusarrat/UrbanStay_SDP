import { useState, useCallback } from "react";
import SignoutConfirmationPopup from "../components/SignoutConfirmationPopup";
import PortalPopup from "../components/PortalPopup";
import { useNavigate } from "react-router-dom";
import styles from "./HostingIntro.module.css";
import IconPopup from "../components/IconPopup";

const HostingIntro = () => {
  const [isSignoutConfirmationPopupOpen, setSignoutConfirmationPopupOpen] =
    useState(false);
  const navigate = useNavigate();

  const onConfirmPaymentBtnContainerClick = useCallback(() => {
    navigate("/host-place");
  }, [navigate]);

  const onGroupContainerClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const openSignoutConfirmationPopup = useCallback(() => {
    setSignoutConfirmationPopupOpen(true);
  }, []);

  const closeSignoutConfirmationPopup = useCallback(() => {
    setSignoutConfirmationPopupOpen(false);
  }, []);

  return (
    <>
      <div className={styles.hostingIntro}>
        <div className={styles.divb9672i7}>
          <div className={styles.button}>
            <div className={styles.showAllReviews}>Show all reviews</div>
          </div>
        </div>
        <div className={styles.whiterectangle} />
        <div
          className={styles.confirmpaymentbtn}
          onClick={onConfirmPaymentBtnContainerClick}
        >
          <button className={styles.getStarted}>Get Started</button>
        </div>
        <b className={styles.itsEasyTo}>
          It’s easy to host your place in urbanStay
        </b>
        <img className={styles.search1Icon} alt="" src="/search-1@2x.png" />
        <img className={styles.prop1Icon} alt="" src="/prop-1@2x.png" />
        <img className={styles.confirm1Icon} alt="" src="/confirm-1@2x.png" />
        <b className={styles.tellUsAboutContainer}>
          <ul className={styles.tellUsAbout}>1. Tell us about your place</ul>
        </b>
        <div className={styles.shareSomeBasic}>
          Share some basic information, like where it is and how many guests can
          stay.
        </div>
        <div className={styles.add5Or}>
          Add 5 or more photos plus a title and description
        </div>
        <div className={styles.publishYourListing}>
          Publish your listing! We will notify you of interested renters.
        </div>
        <b className={styles.addNecessaryDescriptionsContainer}>
          <ul className={styles.tellUsAbout}>2. Add Necessary descriptions</ul>
        </b>
        <b className={styles.verifyAndPublishContainer}>
          <ul className={styles.tellUsAbout}>3. verify and publish</ul>
        </b>
        <div className={styles.stickyNavBar}>
          <div className={styles.whiterectangle1} />
          <div
            className={styles.urbanstayParent}
            onClick={onGroupContainerClick}
          >
            <div className={styles.urbanstay}>
              <span className={styles.urbanstayTxt}>
                <b>URBAN</b>
                <span className={styles.stay}>STAY</span>
              </span>
            </div>
            <img className={styles.image31} alt="" src="/image-3-11@2x.png" />
          </div>



      
         <IconPopup />
        

        </div>
      </div>
      {isSignoutConfirmationPopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeSignoutConfirmationPopup}
        >
          <SignoutConfirmationPopup onClose={closeSignoutConfirmationPopup} />
        </PortalPopup>
      )}
    </>
  );
};

export default HostingIntro;
