import { useCallback } from "react";
import styles from "./PropertyDetailsForReservation.module.css";

const PropertyDetailsForReservation = ({ onClose }) => {
  const onForMoreInformationClick = useCallback(() => {
    // Please sync "View_details" to the project
  }, []);

  return (
    <div className={styles.propertydetailsforreservationp}>
      <img
        className={styles.propertydetailsforreservationpChild}
        alt=""
        src="/rectangle-108.svg"
      />
      <img className={styles.imageIcon} alt="" src="/image@2x.png" />
      <div className={styles.propertydetailsforreservationpItem} />
      <img
        className={styles.crossIcon}
        alt=""
        src="/cross.svg"
        onClick={onClose}
      />
      <div className={styles.propertydetailsforreservationpInner} />
      <button className={styles.propertyDetails}>Property Details</button>
      <div className={styles.reserved31Oct}>
        Reserved: 31 Oct, 2023 - 7 Nov, 2023
      </div>
      <div className={styles.bedrooms}>2 Bedrooms</div>
      <div className={styles.bathrooms}>2 Bathrooms</div>
      <div className={styles.sqFeet}>1200 sq. Feet</div>
      <div className={styles.guests}>3 guests</div>
      <div className={styles.rooms}>4 Rooms</div>
      <div className={styles.bdt4005night}>
        <span className={styles.bdt4005nightTxtContainer}>
          <span>BDT</span>
          <span className={styles.span}> 4005</span>
          <span>/night</span>
        </span>
      </div>
      <div className={styles.beds}>2 Beds</div>
      <div className={styles.neelOboniBaf}>
        1102 Neel Oboni, BAF Officers’ Quarter, Shahinbagh, Dhaka
      </div>
      <div className={styles.amenitiesProvidedFirstContainer}>
        <span className={styles.bdt4005nightTxtContainer}>
          <span className={styles.span}>Amenities Provided:</span>
          <span>{` First Aid kit, Air Conditioner, Heater, keelkelrkelrelrlerlerlerlerlelrkelrkrkelkrklerlekrle orerke eorerkeor okrekrekre rekekrperpe jroerkerkeor oekroekrrek krekroeroekr oekrroekreokr okreroek rkoekreokr `}</span>
        </span>
      </div>
      <div className={styles.lineDiv} />
      <div className={styles.propertydetailsforreservationpChild1} />
      <div className={styles.propertydetailsforreservationpChild2} />
      <div className={styles.propertydetailsforreservationpChild3} />
      <img className={styles.locationicon} alt="" src="/locationicon.svg" />
      <div className={styles.neelOboniBaf}>
        1102 Neel Oboni, BAF Officers’ Quarter, Shahinbagh, Dhaka
      </div>
      <div
        className={styles.forMoreInformationContainer}
        onClick={onForMoreInformationClick}
      >
        <span>{`For more information, `}</span>
        <span className={styles.visitThisPage}>visit this page.</span>
      </div>
      <div className={styles.info}>
        <div className={styles.neelOboni5th}>Neel Oboni 5th Floor</div>
        <div className={styles.propertyrating} />
      </div>
    </div>
  );
};

export default PropertyDetailsForReservation;
