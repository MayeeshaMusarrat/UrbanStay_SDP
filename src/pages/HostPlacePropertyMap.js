import React, { useState, useEffect } from 'react';

const HostPlacePropertyMap = ({ Address_line }) => {
  const [address, setAddress] = useState(Address_line);
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [map, setMap] = useState(null);

  console.log(Address_line);

  useEffect(() => {
 
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB-u-acPDJqFTRRxDqJ8NQrHrDQuZtGQ54&libraries=places`;
    script.defer = true;
    script.async = true;
    script.onload = initializeMap;
    document.head.appendChild(script);

    return () => {
      // Cleanup to avoid memory leaks
      if (map) {
        map.setMap(null);
      }
    };
  }, []); 

  const initializeMap = () => {
  
    const newMap = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: location.lat, lng: location.lng },
      zoom: 14,
    });

    setMap(newMap);
  };

  const geocodeAddress = () => {
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ address: Address_line }, (results, status) => {
      if (status === 'OK' && results.length > 0) {
        const { lat, lng } = results[0].geometry.location;
        setLocation({ lat: lat(), lng: lng() });

        if (map) {
          map.setCenter({ lat: lat(), lng: lng() });

          
          const marker = new window.google.maps.Marker({
            position: { lat: lat(), lng: lng() },
            map: map,
            title: results[0].formatted_address,
          });
        }
      } else {
        console.error('Geocode was not successful for the following reason:', status);
      }
    });
  };

  return (
    <div>
     
      <button style = {{border: 'transparent', fontSize: 14, backgroundColor: 'transparent'}} type = "button" onClick={geocodeAddress}>Show on Map</button>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
};

export default HostPlacePropertyMap;