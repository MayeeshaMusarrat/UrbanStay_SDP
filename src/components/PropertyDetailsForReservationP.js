import { useCallback, useEffect, useState } from "react";
import styles from "./PropertyDetailsForReservationP.module.css";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import axios from 'axios';


const PropertyDetailsForReservationP = ({ rowData, onClose }) => {
  const onForMoreInformationClick = useCallback(() => {
    // Please sync "View_details" to the project
  }, []);


  console.log("rowData: ", rowData);

  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/getAmenities/${rowData.pid}`);
        setAmenities(response.data.searchResults);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching amenities:', error);
      }
    };

    fetchAmenities();
  }, [rowData.pid]);

  const amenityNames = amenities.map((amenity) => amenity.Name).join(', ');




  return (
    <div className={styles.propertydetailsforreservationp}>
      <div className={styles.overall}>
        <div className={styles.overallChild} />
        <img className={styles.imageIcon} alt="" src={rowData.pics} />
        <div className={styles.overallItem} />
        <img
          className={styles.crossIcon}
          alt=""
          src="/cross.svg"
          onClick={onClose}
        />
        <div className={styles.overallInner} />
        <button className={styles.propertyDetails}>Property Details</button>
        <div className={styles.bedrooms}>{rowData.bedrooms+ " Bedrooms"}</div>
        <div className={styles.bathrooms}>{rowData.baths+ " Bathrooms"}</div>
        <div className={styles.sqFeet}>{rowData.area+ " sq. feet"}</div>
        <div className={styles.guests}>{rowData.guests + " guests"}</div>
        <div className={styles.rooms}>{rowData.rooms + " rooms"}</div>
        <div className={styles.bdt4005night}>
          <span className={styles.bdt4005nightTxtContainer}>
            <span>BDT</span>
            <span className={styles.span}> {rowData.price_night}</span>
            <span>/night</span>
          </span>
        </div>
        <div className={styles.beds}>{rowData.beds+ " beds"}</div>
       
        <div className={styles.amenitiesProvidedFirstContainer}>
          <span className={styles.bdt4005nightTxtContainer}>
            <span className={styles.span}>Amenities Provided: </span>
            <span>{amenityNames}</span>
          </span>
        </div>
        <div className={styles.lineDiv} />
        <div className={styles.overallChild1} />
        <div className={styles.overallChild2} />
        <div className={styles.overallChild3} />
        <img className={styles.locationicon} alt="" src="/locationicon.svg" />
        <div className={styles.neelOboniBaf}>
         {rowData.address_line}
        </div>
        <div
          className={styles.forMoreInformationContainer}
          onClick={onForMoreInformationClick}
        >
          <span>{`For more information, `}</span>
          <span className={styles.visitThisPage}>visit this page.</span>
        </div>
        <div className={styles.info}>
          <div className={styles.neelOboni5th}>{rowData.Property}</div>
          <div className={styles.propertyrating} >

        <Stack spacing={1}>
          <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
        </Stack>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsForReservationP;
