import React, { useState, useEffect } from 'react';

const PropertyMap = (Address_line) => {
  const [address, setAddress] = useState(Address_line);
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [map, setMap] = useState(null);
  const [infoWindow, setInfoWindow] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB-u-acPDJqFTRRxDqJ8NQrHrDQuZtGQ54&libraries=places`;
    script.defer = true;
    script.async = true;
    script.onload = () => {
      initializeMap();
      geocodeAddress(); 
    };
    document.head.appendChild(script);

    console.log("address object?: ", Address_line);
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

    geocoder.geocode({ address: address.Address_line }, (results, status) => {
      if (status === 'OK' && results.length > 0) {
        const { lat, lng } = results[0].geometry.location;
        setLocation({ lat: lat(), lng: lng() });

        if (map) {
          map.setCenter({ lat: lat(), lng: lng() });

          // Create a marker
          const marker = new window.google.maps.Marker({
            position: { lat: lat(), lng: lng() },
            map: map,
            title: results[0].formatted_address,
          });

          // Create a custom tooltip content
          const tooltipContent = `<div><strong>${address.Address_line}</strong></div>`;

          // Create an info window for the marker
          const infowindow = new window.google.maps.InfoWindow({
            content: tooltipContent,
          });

          // Attach the info window to the marker
          marker.addListener('click', () => {
            if (infoWindow) {
              infoWindow.close();
            }
            infowindow.open(map, marker);
            setInfoWindow(infowindow);
          });
        }
      } else {
        console.error('Geocode was not successful for the following reason:', status);
      }
    });
  };

  return (
    <div>
      <button
        id="map"
        style={{ width: '100%', height: '500px', border: 'transparent' }}
        onClick={geocodeAddress}
        title="Click to show the map"
      ></button>
    </div>
  );
};

export default PropertyMap;
