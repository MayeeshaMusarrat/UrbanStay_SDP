import { useState, useCallback } from "react";
import { TextField, Checkbox, FormControlLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./FilterPopup.module.css";

const FilterPopup = ({ onClose }) => {
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

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const onFrameButtonClick = useCallback(() => {
    // Save min and max prices to local storage
    localStorage.setItem("minprice", minPrice);
    localStorage.setItem("maxprice", maxPrice);

    // Navigate to "/browse"
    navigate("/browse");
  }, [minPrice, maxPrice, navigate]);


  return (
    <div className={styles.filterPopup}>
      <div className={styles.filterPopupContent}>
        <div className={styles.filterPopupChild} />
        <div className={styles.priceRange}>Price Range</div>
        <div className={styles.filterAccordingTo}>
          Filter according to your preferred nightly prices.
        </div>
        <div className={styles.propertyType}>Property Type</div>
        {/* Removed "Amenities" section */}
        <div className={styles.filterPopupItem} />
        <div className={styles.filterPopupInner} />
        <div className={styles.lineDiv} />
        <TextField
          className={styles.minprice}
          color="info"
          rows={1}
          maxRows={1}
          label="Minimum"
          fullWidth={true}
          sx={{ width: 301 }}
          variant="outlined"
          onChange={handleMinPriceChange}
          value={minPrice}
        />
        <TextField
          className={styles.minprice1}
          color="info"
          rows={1}
          maxRows={1}
          label="Maximum"
          fullWidth={true}
          sx={{ width: 301 }}
          variant="outlined"
          onChange={handleMaxPriceChange}
          value={maxPrice}
        />
        <div className={styles.filterPopupChild1} />
        <div className={styles.propertyType1}>
          <div className={styles.textIcon}>
            <button
              className={styles.propertyTypeIcon}
              onClick={handleButtonClick1}
              style={{ background: isPressedHouse ? 'white' : 'lightgray' }}
            >
              <img alt="" src="/property-type1.svg" />
              <div className={styles.house}>House</div>
            </button>
          </div>
        </div>
        <div className={styles.propertyTypeParent}>
          <div className={styles.propertyType2}>
            <div className={styles.textIcon}>
              <button
                className={styles.propertyTypeIcon}
                onClick={handleButtonClick2}
                style={{ background: isPressedAp ? 'white' : 'lightgray' }}
              >
                <img alt="" src="/property-type2.svg" />
                <div className={styles.house}>Apartment</div>
              </button>
            </div>
          </div>
        </div>
        <div className={styles.propertyTypeGroup}>
          <div className={styles.propertyType2}>
            <div className={styles.textIcon}>
              <button
                className={styles.propertyTypeIcon}
                onClick={handleButtonClick3}
                style={{ background: isPressedGuest ? 'white' : 'lightgray' }}
              >
                <img alt="" src="/property-type2.svg" />
                <div className={styles.house}>Guesthouse</div>
              </button>
            </div>
          </div>
          <img
            className={styles.propertyTypeIcon4}
            alt=""
            src="/property-type4.svg"
          />
        </div>
        <div className={styles.groupParent}>
          <div className={styles.propertyTypeWrapper}>
            <div className={styles.propertyType4}>
              <div className={styles.textIcon}>
                <button
                  className={styles.propertyTypeIcon}
                  onClick={handleButtonClick4}
                  style={{ background: isPressedHotel ? 'white' : 'lightgray' }}
                >
                  <img alt="" src="/property-type2.svg" />
                  <div className={styles.house}>Hotel</div>
                </button>
              </div>
            </div>
          </div>
          <img
            className={styles.propertyTypeIcon6}
            alt=""
            src="/property-type5.svg"
          />
        </div>
        {/* ... other checkboxes and labels ... */}
      </div>
      <div className={styles.rectangleParent}>
        <div className={styles.groupChild} />
        <div className={styles.filterPlacesWrapper} onClick={onFrameButtonClick}>
          <button className={styles.filterPlaces}>Filter Places</button>
        </div>
        
        <div className={styles.groupItem} />
      </div>
      <div className={styles.rectangleGroup}>
        <div className={styles.groupInner} />
        <img className={styles.crossIcon} alt="" src="/cross1.svg" />
        <div className={styles.groupChild1} />
        <button className={styles.filters}>Filters</button>
      </div>
    </div>
  );
};
  

export default FilterPopup;
