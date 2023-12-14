import { useState, useCallback } from "react";
import SignoutConfirmationPopup from "../components/SignoutConfirmationPopup";
import PortalPopup from "../components/PortalPopup";
import { useNavigate } from "react-router-dom";
import styles from "./ConfirmReservation.module.css";
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import IconPopup from "../components/IconPopup";

const ConfirmReservation = () => {

  const { param } = useParams();
  const decodedPropValueString = decodeURIComponent(param);
  const propValue = JSON.parse(decodedPropValueString);

  const datesCalendar = JSON.parse(localStorage.getItem('rangeValues'));
  const dates = {
    startDate: datesCalendar.from,
    endDate: datesCalendar.to,
  
  };
  const checkIn = new Date(dates.startDate);
  const checkOut = new Date(dates.endDate);
 
  const timeDiff = checkOut - checkIn;
  const daysDiff = (Math.floor(timeDiff / (24*60*60*1000))) + 1;
  const user_price_per_night = parseInt(propValue.price,10)*parseInt(daysDiff,10);

  const user_name = localStorage.getItem('name');

 console.log(propValue);

  
  const [popup, setPopup] = useState(false);

  const toggle = () => {
    setPopup(!popup);
  };

  const [isSignoutConfirmationPopupOpen, setSignoutConfirmationPopupOpen] =
    useState(false);
  const navigate = useNavigate();

  const onConfirmPaymentBtnContainerClick = useCallback(() => {
    
  }, [navigate]);

  const onGroupContainer5Click = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onBecomeHostBtnClick = useCallback(() => {
    navigate("/hosting-intro");
  }, [navigate]);

  const openSignoutConfirmationPopup = useCallback(() => {
    setSignoutConfirmationPopupOpen(true);
  }, []);

  const closeSignoutConfirmationPopup = useCallback(() => {
    setSignoutConfirmationPopupOpen(false);
  }, []);

  
  const serviceFee = localStorage.getItem('serviceFee');
  const total = parseInt(serviceFee,10) + user_price_per_night;

  const rooms = localStorage.getItem('Rooms');
  const guests = localStorage.getItem('Guests');

  const handleSubmit = (e) => {
    e.preventDefault();
    const em = localStorage.getItem('email');
   

    const reserveProperty = {
      em: em,
      PID: propValue.PID,
      check_in: checkIn,
      check_out: checkOut ,
      price: total,
      rooms: rooms, 
      guests: guests
    };
  
    fetch(`http://localhost:5001/pending-reservation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reserveProperty),
    })
      .then((response) => {
        if (response.status === 200) {
          navigate("/myReservations");
          return response.json();
        } 
      })
      .catch((error) => {
        console.log("Error occurred:", error);
      });
  };
  



  return (
    <>
    <form> 
      <div className={styles.confirmReservation}>
       
       <Footer />
        <b className={styles.h3}>Confirm and Pay</b>
        <div className={styles.h31}>Your Trip</div>
        <div className={styles.h32}>Pay with</div>
        <div className={styles.h3Parent}>
          <div className={styles.h33}>Dates</div>
          <div className={styles.h34}>Oct 16-20 </div>
        </div>
        <div className={styles.h3Group}>
          <div className={styles.h35}>Rooms</div>
          <div className={styles.h36}>{rooms + ' Rooms'}</div>
        </div>
        <div className={styles.h3Container}>
          <div className={styles.h37}>Guests</div>
          <div className={styles.h38}>{guests + ' Guests'}</div>
        </div>
        <div className={styles.confirmReservationChild} />
        <div className={styles.confirmReservationItem} />
        <img className={styles.image4Icon} alt="" src="/image-4@2x.png" />
        <img className={styles.image5Icon} alt="" src="/image-5@2x.png" />
        <div
          className={styles.confirmpaymentbtn}
           onClick= {onConfirmPaymentBtnContainerClick }
        >
          <button className={styles.confirmAndPay} type = "submit" onClick = {handleSubmit} >Confirm and Pay </button>
        </div>
        <div className={styles.card}>
          <div className={styles.rectangleParent}>
            <div className={styles.groupChild} />
            <div className={styles.line28Parent}>
              <div className={styles.line28}>{"BDT "+propValue.price + " x " + daysDiff + " nights"}</div>
              <div className={styles.line33}>Total (BDT)</div>
              <div className={styles.line34}>{'BDT '+total}</div>
              <div className={styles.groupItem} />
              <div className={styles.line30}>Service fee</div>
             
              <div className={styles.line24}>{user_price_per_night + ' BDT'}</div>
              <div className={styles.line26}>{serviceFee + ' BDT'}</div>
             
              <div className={styles.line23}>Price details</div>
            </div>
            <div className={styles.groupInner} />
            <div className={styles.priceWrapper}>
              <div className={styles.price}>
                <div className={styles.starPrice}>
                  <img
                    className={styles.starPriceChild}
                    alt=""
                    src="/star-1.svg"
                  />
                  <div className={styles.div}>{propValue.rating}</div>
                </div>
                <div className={styles.reviews}>{'('+propValue.rating_num+' reviews)'}</div>
              </div>
            </div>
            <div className={styles.line21}>
              {propValue.property_title}
            </div>
        
            <img
              className={styles.rectangleIcon}
              alt=""
              src={propValue.imageUrl}
            />
          </div>
        </div>
        <div className={styles.stickyNavBar}>
          <div className={styles.whiterectangle} />
          <div
            className={styles.urbanstayParent}
            onClick={onGroupContainer5Click}
          >
            <div className={styles.urbanstay}>
              <span className={styles.urbanstayTxt}>
                <b>URBAN</b>
                <span className={styles.stay}>STAY</span>
              </span>
            </div>
            <img className={styles.image31} alt="" src="/image-3-11@2x.png" />
          </div>
       
       
        <IconPopup topMargin = {23} name = {user_name} />




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
    </form>
    </>
  );
};

export default ConfirmReservation;
