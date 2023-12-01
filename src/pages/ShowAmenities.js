import React from 'react';
import styles from './ViewDetails.module.css';

const amenitiesMap = {
  waterfront: 'Waterfront',
  kitchen: 'Kitchen',
  wifi: 'Wifi',
  parking: 'Free parking on premises',
  hotTub: 'Private hot tub',
  tv: 'TV',
  washer: 'Washer',
  dryer: 'Dryer',
  ac: 'Window AC unit',
  cctv: 'Security cameras on property',
};

function renderAmenityDiv(amenity) {
  const amenityKey = Object.keys(amenitiesMap).find(
    (key) => amenitiesMap[key] === amenity
  );

  if (!amenityKey) {
    return null; 
  }

  const divClassName = styles[amenityKey]; 

  return (
    <div className={divClassName}>
      <div className={styles.diviikjzje}>
        <div className={styles.divi4wvyiymargin}>
          <img className={styles.frameIcon2} alt="" src={`/frame${10}.svg`} />
        </div>
        <div className={styles.divh2dCca3e21b}>
          <div className={styles.freeParkingOn}>{amenity}</div>
        </div>
      </div>
    </div>
  );
}

const fetchedAmenities = ['Waterfront', 'Wifi', 'TV']; // Replace with your actual fetched amenities

export default function ShowAmenities() {
  return (
    <div>
      {fetchedAmenities.map((amenity) => renderAmenityDiv(amenity))}
    </div>
  );
}
