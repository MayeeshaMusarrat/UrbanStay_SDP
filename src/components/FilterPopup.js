import { useCallback } from "react";
import { TextField, Checkbox, FormControlLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./FilterPopup.module.css";

const FilterPopup = ({ onClose }) => {
  const navigate = useNavigate();

  const onFrameButtonClick = useCallback(() => {
    navigate("/browse");
  }, [navigate]);

  return (
    <div className={styles.filterPopup}>

<div className={styles.filterPopupContent}>

      <div className={styles.filterPopupChild} />
      <div className={styles.priceRange}>Price Range</div>
      <div className={styles.filterAccordingTo}>
        Filter according to your preferred nightly prices.
      </div>
      <div className={styles.propertyType}>Property Type</div>
      <div className={styles.amenities}>Amenities</div>
      <div className={styles.filterPopupItem} />
      <div className={styles.filterPopupInner} />
      <div className={styles.lineDiv} />
      <TextField
        className={styles.minprice}
        color="info"
        rows={1}
        maxRows={1}
        label="Minimum"
        placeholder="BDT 5000"
        fullWidth={true}
        sx={{ width: 301 }}
        variant="outlined"
        multiline
      />
      <TextField
        className={styles.minprice1}
        color="info"
        rows={1}
        maxRows={1}
        label="Maximum"
        placeholder="BDT 2500"
        fullWidth={true}
        sx={{ width: 301 }}
        variant="outlined"
        multiline
      />

      <div className={styles.filterPopupChild1} />
      <div className={styles.propertyType1}>
        <div className={styles.textIcon}>
          <img
            className={styles.propertyTypeIcon}
            alt=""
            src="/property-type1.svg"
          />
          <div className={styles.house}>House</div>
        </div>
      </div>


      <div className={styles.propertyTypeParent}>
        <div className={styles.propertyType2}>
          <div className={styles.textIcon}>
            <img
              className={styles.propertyTypeIcon}
              alt=""
              src="/property-type2.svg"
            />
            <div className={styles.house}>Apartment</div>
          </div>
        </div>
       
      </div>
      <div className={styles.propertyTypeGroup}>
        <div className={styles.propertyType2}>
          <div className={styles.textIcon}>
            <img
              className={styles.propertyTypeIcon}
              alt=""
              src="/property-type2.svg"
            />
            <div className={styles.house}>Guesthouse</div>
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
              <img
                className={styles.propertyTypeIcon}
                alt=""
                src="/property-type2.svg"
              />
              <div className={styles.house}>Hotel</div>
            </div>
          </div>
        </div>
        <img
          className={styles.propertyTypeIcon6}
          alt=""
          src="/property-type5.svg"
        />
      </div>
      <FormControlLabel
        className={styles.groupFormcontrollabel}
        label="Wi-fi"
        control={<Checkbox color="info" />}
      />
      <FormControlLabel
        className={styles.filterPopupChild2}
        label="Parking spot"
        control={<Checkbox color="info" />}
      />
      <FormControlLabel
        className={styles.filterPopupChild3}
        label="Kitchen"
        control={<Checkbox color="info" />}
      />
      <FormControlLabel
        className={styles.filterPopupChild4}
        label="Gym"
        control={<Checkbox color="info" />}
      />
      <FormControlLabel
        className={styles.filterPopupChild5}
        label="Patio"
        control={<Checkbox color="info" />}
      />
      <FormControlLabel
        className={styles.filterPopupChild6}
        label="Washing machine"
        control={<Checkbox color="info" />}
      />
      <FormControlLabel
        className={styles.filterPopupChild7}
        label="Hot tub"
        control={<Checkbox color="info" />}
      />
      <FormControlLabel
        className={styles.filterPopupChild8}
        label="TV"
        control={<Checkbox color="info" />}
      />
      <FormControlLabel
        className={styles.filterPopupChild9}
        label="Workspace"
        control={<Checkbox color="info" />}
      />
      <FormControlLabel
        className={styles.filterPopupChild10}
        label="Air conditioning"
        control={<Checkbox color="info" />}
      />
      <div className={styles.safetyItems}>Safety Items</div>
      <FormControlLabel
        className={styles.filterPopupChild11}
        label="Smoke alarm"
        control={<Checkbox color="info" />}
      />
      <FormControlLabel
        className={styles.filterPopupChild12}
        label="CCTV Surveillance"
        control={<Checkbox color="info" />}
      />
      <FormControlLabel
        className={styles.filterPopupChild13}
        label="Emergency radio"
        control={<Checkbox color="info" />}
      />
      <FormControlLabel
        className={styles.filterPopupChild14}
        label="Carbon monoxide alarm"
        control={<Checkbox color="info" />}
      />
      <FormControlLabel
        className={styles.filterPopupChild15}
        label="First aid kit"
        control={<Checkbox color="info" />}
      />
      <FormControlLabel
        className={styles.filterPopupChild16}
        label="Fire extinguisher"
        control={<Checkbox color="info" />}
      />

      </div>

 
      <div className={styles.rectangleParent}>
        <div className={styles.groupChild} />
        <div className={styles.filterPlacesWrapper} onClick={onFrameButtonClick}>
          <button className={styles.filterPlaces}>Filter Places</button>
        </div>
        <div className={styles.clearSelection}>Clear selection</div>
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