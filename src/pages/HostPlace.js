import { useState, useCallback, useRef, useEffect } from "react";
import { TextField, Checkbox, FormControlLabel , InputAdornment, OutlinedInput, FormControl} from "@mui/material";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';

import SignoutConfirmationPopup from "../components/SignoutConfirmationPopup";
import PortalPopup from "../components/PortalPopup";
import { useNavigate } from "react-router-dom";
import styles from "./HostPlace.module.css";
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import IconPopup from "../components/IconPopup";

import HostPlacePropertyMap from './HostPlacePropertyMap';
import Footer from '../components/Footer';

const HostPlace = () => {

  const [count, setCount] = useState(0);

  useEffect(() => {
    const localStorageValue = localStorage.getItem('Property');
    if (localStorageValue) 
    {
      localStorage.removeItem('Property');
    }
  }, []);

  const [picURL, setPicURL] = useState([]);
  const [Name, setName] = useState("");

  const user_name = localStorage.getItem('name');

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const initialCheckboxes = [
    { label: "CCTV Surveillance", value: "CCTV", isChecked: false, className: styles.amenityFrameInner },
    { label: "Smoke Alarm", value: "Smoke", isChecked: false, className: styles.amenityFrameItem },
    { label: "Emergency Radio", value: "Radio", isChecked: false, className: styles.groupFormcontrollabel },

    { label: "Dryer", value: "Dryer", isChecked: false, className: styles.amenityFrameChild8 },
    { label: "Carbon monoxide alarm", value: "COAlarm", isChecked: false, className: styles.amenityFrameChild1 },
    { label: "First aid kit", value: "First Aid Kit", isChecked: false, className: styles.amenityFrameChild2 },

    { label: "Fire extinguisher", value: "FireExtinguisher", isChecked: false, className: styles.amenityFrameChild3 },
    { label: "Wi-fi", value: "Wifi", isChecked: false, className: styles.amenityFrameChild4 },
    { label: "Parking spot", value: "Parking", isChecked: false, className: styles.amenityFrameChild5 },
    { label: "Kitchen", value: "Kitchen", isChecked: false, className: styles.amenityFrameChild6 },

    { label: "Waterfront", value: "Waterfront", isChecked: false, className: styles.amenityFrameChild7},
    { label: "Washing Machine", value: "Washer", isChecked: false, className: styles.amenityFrameChild9 },
    { label: "Hot tub", value: "HotTub", isChecked: false, className: styles.amenityFrameChild10 },
    
    { label: "TV", value: "TV", isChecked: false, className: styles.amenityFrameChild11 },
    { label: "Workspace", value: "Workspace", isChecked: false, className: styles.amenityFrameChild12 },
    { label: "Air Conditioning", value: "AC", isChecked: false, className: styles.amenityFrameChild13 }
    
  ];
  
  const [checkboxes, setCheckboxes] = useState(initialCheckboxes);
  const handleCheckboxChange = (value) => {
    const updatedCheckboxes = checkboxes.map((checkbox) => {
      if (checkbox.value === value) {
        return { ...checkbox, isChecked: !checkbox.isChecked };
      }
      return checkbox;
    });
  
    setCheckboxes(updatedCheckboxes);
    if (selectedCheckboxes.includes(value)) {
      setSelectedCheckboxes(selectedCheckboxes.filter((val) => val !== value));
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, value]);
    }
  };


const [imageUrls, setImageUrls] = useState([]);
const [selectedFiles, setSelectedFiles] = useState([]); 
const hiddenFileInput = useRef(null);

const handleChange = (event) => {
  const filess = Array.from(event.target.files);
  const file = event.target.files[0];
  setSelectedFiles([...selectedFiles, ...filess]); 
  setName(file.name);

  
};



const handleUpload = async () => {
  setCount((prev) => prev + 1);
  hiddenFileInput.current.click();
  const uploadPromises = selectedFiles.map(async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
        params: {
          key: '08e06e8964e64a3f1d8bb8fb36fee354'
        },
      });
      console.log(response.data.data.url);
      return response.data.data.url;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  });

  const uploadedImageUrls = await Promise.all(uploadPromises);
  setImageUrls([...imageUrls, ...uploadedImageUrls.filter((url) => url !== null)]);
};


  const [popup, setPopup] = useState(false);

  const toggle = () => {
    setPopup(!popup);
  };



  const [isSignoutConfirmationPopupOpen, setSignoutConfirmationPopupOpen] =
    useState(false);
  const navigate = useNavigate();

  const onConfirmPaymentBtnContainer1Click = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='frame3']");
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  const onConfirmPaymentBtnContainer2Click = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='frame2']");
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  const onConfirmPaymentBtnContainer3Click = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='frame1']");
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  const onConfirmPaymentBtnContainer4Click = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='frame']");
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  const onItemLinkClick = useCallback(() => {
    navigate("/myreservations");
  }, [navigate]);

  const onItemLink1Click = useCallback(() => {
    navigate("/mypastreservations");
  }, [navigate]);

  const onItemLink2Click = useCallback(() => {
    navigate("/profile");
  }, [navigate]);

  const onItemLink3Click = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onGroupContainer1Click = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const openSignoutConfirmationPopup = useCallback(() => {
    setSignoutConfirmationPopupOpen(true);
  }, []);

  const closeSignoutConfirmationPopup = useCallback(() => {
    setSignoutConfirmationPopupOpen(false);
  }, []);

  const onItemLink9Click = useCallback(() => {
    
  }, [navigate]);


  const [propType, setPropType] = useState("House");
  const [propertyname,setPropName] = useState("");
  const [bedroomCnt, setBedroom] = useState("");
  const [bedCnt, setBed] = useState("");
  const [bathroomCnt, setBath] = useState("");
  const [room, setRoom] = useState("");
  const [guest, setGuest] = useState("");
  const [area, setArea] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");

  const [selectedDate, setSelectedDate] = useState(["", ""]);

  // Function to handle changes in the date range field
  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
  };


  /*
  const [countBedrooms, setCountBedrooms] = useState(1);
  const handleChangeBedrooms = (event) => {
    setCountBedrooms(Math.max(Number(event.target.value), 1));
  };

  const [countBeds, setCountBeds] = useState(1);
  const handleChangeBeds = (event) => {
    setCountBeds(Math.max(Number(event.target.value), 1));
  };


  const [countBath, setCountBath] = useState(1);
  const handleChangeBath = (event) => {
    setCountBath(Math.max(Number(event.target.value), 1));
  };

  const [countRooms, setCountRooms] = useState(1);
  const handleChangeRooms = (event) => {
    setCountRooms(Math.max(Number(event.target.value), 1));
  };
  const [countGuests, setCountGuests] = useState(1);
  const handleChangeGuests = (event) => {
    setCountGuests(Math.max(Number(event.target.value), 1));
  };
 */

  const handleSubmit = ()=>{
  
   
    const property = {
            property_name: propertyname,
            property_type: propType,
            bedroom_count: bedroomCnt,
            bed_count: bedCnt,
            bathroom_count: bathroomCnt,
            room_count: room,
            guest_count: guest,
            area: area,
            availability: selectedDate,
            description: description,
            country: country,
            state: state,
            zipcode: zipcode,
            address_line: address,
            amenities: selectedCheckboxes,
            pics: imageUrls[0],
            pics_array: imageUrls
    };
    localStorage.setItem('Property', JSON.stringify(property));
    navigate("/confirm-listing");
    
  }


  const [isPressedHouse, setIsPressedHouse] = useState(true);

  const handleButtonClick1 = () => {
    setIsPressedHouse(!isPressedHouse); // Toggle the pressed state
    if(isPressedHouse) setPropType("House");
   
  };

  const [isPressedAp, setIsPressedAp] = useState(true);

  const handleButtonClick2 = () => {
    setIsPressedAp(!isPressedAp); // Toggle the pressed state
    if(isPressedAp) setPropType("Apartment");
    
  };


  const [isPressedGuest, setIsPressedGuest] = useState(true);

  const handleButtonClick3 = () => {
    setIsPressedGuest(!isPressedGuest); // Toggle the pressed state
    if(isPressedGuest) setPropType("Guesthouse");
  };


  const [isPressedHotel, setIsPressedHotel] = useState(true);

  const handleButtonClick4 = () => {
    setIsPressedHotel(!isPressedHotel); // Toggle the pressed state
    if(isPressedHotel) setPropType("Hotel");
  };





  return (
    <form onSubmit={handleSubmit}>
    
      <div className={styles.hostPlace}>
        <img
          className={styles.hostPlaceChild}
          alt=""
          src="/rectangle-124.svg"
        />
        <div className={styles.propertyInfoFrame}>
          <div className={styles.propertyInfoFrameChild} />
          
          <TextField
            className={styles.propertyname}
            color="info"
            placeholder="Enter Property Name"
          //  required={true}
            fullWidth={true}
            sx={{ width: 253 }}
            variant="outlined"
            value = {propertyname}
            onChange = {(e) => setPropName(e.target.value)}
            
          />
          
          

          <LocalizationProvider dateAdapter={AdapterDayjs} >
          <SingleInputDateRangeField className={styles.availability}
          value={selectedDate} 
          onChange={handleDateChange} 
          />
          </LocalizationProvider>
    

          <TextField
            className={styles.bedrooms}
            color="info"
            placeholder="1"
            required={true}
            fullWidth={true}
            sx={{ width: 253 }}
            variant="outlined"
            
            value = {bedroomCnt}
            onChange = {(e) => setBedroom(e.target.value)}
          />
          
          <TextField
            className={styles.rooms}
            color="info"
            placeholder="1"
            required={true}
            fullWidth={true}
            sx={{ width: 253 }}
            variant="outlined"
            
            value = {room}
            onChange = {(e) => setRoom(e.target.value)}
          />
         
          <TextField
            className={styles.guests}
            color="info"
            placeholder="1"
            required={true}
            fullWidth={true}
            sx={{ width: 253 }}
            variant="outlined"
           
            value = {guest}
            onChange = {(e) => setGuest(e.target.value)}
          />
         

          <FormControl variant="outlined" className={styles.area}>

          <OutlinedInput
            id="outlined-adornment-weight"
            endAdornment={<InputAdornment position="end">sq. ft</InputAdornment>}
            value = {area}
            onChange = {(e) => setArea(e.target.value)}
          />
          
        </FormControl>

          <TextField
            className={styles.beds}
            color="info"
            value="1"
            required={true}
            fullWidth={true}
            sx={{ width: 253 }}
            variant="outlined"
            placeholder="1"
            value = {bedCnt}
            onChange = {(e) => setBed(e.target.value)}
          />
         
          <TextField
            className={styles.bathrooms}
            color="info"
            placeholder="1"
            required={true}
            fullWidth={true}
            sx={{ width: 253 }}
            variant="outlined"
            
            value = {bathroomCnt}
            onChange = {(e) => setBath(e.target.value)}
          />
          
          <div className={styles.propertyName}>Property Name</div>
          <div className={styles.propertyType}>Property Type</div>
          <div className={styles.noOfBedrooms}>No. of Bedrooms</div>
          <div className={styles.noOfBeds}>No. of Beds</div>
          <div className={styles.noOfBathrooms}>No. of Bathrooms</div>
          <div className={styles.noOfRooms}>No. of Rooms</div>
          <div className={styles.availability1}>Availability</div>
          <div className={styles.noOfGuests}>No. of guests</div>
          <div className={styles.area1}>Area</div>

          <div className={styles.proptypes}>
            <button className={styles.house} type = "button" onClick={handleButtonClick1}
             style={{ background: isPressedHouse ? 'white' : 'lightgray' }}
            >
              <div className={styles.house1}>House</div>
              <div className={styles.textIcon}>
                <img
                  className={styles.propertyTypeIcon}
                  alt=""
                  src="/property-type.svg"
                />
              </div>
            </button>


            <button className={styles.apartment} type = "button" onClick={handleButtonClick2}
             style={{ background: isPressedAp ? 'white' : 'lightgray' }}>
              <div className={styles.house1}>Apartment</div>
              <img
                className={styles.propertyTypeIcon1}
                alt=""
                src="/property-type1.svg"
              />
            </button>
            <button className={styles.guesthouse} type = "button" onClick={handleButtonClick3}
             style={{ background: isPressedGuest ? 'white' : 'lightgray' }}>
              <div className={styles.house1}>Guesthouse</div>
              <img
                className={styles.propertyTypeIcon2}
                alt=""
                src="/property-type2.svg"
              />
            </button>

            <button className={styles.hotel} type = "button" onClick={handleButtonClick4}
             style={{ background: isPressedHotel ? 'white' : 'lightgray' }}>
              <div className={styles.house1}>Hotel</div>
              <img
                className={styles.propertyTypeIcon2}
                alt=""
                src="/property-type3.svg"
              />
            </button>
          </div>
          <div
            className={styles.propertyInfoFrameItem}
            data-scroll-to="frame3"
          />
        </div>
        <div className={styles.amenityFrame}>
          <div className={styles.amenityFrameChild} />
          <div className={styles.propertyName}>Essentials</div>
          <div className={styles.safetyItems}>Safety Items</div>

          <div> 

          
          {checkboxes.map((checkbox) => (
  <FormControlLabel
    key={checkbox.value}
    label={checkbox.label}
    className={checkbox.className} 
    control={
      <Checkbox
        color="info"
        
        value={checkbox.value}
        onChange={() => handleCheckboxChange(checkbox.value)}
        checked={checkbox.isChecked}
      />
    }
  />
))}

</div>
















         
         
          <div className={styles.frameDiv} data-scroll-to="frame2" />
        </div>
        <div className={styles.propertyGalleryFrame}>
          <div className={styles.propertyGalleryFrameChild} />
        
              <div className={styles.pic_URL} >

                {Name}

              </div>
          <div className={styles.uploadbtn}>
            <button onClick={handleUpload} type="button" className={styles.upload}  >
              Upload</button>

              <input
              type="file"
              multiple
              onChange={handleChange}
              ref={hiddenFileInput}
              style={{ display: "none" }} 
            />
          </div>


        <div className={styles.pictureContainer}>

        {selectedFiles.map((file, index) => (
         <div key={index} className={styles.propertyGalleryFrameItem}>
         <img
           src={URL.createObjectURL(file)}
           alt="Uploaded"
           style={{ width: '100%', height: '100%' }}
         />

       </div>
      ))}

      </div>



          <div className={styles.theMaximumPhotoContainer}>
            <ul className={styles.theMaximumPhotoSizeIs8Mb}>
              <li className={styles.theMaximumPhoto}>
                The maximum photo size is 8 MB. Formats: jpeg, jpg, png. Put the
                main picture first
              </li>
              <li>Maximum number of files upload will be 5 files.</li>
            </ul>
          </div>
          <div
            className={styles.propertyGalleryFrameInner}
            data-scroll-to="frame1"
          />
        </div>
        <div className={styles.descriptionFrame}>
          <div className={styles.descriptionFrameChild} />
          <div >

          <TextField
            className={styles.description}
            placeholder="Enter Description (max. 500 words)"
            color="info"
            required={true}
            fullWidth={true}
            sx={{ width: 253, minHeight: '145px' }} 
            variant="outlined"
            multiline 
            rows={4}
            value = {description}
            onChange = {(e) => setDescription(e.target.value)}
          />


          </div>






          <div className={styles.propertyName}>


            description
            
            
            
            </div>
          <div className={styles.descriptionFrameItem} data-scroll-to="frame" />
        </div>
        <div className={styles.locationFrame}>
          <div className={styles.locationFrameChild} />
         
          <TextField
            className={styles.country}
            color="info"
            placeholder="Enter Country"
           required={true}
            fullWidth={true}
            sx={{ width: 253}} 
            variant="outlined"
            value = {country}
            onChange = {(e) => setCountry(e.target.value)}
          />
       
       
          <TextField
            className={styles.addressline}
            color="info"
            placeholder="Enter Address Line"
            required={true}
            fullWidth={true}
            sx={{ width: 909}} 
            variant="outlined"
            value = {address}
            onChange = {(e) => setAddress(e.target.value)}
          />
          
        
          <TextField
            className={styles.state}
            color="info"
            placeholder="Enter State"
            required={true}
            fullWidth={true}
            sx={{ width: 253}} 
            variant="outlined"
            value = {state}
            onChange = {(e) => setState(e.target.value)}
          />

          <TextField
            className={styles.zipcode}
            color="info"
            placeholder="Enter Zipcode"
            required={true}
            fullWidth={true}
            sx={{ width: 253}} 
            variant="outlined"
            value = {zipcode}
            onChange = {(e) => setZipcode(e.target.value)}
          />
          
          <div className={styles.propertyName}>
            Country
            
          </div>
          <div className={styles.addressLine}>Address Line</div>
          <div className={styles.state1}>State</div>
          <div className={styles.zipcode1}>Zipcode</div>
          
          
          <div className={styles.MAP} > 
          
             
            <HostPlacePropertyMap Address_line = {address} />
      
        </div>


          
        </div>
        <div
          className={styles.confirmlistingbtn}
        
        >
          <button className={styles.confirmListing} type = "submit" >Continue </button>
        </div>
        <div className={styles.rectangleParent}>
          <div className={styles.frameChild} />
          <div className={styles.confirmpaymentbtn}>
            <button className={styles.upload} type = "button" >Property Information</button>
          </div>
          <div
            className={styles.confirmpaymentbtn1}
            onClick={onConfirmPaymentBtnContainer1Click}
          >
            <button className={styles.amenities} type = "button" >Amenities</button>
          </div>
          <div
            className={styles.confirmpaymentbtn2}
            onClick={onConfirmPaymentBtnContainer2Click}
          >
            <button className={styles.amenities} type = "button" >Property Gallery</button>
          </div>
          <div
            className={styles.confirmpaymentbtn3}
            onClick={onConfirmPaymentBtnContainer3Click}
          >
            <button className={styles.amenities} type = "button" >Description</button>
          </div>
          <div
            className={styles.confirmpaymentbtn4}
            onClick={onConfirmPaymentBtnContainer4Click}
          >
            <button className={styles.amenities} type = "button" >Location</button>
          </div>
        </div>
        <div className={styles.itemLinkParent}>
          <div className={styles.itemLink} onClick={onItemLinkClick}>
            <b className={styles.reservations}>Reservations</b>
          </div>
          <div className={styles.itemLink1} onClick={onItemLink1Click}>
            <div className={styles.pastReservations}>Past reservations</div>
          </div>
          <div className={styles.itemLink2} onClick={onItemLink2Click}>
            <div className={styles.profile}>Profile</div>
          </div>
          <div className={styles.itemLink3} onClick={onItemLink3Click}>
            <div className={styles.profile}>HOME</div>
          </div>
        </div>
        <div className={styles.propertyInformationFillContainer}>
          <p className={styles.blankLine}>Property Information</p>
          <p className={styles.blankLine}>&nbsp;</p>
          <p className={styles.fillUpThe}>
            Fill up the form with basic information of your property.
          </p>
        </div>
        <div className={styles.amenitiesSelectTheContainer}>
          <p className={styles.blankLine}>Amenities</p>
          <p className={styles.blankLine}>&nbsp;</p>
          <p className={styles.fillUpThe}>
            Select the amenities and safety items present in your place. .
          </p>
        </div>
        <div className={styles.propertyGalleryUploadContainer}>
          <p className={styles.blankLine}>property Gallery</p>
          <p className={styles.blankLine}>&nbsp;</p>
          <p className={styles.fillUpThe}>
            Upload 5 pictures of your property.
          </p>
        </div>
        <div className={styles.propertyGalleryUploadContainer}>
          <p className={styles.blankLine}>property Gallery</p>
          <p className={styles.blankLine}>&nbsp;</p>
          <p className={styles.fillUpThe}>
            Upload 5 pictures of your property.
          </p>
        </div>
        <div className={styles.descriptionPutUpContainer}>
          <p className={styles.blankLine}>Description</p>
          <p className={styles.blankLine}>&nbsp;</p>
          <p className={styles.fillUpThe}>
            Put up a catchy description for your property.
          </p>
        </div>
        <div className={styles.locationHelpTheContainer}>
          <p className={styles.blankLine}>Location</p>
          <p className={styles.blankLine}>&nbsp;</p>
          <p className={styles.fillUpThe}>Help the renters find your home!</p>
        </div>
       <Footer />
        <div className={styles.stickyNavBar}>
          <div className={styles.whiterectangle} />
          <div
            className={styles.urbanstayParent}
            onClick={onGroupContainer1Click}
          >
            <div className={styles.urbanstay}>
              <span className={styles.urbanstayTxt}>
                <b>URBAN</b>
                <span className={styles.stay}>STAY</span>
              </span>
            </div>
            <img className={styles.image31} alt="" src="/image-3-11@2x.png" />
          </div>



        <IconPopup topMargin={23} name = {user_name}/>



          <div className={styles.itemLink9} onClick={onItemLink9Click}>
            <div className={styles.profile}> </div>
          </div>
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
  );
};

export default HostPlace;
