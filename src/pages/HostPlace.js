import { useState, useCallback, useRef } from "react";
import { TextField, Checkbox, FormControlLabel , InputAdornment, OutlinedInput, FormControl} from "@mui/material";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';


import SignoutConfirmationPopup from "../components/SignoutConfirmationPopup";
import PortalPopup from "../components/PortalPopup";
import { useNavigate } from "react-router-dom";
import styles from "./HostPlace.module.css";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


const HostPlace = () => {

  const position = [51.505, -0.09]; 
  const [count, setCount] = useState(0);

  const [picURL, setPicURL] = useState([]);
  const [Name, setName] = useState("");

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const initialCheckboxes = [
    { label: "CCTV Surveillance", value: "CCTV", isChecked: false, className: styles.amenityFrameInner },
    { label: "Smoke Alarm", value: "Smoke", isChecked: false, className: styles.amenityFrameItem },
    { label: "Emergency Radio", value: "Radio", isChecked: false, className: styles.groupFormcontrollabel },
    { label: "Dryer", value: "Dryer", isChecked: false, className: styles.amenityFrameChild8 },
    { label: "Carbon monoxide alarm", value: "CO", isChecked: false, className: styles.amenityFrameChild1 },
    { label: "First aid kit", value: "firstAid", isChecked: false, className: styles.amenityFrameChild2 },
    { label: "Fire extinguisher", value: "FireExtinguisher", isChecked: false, className: styles.amenityFrameChild3 },
    { label: "Wi-fi", value: "wifi", isChecked: false, className: styles.amenityFrameChild4 },
    { label: "Parking spot", value: "parking", isChecked: false, className: styles.amenityFrameChild5 },
    { label: "Kitchen", value: "kitchen", isChecked: false, className: styles.amenityFrameChild6 },
    { label: "Waterfront", value: "waterfront", isChecked: false, className: styles.amenityFrameChild7},
    { label: "Washing Machine", value: "washer", isChecked: false, className: styles.amenityFrameChild9 },
    { label: "Hot tub", value: "hotTub", isChecked: false, className: styles.amenityFrameChild10 },
    { label: "TV", value: "tv", isChecked: false, className: styles.amenityFrameChild11 },
    { label: "Workspace", value: "workspace", isChecked: false, className: styles.amenityFrameChild12 },
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


  const [selectedFiles, setSelectedFiles] = useState([]); 
  const hiddenFileInput = useRef(null);

  const handleChange = (event) => {
    const file = event.target.files[0];
    setSelectedFiles([...selectedFiles, file]); 
    setPicURL([...picURL, URL.createObjectURL(file)]);
    setName(file.name);
  };

  const handleClick = (event) => {
    setCount((prev) => prev + 1);
    hiddenFileInput.current.click();
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


  let propertytype="House";
  
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

  const handleSubmit = (e)=>{
    e.preventDefault();

    navigate("/mylistings");
   
    const property = {
            property_name: propertyname,
            property_type: propertytype,
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
            pics: picURL
    };
    
    
    fetch("http://localhost:5001/host-place",{
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(property),
    }).then(result=>{
      
      if(result.status==200) {
       //DOESNT WORK
      }
      else {
        console.log("oops");
      }
    })
  }


  const [isPressedHouse, setIsPressedHouse] = useState(true);

  const handleButtonClick1 = () => {
    setIsPressedHouse(!isPressedHouse); // Toggle the pressed state
    if(isPressedHouse) propertytype="House";
   
  };

  const [isPressedAp, setIsPressedAp] = useState(true);

  const handleButtonClick2 = () => {
    setIsPressedAp(!isPressedAp); // Toggle the pressed state
    if(isPressedAp) propertytype="Apartment";
    
  };


  const [isPressedGuest, setIsPressedGuest] = useState(true);

  const handleButtonClick3 = () => {
    setIsPressedGuest(!isPressedGuest); // Toggle the pressed state
    if(isPressedGuest) propertytype="Guesthouse";
  };


  const [isPressedHotel, setIsPressedHotel] = useState(true);

  const handleButtonClick4 = () => {
    setIsPressedHotel(!isPressedHotel); // Toggle the pressed state
    if(isPressedHotel) propertytype="Hotel";
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
            //required={true}
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
          //  required={true}
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
          //  required={true}
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
         //   required={true}
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
         //   required={true}
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
            <button onClick={handleClick} type="button" disabled={count===5} className={styles.upload}  >
              Upload</button>

              <input
              type="file"
              onChange={handleChange}
              ref={hiddenFileInput}
              style={{ display: "none" }} // Make the file input element invisible
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
        //    required={true}
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
         //   required={true}
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
        //    required={true}
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
        //    required={true}
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
        //    required={true}
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
          
           {/* <MapContainer center={position} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>A sample marker with a popup.</Popup>
        </Marker>
      </MapContainer>
        */}
      
        </div>






          
        </div>
        <div
          className={styles.confirmlistingbtn}
        
        >
          <button className={styles.confirmListing} type = "submit" >Confirm Listing</button>
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
        <div className={styles.footer}>
          <div className={styles.divfooterTop}>
            <div className={styles.divcontainer}>
              <div className={styles.divrow}>
                <div className={styles.divcolLg4}>
                  <div className={styles.divfooterAppContent}>
                    <div className={styles.divfooterContentHeading}>
                      <div className={styles.heading4}>Get Our App</div>
                      <div className={styles.downloadTheApp}>
                        Download the app and book your property
                      </div>
                    </div>
                    <div className={styles.divdownloadApp}>
                      <div className={styles.link}>
                        <img
                          className={styles.googlePaypngIcon}
                          alt=""
                          src="/googlepaypng@2x.png"
                        />
                      </div>
                      <div className={styles.link}>
                        <img
                          className={styles.appStorepngIcon}
                          alt=""
                          src="/appstorepng@2x.png"
                        />
                      </div>
                    </div>
                    <div className={styles.divsocialLinks}>
                      <div className={styles.heading41}>Connect with us</div>
                      <div className={styles.list}>
                        <div className={styles.itemmargin}>
                          <div className={styles.itemLink4}>
                            <div className={styles.ifaBrands}>
                              <div className={styles.symbol}></div>
                            </div>
                          </div>
                        </div>
                        <div className={styles.itemmargin}>
                          <div className={styles.itemLink5}>
                            <div className={styles.ifaBrands}>
                              <div className={styles.symbol}></div>
                            </div>
                          </div>
                        </div>
                        <div className={styles.itemmargin}>
                          <div className={styles.itemLink6}>
                            <div className={styles.ifaBrands}>
                              <div className={styles.symbol}></div>
                            </div>
                          </div>
                        </div>
                        <div className={styles.itemmargin}>
                          <div className={styles.itemLink7}>
                            <div className={styles.ifaBrands}>
                              <div className={styles.symbol}></div>
                            </div>
                          </div>
                        </div>
                        <div className={styles.itemmargin}>
                          <div className={styles.itemLink8}>
                            <div className={styles.ifaBrands}>
                              <div className={styles.symbol}></div>
                            </div>
                          </div>
                        </div>
                        <div className={styles.item}>
                          <div className={styles.itemLink5}>
                            <div className={styles.ifaBrands}>
                              <div className={styles.symbol}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.divcolLg2}>
                  <div className={styles.divfooterWidgetList}>
                    <div className={styles.heading42}>
                      <div className={styles.explore}>Explore</div>
                    </div>
                    <div className={styles.list1}>
                      <div className={styles.item1}>
                        <div className={styles.link3}>
                          <div className={styles.listings}>  </div>
                        </div>
                        <div className={styles.symbol6}></div>
                      </div>
                      <div className={styles.item2}>
                        <div className={styles.link3}>
                          <div className={styles.listings}>Register</div>
                        </div>
                        <div className={styles.symbol6}></div>
                      </div>
                      <div className={styles.item3}>
                        <div className={styles.link3}>
                          <div className={styles.listings}>Login</div>
                        </div>
                        <div className={styles.symbol6}></div>
                      </div>
                      <div className={styles.item4}>
                        <div className={styles.link3}>
                          <div className={styles.listings}>Blogs</div>
                        </div>
                        <div className={styles.symbol6}></div>
                      </div>
                      <div className={styles.item5}>
                        <div className={styles.link3}>
                          <div className={styles.listings}>Hosts</div>
                        </div>
                        <div className={styles.symbol6}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.divcolLg21}>
                  <div className={styles.divfooterWidgetList}>
                    <div className={styles.heading43}>
                      <div className={styles.explore}>Categories</div>
                    </div>
                    <div className={styles.list1}>
                      <div className={styles.item6}>
                        <div className={styles.link3}>
                          <div className={styles.listings}>Apartments</div>
                        </div>
                        <div className={styles.symbol6}></div>
                      </div>
                      <div className={styles.item7}>
                        <div className={styles.link3}>
                          <div className={styles.listings}>Home</div>
                        </div>
                        <div className={styles.symbol6}></div>
                      </div>
                      <div className={styles.item8}>
                        <div className={styles.link3}>
                          <div className={styles.listings}>Office</div>
                        </div>
                        <div className={styles.symbol6}></div>
                      </div>
                      <div className={styles.item9}>
                        <div className={styles.link3}>
                          <div className={styles.listings}>Villas</div>
                        </div>
                        <div className={styles.symbol6}></div>
                      </div>
                      <div className={styles.item10}>
                        <div className={styles.link3}>
                          <div className={styles.listings}>Flat</div>
                        </div>
                        <div className={styles.symbol6}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.divcolLg22}>
                  <div className={styles.divfooterWidgetList}>
                    <div className={styles.heading44}>
                      <div className={styles.explore}>Locations</div>
                    </div>
                    <div className={styles.list1}>
                      <div className={styles.item11}>
                        <div className={styles.link3}>
                          <div className={styles.listings}>United States</div>
                        </div>
                        <div className={styles.symbol6}></div>
                      </div>
                      <div className={styles.item12}>
                        <div className={styles.link3}>
                          <div className={styles.listings}>Canada</div>
                        </div>
                        <div className={styles.symbol6}></div>
                      </div>
                      <div className={styles.item13}>
                        <div className={styles.link3}>
                          <div className={styles.listings}>India</div>
                        </div>
                        <div className={styles.symbol6}></div>
                      </div>
                      <div className={styles.item14}>
                        <div className={styles.link3}>
                          <div className={styles.listings}>UK</div>
                        </div>
                        <div className={styles.symbol6}></div>
                      </div>
                      <div className={styles.item15}>
                        <div className={styles.link3}>
                          <div className={styles.listings}>Australia</div>
                        </div>
                        <div className={styles.symbol6}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.divfooterBottom}>
            <div className={styles.p}>
              <div className={styles.copyright2023}>
                Copyright 2023 - All right reserved UrbanStay
              </div>
            </div>
          </div>
        </div>
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
          
          <div  onClick={toggle} >
          <img
            
            className={styles.profileIcon}
            alt=""
            src="/profile-icon2@2x.png"
          />
         </div>

         {popup && (
       
       <div className={styles.signinPopupWithSignout}>
       <div className={styles.loginPopupWithLogoutGrp}>
         <div className={styles.loginPopupWithLogoutGrpChild} />
         <button className={styles.becomehostbtn} id="BecomeHost">
           <button
             className={styles.becomeAHost}
           >{`    Become a host `}</button>
         </button>
         <div className={styles.loginPopupWithLogoutGrpItem} />
         <button className={styles.accsettingsbtn} id="accSettings">
           <button className={styles.becomeAHost}>
             {" "}
             Account Settings
           </button>
         </button>
         <button className={styles.wishlistbtn} id="wishlist">
           <button className={styles.becomeAHost}> Wishlist</button>
         </button>
         <button
           className={styles.signoutbtn}
           id="signOut"
           onClick={openSignoutConfirmationPopup}
         >
           <button className={styles.signOut}> Sign out</button>
         </button>
       </div>
     </div>


      )}


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
