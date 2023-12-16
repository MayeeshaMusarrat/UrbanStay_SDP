import styles from "./FilterPopup.module.css";
import PriceSlider from './PriceSlider';
import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";

const FilterPopup = ({onClose}) => {

  const navigate = useNavigate();

  const [propType, setPropType] = useState("");

  localStorage.setItem("proptype", propType);

  const [isPressedHouse, setIsPressedHouse] = useState(true);
  const [isPressedAp, setIsPressedAp] = useState(true);
  const [isPressedGuest, setIsPressedGuest] = useState(true);
  const [isPressedHotel, setIsPressedHotel] = useState(true);


  const handleButtonClick1 = () => {
    setIsPressedHouse(!isPressedHouse);
    if (isPressedHouse) setPropType("House");
    console.log("house is pressed");
    localStorage.setItem("proptype", propType);
  };

  const handleButtonClick2 = () => {
    setIsPressedAp(!isPressedAp);
    if (isPressedAp) setPropType("Apartment");
        localStorage.setItem("proptype", propType);
  };

  const handleButtonClick3 = () => {
    setIsPressedGuest(!isPressedGuest);
    if (isPressedGuest) setPropType("Guesthouse");
    localStorage.setItem("proptype", propType);
  };

  const handleButtonClick4 = () => {
    setIsPressedHotel(!isPressedHotel);
    if (isPressedHotel) setPropType("Hotel");
    localStorage.setItem("proptype", propType);
  };


  const close = () => {
    onClose();
    navigate("/browse");
  }

  return (
    <div className={styles.filterPopup}>
      <div className={styles.filterinner}>
        <div className={styles.priceRange}>Price Range</div>
        <div className={styles.filterAccordingTo}>
          Filter according to your preferred nightly prices.
        </div>
        <div className={styles.propertyType}>Property Type</div>
        <div className={styles.filterinnerChild} />
        <div className={styles.filterinnerChild2} />
        <div className={styles.filterinnerChild3} />
        <div className={styles.apartmentprop}>
          <div className={styles.propertyType1}
          onClick={handleButtonClick2}
          style={{ background: isPressedAp ? 'white' : 'lightgray' }}
          >
            <div className={styles.textIcon}>
              <img
                className={styles.propertyTypeIcon}
                alt=""
                src="/property-type1.svg"
              />
              <div className={styles.house}>Apartment</div>
            </div>
          </div>
        
        </div>
        <button className={styles.houseprop}
       
        >
          <div className={styles.propertyType1}
           onClick={handleButtonClick1}
           style={{ background: isPressedHouse ? 'white' : 'lightgray' }}
           >
            <div className={styles.textIcon}>
              <img
                
                alt=""
                src="/property-type.svg"
              />
              <div className={styles.house1}>House</div>
            </div>
          </div>
         
        </button>
        <div className={styles.guesthouseprop}>
          <div className={styles.propertyType1}
          onClick={handleButtonClick3}
          style={{ background: isPressedGuest ? 'white' : 'lightgray' }}
          >
            <div className={styles.textIcon}>
              <img
                className={styles.propertyTypeIcon}
                alt=""
                src="/property-type2.svg"
              />
              <div className={styles.house}>Guesthouse</div>
            </div>
          </div>
         
        </div>
        <div className={styles.hotelprop}>
          <div className={styles.propertyTypeWrapper}>
            <div className={styles.propertyType4}
            onClick={handleButtonClick4}
            style={{ background: isPressedHotel ? 'white' : 'lightgray' }}
            >
              <div className={styles.textIcon}>
                <img
                  className={styles.propertyTypeIcon}
                  alt=""
                  src="/property-type3.svg"
                />
                <div className={styles.house}>Hotel</div>
              </div>
            </div>
          </div>
        
        </div>
        <div className={styles.priceslider} >

          <PriceSlider />

        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.footerChild} />
        <button className={styles.filterPlacesWrapper}>
          <button className={styles.filterPlaces} onClick={close}>Filter Places</button>
        </button>
        <div className={styles.clearSelection}>Clear selection</div>
        <div className={styles.footerItem} />
      </div>
      <div className={styles.header}>
        <div className={styles.heading} />
        <img className={styles.crossIcon} alt="" src="/cross.svg" />
        <div className={styles.headerChild} />
        <button className={styles.filters}>Filters</button>
      </div>
    </div>
  );
};

export default FilterPopup;
