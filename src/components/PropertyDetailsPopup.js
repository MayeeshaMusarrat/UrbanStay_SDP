import styles from "./PropertyDetailsPopup.module.css";

const PropertyDetailsPopup = ({ onClose }) => {
  return (
    <div className={styles.propertydetailspopup}>
      <img
        className={styles.propertydetailspopupChild}
        alt=""
        src="/rectangle-1082.svg"
      />
      <img className={styles.imageIcon} alt="" src="/image@2x.png" />
      <div className={styles.propertydetailspopupItem} />
      <img
        className={styles.crossIcon}
        alt=""
        src="/cross.svg"
        onClick={onClose}
      />
      <div className={styles.propertydetailspopupInner} />
      <button className={styles.propertyDetails}>Property Details</button>
      <div className={styles.info}>
        <div className={styles.neelOboni5th}>Neel Oboni 5th Floor</div>
        <div className={styles.open31Oct}>Open: 31 Oct, 2023 - 7 Nov, 2023</div>
        <div className={styles.createdOn31}>created on 31 Oct, 2023</div>
      </div>
      <div className={styles.propertyDescription}>Property Description</div>
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
      <div className={styles.propertydetailspopupChild1} />
      <div className={styles.propertydetailspopupChild2} />
      <div className={styles.propertydetailspopupChild3} />
      <div className={styles.ourBeautifullyDesigned}>
        Our beautifully designed, brand new villa, offering a large space with
        fantastic amenities to ensure a comfortable and enjoyable stay. Our
        villa features a spacious working space area/conference room and a
        rooftop with a full mountain view, perfect for catching up on work or
        relaxing with friends and family. Our property is maintained and cleaned
        by professionals, ensuring a pristine and hygienic environment
        throughout your stay. Our large kitchen and dining areas on all floors
        are fully equipped to cater to your meal preparation needs, while our
        modern lighted pool provides a perfect setting to cool off and unwind.
        Our villa's prime location grants easy access to a variety of high-end
        restaurants and cafes, all located less than a mile away, making it a
        perfect base for your next getaway.
      </div>
      <img className={styles.locationicon} alt="" src="/locationicon.svg" />
      <div className={styles.neelOboniBaf}>
        1102 Neel Oboni, BAF Officers’ Quarter, Shahinbagh, Dhaka
      </div>
    </div>
  );
};

export default PropertyDetailsPopup;
