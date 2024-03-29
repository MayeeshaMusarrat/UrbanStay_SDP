import React, { useState, useCallback, useEffect } from "react";
import { TextField, InputAdornment, Icon, IconButton } from "@mui/material";
import SignoutConfirmationPopup from "../components/SignoutConfirmationPopup";
import PortalPopup from "../components/PortalPopup";
import { useNavigate } from "react-router-dom";
import styles from "./LandingPage.module.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { DateRangePicker } from "react-date-range";
import { defaultStaticRanges } from "../components/defaultRanges";
import { format } from "date-fns";

import "react-date-range/dist/styles.css"; 
import "react-date-range/dist/theme/default.css"; 
import "../components/Datepicker.css";

import PropTypes from "prop-types";
import Avatar from '@mui/material/Avatar';
import { useDeprecatedAnimatedState } from "framer-motion";

import IconPopupForGuest from '../components/IconPopupForGuest';
import IconPopup from '../components/IconPopup';
import IconPopupSign from '../components/IconPopupSign';

import Footer from '../components/Footer';
import ChooseCalendar from '../components/ChooseCalendar';
import dayjs from "dayjs";




const LandingPage = ({ onClose }) => {
  
  const [selectedRange, setSelectedRange] = useState(null);
  const [initialMonthAndYear, setInitialMonthAndYear] = useState(dayjs());

  useEffect(() => {
    console.log(initialMonthAndYear);
  }, [initialMonthAndYear]);


  const [selectedDateRange, setSelectedDateRange] = useState({
       startDate: new Date(),
       endDate: new Date(),
       key: "selection"
  });
  const [show, setShow] = useState(false);


  function formatDateDisplay(date, defaultText) {
       if (!date) return defaultText;
       return format(date, "d MMM, yyyy");
  }

  const handleSelect = ranges => {
       setSelectedDateRange(ranges.selection);
       console.log(ranges.selection);
  };

  //=============== EMAILJS 


  ///===================================


 

 
  localStorage.setItem("proptype", null);
  localStorage.setItem("minprice", null);
  localStorage.setItem("maxprice", null);

  useEffect(() => {
    const { startDate, endDate } = selectedDateRange;

    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() + 1);
  
    const newEndDate = new Date(endDate);
    newEndDate.setDate(endDate.getDate() + 1);
    const dateRange = {
      startDate: newStartDate.toISOString().split('T')[0],
      endDate: newEndDate.toISOString().split('T')[0],
      key: "selection"
    };
    localStorage.setItem('dateRange', JSON.stringify(dateRange));
  }, [selectedDateRange]);

  
  
  const [contentColor, setContentColor] = useState('#c2c2c2');
  
  
  const [storedValue, setStoredValue] = useState(localStorage.getItem('email'));
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
   
    if (localStorage.getItem('email')) {
      setStoredValue(localStorage.getItem('email'));
      setLoggedIn(true);
    } 
    else 
    {
      setStoredValue("RandomRandomRandom");
      console.log('Email does not exist in localStorage');
    }
  }, [storedValue]);




  const [dateShow, setDateShow] = useState("19 Oct, 2023 - 25 Oct, 2023");
  const [fontColor, setFontColor] = useState('#c2c2c2');
  
  const storedRangeValues = localStorage.getItem("rangeValues");
  const rangeValues = storedRangeValues ? JSON.parse(storedRangeValues) : null;
  
  useEffect(() => {
    if (rangeValues !== null) {
      const dates = {
        startDate: new Date(rangeValues.from).toISOString(), // Convert numeric timestamp to ISO string
        endDate: rangeValues.to ? new Date(rangeValues.to).toISOString() : null,   // Convert numeric timestamp to ISO string
      };
      const dateToFormatStart = new Date(dates.startDate);
      const dateToFormatEnd = new Date(dates.endDate);
  
      const formattedFrom = formatDateDisplay(dateToFormatStart, 'N/A');
      const formattedTo = formatDateDisplay(dateToFormatEnd, 'N/A');
  
      setDateShow(`${formattedFrom} - ${formattedTo}`);
      setFontColor('black');
  
      setCheckIn(dateToFormatStart);
      setCheckOut(dateToFormatEnd);
    } else {
      setDateShow("19 Oct, 2023 - 25 Oct, 2023");
      setFontColor('#c2c2c2');
      setCheckIn(null); // Set your default check-in value
      setCheckOut(null); // Set your default check-out value
    }
  }, [rangeValues]);
  


  const [isGuest, setIsGuest] = useState(1);
  
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5001/isGuest?email=${storedValue}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.message);
        if(data.message==='yes')
        {
          setIsGuest(0);
          setName(data.name);
          localStorage.setItem('name', data.name);
          localStorage.setItem('GuestOrHost', 0);
        }
        else if(data.message === 'no')
        {
          setName(data.name);
          localStorage.setItem('name', data.name);
          localStorage.setItem('GuestOrHost', 1);
        }
        else if(data.message === 'X')
        {
          setVisible(false);
          localStorage.setItem('name', '');
          localStorage.setItem('GuestOrHost', -1);
        }
        
      })
      .catch((error) => {
        console.error('Error fetching ID:', error);
      });
  }, []); 

  const [notifInfo, setNotifInfo] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:5001/getNotifications/${storedValue}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
         
        console.log(data);
        const formattedNotifData = data.searchResults.map(result => ({

          Created: new Date(result.Created).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          }),
          Heading: result.Heading,
          comment: result.notification_text,
          seen: result.seen,
          type: result.type,
          
        }));
        setNotifInfo(formattedNotifData);
       

      })
      .catch((error) => {
        console.error('Error fetching notid:', error);
      });
  }, []); 

  const user_name = localStorage.getItem('name');

  localStorage.setItem('notifications', JSON.stringify(notifInfo));


  const [popupLogin, setPopupLogin] = useState(false);
  const toggleLogin = () => {
    setPopupLogin(!popupLogin);
  };


  //counter

  const [countRooms, setCountRooms] = useState(1);
  const handleChangeRooms = (event) => {
    setCountRooms(Math.max(Number(event.target.value), 1));
   
  };

  const [countGuests, setCountGuests] = useState(1);
  const handleChangeGuests = (event) => {
    setCountGuests(Math.max(Number(event.target.value), 1));
   
  };


  let content = `${countRooms} Room${countRooms > 1 ? 's' : ''}, ${countGuests} Guest${countGuests > 1 ? 's' : ''}`;



  /// =========================

  const [popupCalender, setPopupCalender] = useState(false);
  const toggleCalender = () => {
    if(popup) setPopup(!popup);
    setPopupCalender(!popupCalender);
  };

  const [popup, setPopup] = useState(false);
  const toggle = () => {
    setCountRooms(1);
    setCountGuests(1);
    if(popupCalender) setPopupCalender(!popupCalender);
    setPopup(!popup);
  };


  const confirmAccomodation = () => {
    localStorage.setItem('Rooms', countRooms);
    localStorage.setItem('Guests', countGuests);
    setContentColor('black');
    setPopup(!popup);
  }

 
  const [isSignoutConfirmationPopupOpen, setSignoutConfirmationPopupOpen] =
  useState(false);
  const navigate = useNavigate();

  const onSignInBtnClick = useCallback(() => {
    navigate("/sign-in-page");
  }, [navigate]); 

  const goProfile = useCallback(() => {
    navigate("/temp-profile");
  }, [navigate]); 

  const onSignUpBtnClick = useCallback(() => {
    navigate("/leading-page");
  }, [navigate]);

  const onItemLink5Click = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='shadow']");
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  const onItemLink6Click = useCallback(() => {
    const anchor = document.querySelector(
      "[data-scroll-to='exploreByPropTypeContainer']"
    );
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  const onItemLink7Click = useCallback(() => {
    const anchor = document.querySelector(
      "[data-scroll-to='featuredSectionContainer']"
    );
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  const onItemLink8Click = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='pseudoImage']");
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  const onItemLink9Click = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='rectangle']");
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  const onItemLink10Click = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='footerContainer']");
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  const onBecomeHostBtnClick = useCallback(() => {
    navigate("/become-host");
  }, [navigate]);

  const goHost = useCallback(() => {
    navigate("/hosting-intro");
  }, [navigate]);

  const openSignoutConfirmationPopup = useCallback(() => {
    setSignoutConfirmationPopupOpen(true);
  }, []);

  const closeSignoutConfirmationPopup = useCallback(() => {
    setSignoutConfirmationPopupOpen(false);
  }, []);

// =========================================== API FETCH =====================================================


const [destination, setDestination] = useState("");
const [checkin, setCheckIn] = useState("");
const [checkout, setCheckOut] = useState("");

const handleSubmit = (e) => {
 
  const search = {
    destination: destination,
    checkin: checkin,
    checkout: checkout,
    rooms: countRooms,
    guests: countGuests
  };
  localStorage.setItem('Destination', destination);
  navigate("/browse");
};

//=======================================================================================================================



  return (
    <>
      <div className={styles.landingpage}>
        <div className={styles.background}>
          <img className={styles.bgIcon} alt="" src="/bg@2x.png" />
          <div className={styles.shadow} data-scroll-to="shadow" />
        </div>
        <div className={styles.introSection}>
          <img
            className={styles.unsplashogmf8o53leeIcon}
            alt=""
            src="/unsplashogmf8o53lee@2x.png"
          />
          <div className={styles.headline}>
            <p className={styles.payAsLittle}>Pay as Little</p>
            <p className={styles.payAsLittle}>as possible!</p>
          </div>
          <div className={styles.headline1}>
            <p className={styles.payAsLittle}>Enjoy peaceful</p>
            <p className={styles.payAsLittle}>Environment!</p>
          </div>
          <div className={styles.headline2}>
            <p className={styles.payAsLittle}>Enjoy wisdom</p>
            <p className={styles.payAsLittle}>of community!</p>
          </div>
          <div className={styles.headline3}>
            <p className={styles.payAsLittle}>Stay Safe!</p>
            <p className={styles.payAsLittle}>Save Money!</p>
          </div>
          <div className={styles.headline4}>
            <p className={styles.payAsLittle}>Let somebody else</p>
            <p className={styles.payAsLittle}>take care of accommodation!</p>
          </div>
          <div className={styles.headline5}>
            <p className={styles.payAsLittle}>Pay for what</p>
            <p className={styles.payAsLittle}>you use !</p>
          </div>
          <img
            className={styles.introSectionChild}
            alt=""
            src="/group-1882.svg"
          />
          <img
            className={styles.introSectionItem}
            alt=""
            src="/group-1974.svg"
          />
          <img
            className={styles.introSectionInner}
            alt=""
            src="/group-1972.svg"
          />
          <img className={styles.groupIcon} alt="" src="/group-1976.svg" />
          <img
            className={styles.introSectionChild1}
            alt=""
            src="/group-1975.svg"
          />
          <img
            className={styles.introSectionChild2}
            alt=""
            src="/group-1973.svg"
          />
        </div>
        <div className={styles.landingpageChild} />
        <div className={styles.title}>
          <b className={styles.findTheBest}>Find the Best Services Available</b>
          <b className={styles.forHouseRentingContainer}>
            <span className={styles.urbanstayTxt}>
              <span>for House</span>
              <span className={styles.span}>{` `}</span>
              <span>{`Renting & Hosting`}</span>
            </span>
          </b>
        </div>

        <div className={styles.landingpageItem} />

        { 
       
        <div 
        className={`${styles.datePopup} ${popupCalender ? styles.active : ''}`}>
            
            <ChooseCalendar 
            initialRangeValuesProps={selectedRange}
            onRangeChange={(e) => setSelectedRange(e)}
            setOnRangeDateInScreen={(e) => setInitialMonthAndYear(e.start)}
            />

        </div>

        }

        <div
          className={styles.searchPropertyComponent}
         
        >

          <form onSubmit = {handleSubmit} > 
          <div className={styles.searchbarParent}>
            <div className={styles.searchbar}>
              
              <div
                onClick={toggle}
                className={styles.roomsAndGuestsSearchBar}
               
                style={{
                  width: 282,
                  color: contentColor,
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  padding: 15,
                  fontFamily: 'Roboto',
                  fontSize: 'medium', 
                }}
              >
             { content }
              </div>
             
             
              <div className={styles.reservationDates} 
              onClick = {toggleCalender}
              style={{
                color: fontColor,
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                padding: 15,
                fontFamily: 'Roboto',
                fontSize: 'medium', 
              }}
              >
              {dateShow}
              </div>
              
              <TextField
                className={styles.destination}
                required={true}
                size="medium"
                sx={{ width: 425 }}
                placeholder="Enter Country or City"
                fullWidth={true}
                variant="outlined"
                type="text"
                value = {destination}
                onChange = {(e) => setDestination(e.target.value)}

              />
            </div>
            <img
              onClick={handleSubmit}
              className={styles.searchbuttonIcon}
              alt=""
              src="/searchbutton1.svg"
            />
          </div>
          </form>
        </div>
       

      

      { 
        <div 
      
        className={`${styles.roomsAndGuestsPopup} ${popup ? styles.active : ''}`}
        
        >
          <div className={styles.roomandguestrectangle}>
            <div className={styles.roomandguestrectangleChild} />
            <button className={styles.roomframe}>
              <button className={styles.rooms}>Rooms</button>
            </button>
            <div className={styles.roomplusminus}>
              <button className={styles.roomcounterframe}>
                <button className={styles.button}
                 onChange={handleChangeRooms} value={countRooms}>

                  {countRooms}
                  
                </button>
              </button>
              <button className={styles.minussign}
                  onClick={() => setCountRooms((prev) => prev - 1)}
                  disabled={countRooms === 1}
              >
                
                <div className={styles.minussignChild} />
                <img

                  className={styles.mdiLightminusIcon}
                  alt=""
                  src="/mdilightminus.svg"
                />
              </button>
              <button className={styles.plussign} id="plusRooms"
              onClick={() => setCountRooms((prev) => prev + 1)}
              >
                <div className={styles.plusrectangle} />
                <img
                  className={styles.phplusLightIcon}
                  
                  alt=""
                  src="/phpluslight.svg"
                />
              </button>
            </div>
            <div className={styles.guestplusminus}>
              <button className={styles.roomcounterframe}>
                <button className={styles.button}
                  onChange={handleChangeGuests} value={countGuests}
                >
                  {countGuests}
                </button>
              </button>
              <button className={styles.minussign1} id="minusGuests"
                  onClick={() => setCountGuests((prev) => prev - 1)}
                  disabled={countGuests === 1}
              >
                <div className={styles.plusrectangle} />
                <img
                  className={styles.mdiLightminusIcon}
                  alt=""
                  src="/mdilightminus.svg"
                />
              </button>
              <button className={styles.plussign} id="plusGuests"
                  onClick={() => setCountGuests((prev) => prev + 1)}
              >
                <div className={styles.plusrectangle} />
                <img
                  className={styles.phplusLightIcon}
                  alt=""
                  src="/phpluslight.svg"
                />
              </button>
            </div>
            <button className={styles.guestframe}>
              <button className={styles.rooms}>Guests</button>
            </button>
            <div className={styles.separator} />
            <div className={styles.separator1} />
            <div className={styles.lineParent}>
              <div className={styles.groupChild} />
              <button className={styles.cancelbtn} id="cancel">
                <button className={styles.cancel} onClick={toggle}>Cancel</button>
              </button>
              <button className={styles.confirmbtn} id="confirm" onClick = {confirmAccomodation} >
                <button className={styles.cancel}>Confirm</button>
              </button>
            </div>
          </div>
        </div>

      }









        <div className={styles.serviceSection}>
          <div className={styles.divcontainer}>
            <div className={styles.divcol}>
              <div className={styles.heading2}>
                <b className={styles.experienceNewerOffers}>
                  Experience newer Offers with less hassle
                </b>
              </div>
              <div className={styles.separator2} />
              <div className={styles.divslickList}>
                <div className={styles.divofferWrapper}>
                  <div className={styles.divmedia}>
                    <div className={styles.divofferIcon}>
                      <img
                        className={styles.icon1png}
                        alt=""
                        src="/icon1png@2x.png"
                      />
                    </div>
                    <div className={styles.divmediaBodymargin}>
                      <div className={styles.divmediaBody}>
                        <b className={styles.heading3}>
                          Looking for a way to rent?
                        </b>
                        <div className={styles.ph2dFc71d8e0}>
                          <div className={styles.newOffersEveryContainer}>
                            <p className={styles.payAsLittle}>
                              10 new offers every day. 3000+ offers on site,
                              trusted by a
                            </p>
                            <p className={styles.payAsLittle}>
                              community of thousands of users.
                            </p>
                          </div>
                        </div>
                        <div className={styles.heading6}>
                          <div className={styles.urbanstay}>URBANSTAY</div>
                          <div className={styles.pseudo} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.divofferWrapper1}>
                  <div className={styles.divmedia1}>
                    <div className={styles.divofferIcon}>
                      <img
                        className={styles.icon1png}
                        alt=""
                        src="/icon2png@2x.png"
                      />
                    </div>
                    <div className={styles.divmediaBodymargin}>
                      <div className={styles.divmediaBody}>
                        <b className={styles.heading3}>
                          Looking for a way to host?
                        </b>
                        <div className={styles.ph2dC62fcfb7}>
                          <div className={styles.urbanstayProvidesA}>
                            UrbanStay provides a trusted community and reliable
                            policies to ensure you can safely host your
                            property.
                          </div>
                        </div>
                        <div className={styles.heading61}>
                          <div className={styles.urbanstay}>URBANSTAY</div>
                          <div className={styles.pseudo} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.spanlabel}>
            <div className={styles.newOffer}>New Offer</div>
          </div>
        </div>

      
      <Footer />

      <div className={styles.preferenceSection}>
        <div className={styles.divtitle1Parent}>
          <div className={styles.divtitle1}>
            <div className={styles.spanlabel1}>
              <div className={styles.preference}>Preference</div>
            </div>
            <b className={styles.selectSuitableProperties}>
              Select Suitable Properties that Fit your taste!
            </b>
            <div className={styles.separator1} />
          </div>
          <div className={styles.divrow1}>
            <div className={styles.divwowmargin}>
              <img
                className={styles.divfindCitiesIcon}
                alt=""
                src="/divfindcities@2x.png"
              />
            </div>
            <div className={styles.divwowmargin1}>
              <img
                className={styles.divfindCitiesIcon}
                alt=""
                src="/divfindcities1@2x.png"
              />
            </div>
            <div className={styles.divwowmargin2}>
              <img
                className={styles.divfindCitiesIcon}
                alt=""
                src="/divfindcities2@2x.png"
              />
            </div>
            <div className={styles.divwowmargin3}>
              <img
                className={styles.divfindCitiesIcon}
                alt=""
                src="/divfindcities3@2x.png"
              />
            </div>
            <div className={styles.divwowmargin4}>
              <img
                className={styles.divfindCitiesIcon}
                alt=""
                src="/divfindcities4@2x.png"
              />
            </div>
            <div className={styles.divwowmargin5}>
              <img
                className={styles.divfindCitiesIcon}
                alt=""
                src="/divfindcities5@2x.png"
              />
            </div>
          </div>
        </div>
      </div>


        <div className={styles.testimonialSection}>
          <div className={styles.testimonialSectionParent}>
            <div className={styles.testimonialSection1}>
              <img
                className={styles.pseudoIcon}
                alt=""
                src="/pseudo3@2x.png"
                data-scroll-to="pseudoImage"
              />
              <div className={styles.divtitle11}>
                <div className={styles.spanlabel2}>
                  <div className={styles.testimonials}>Testimonials</div>
                </div>
                <div className={styles.spanlabel2}>
                  <div className={styles.testimonials}>Testimonials</div>
                </div>
                <div className={styles.heading21}>
                  <b className={styles.findOutAbout}>
                    Find out about our service from the Happy Clients!
                  </b>
                </div>
                <div className={styles.separator3} />
              </div>
            </div>
            <div className={styles.frameParent}>
              <div className={styles.ellipseParent}>
                <img
                  className={styles.frameChild}
                  alt=""
                  src="/ellipse-4@2x.png"
                />
                <div className={styles.iHaveBeen}>
                  I have been a dedicated host on UrbanStay for the past 10
                  years, and my journey with this incredible house rental
                  platform has been nothing short of remarkable. UrbanStay has
                  consistently exceeded my expectations, and I couldn't be
                  happier with the experiences it has allowed me to create for
                  both guests and hosts alike.
                </div>
                <b className={styles.johnDoe}>John Doe</b>
                <img
                  className={styles.image1Icon}
                  alt=""
                  src="/image-1@2x.png"
                />
              </div>
              <div className={styles.ellipseGroup}>
                <img
                  className={styles.frameItem}
                  alt=""
                  src="/ellipse-5@2x.png"
                />
                <div className={styles.iRecentlyHad}>
                  I recently had the pleasure of using UrbanStay to find
                  accommodations for a short-term stay, and I couldn't be more
                  thrilled with the experience. From start to finish, everything
                  about my stay was made easier and more enjoyable thanks to
                  this fantastic house rental service.
                </div>
                <b className={styles.sofiaRetz}>Sofia Retz</b>
                <img
                  className={styles.image2Icon}
                  alt=""
                  src="/image-1@2x.png"
                />
              </div>
              <div className={styles.ellipseContainer}>
                <img
                  className={styles.frameInner}
                  alt=""
                  src="/ellipse-6@2x.png"
                />
                <div
                  className={styles.asAHost}
                >{`As a host on UrbanStay, I have had the pleasure of welcoming numerous guests into my home, and I can confidently say that it has been an incredibly positive experience. UrbanStay has truly made hosting a seamless and rewarding endeavor.From the moment I decided to list my property on the platform, the support and resources provided by UrbanStay were invaluable. `}</div>
                <b className={styles.melissaChang}>Melissa Chang</b>
                <img
                  className={styles.image3Icon}
                  alt=""
                  src="/image-1@2x.png"
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.explorePropertytypeSection}>
          <div className={styles.explorebyproptypeParent}>
            <div
              className={styles.explorebyproptype}
              data-scroll-to="exploreByPropTypeContainer"
            >
              <img
                className={styles.propertySecBg1pngIcon}
                alt=""
                src="/propertysecbg1png@2x.png"
              />
              <img
                className={styles.propertySecBg2pngIcon}
                alt=""
                src="/propertysecbg2png@2x.png"
              />
            </div>
            <b className={styles.urbanstayOffers3000}>
              UrbanStay offers 3000+ property listings for you to choose!
            </b>
            <div className={styles.exploreByProperty}>
              Explore By Property Type
            </div>
            <div className={styles.proptypeCarousel}>
              <div className={styles.proptypegroup}>
                <div className={styles.officecard}>
                  <div className={styles.officecardChild} />
                  <img
                    className={styles.workspaceicon1}
                    alt=""
                    src="/workspaceicon-1@2x.png"
                  />
                  <b className={styles.offices}>Offices</b>
                </div>
                <div className={styles.housecard}>
                  <div className={styles.officecardChild} />
                  <img
                    className={styles.houseicon1}
                    alt=""
                    src="/houseicon-1@2x.png"
                  />
                  <b className={styles.offices}>Houses</b>
                </div>
                <div className={styles.apartmentcard}>
                  <div className={styles.officecardChild} />
                  <img
                    className={styles.apartmenticon1}
                    alt=""
                    src="/apartmenticon-1@2x.png"
                  />
                  <b className={styles.offices}>Apartments</b>
                </div>
                <div className={styles.guesthousecard}>
                  <div className={styles.guesthousecardChild} />
                  <img
                    className={styles.guesthouseicon1}
                    alt=""
                    src="/guesthouseicon-1@2x.png"
                  />
                  <b className={styles.offices}>Guesthouses</b>
                </div>
                <div className={styles.guesthousecard1}>
                  <div className={styles.guesthousecardChild} />
                  <img
                    className={styles.guesthouseicon1}
                    alt=""
                    src="/guesthouseicon-1@2x.png"
                  />
                  <b className={styles.offices}>Guesthouses</b>
                </div>
                <div className={styles.apartmentcard1}>
                  <div className={styles.officecardChild} />
                  <img
                    className={styles.apartmenticon1}
                    alt=""
                    src="/apartmenticon-1@2x.png"
                  />
                  <b className={styles.offices}>Apartments</b>
                </div>
                <div className={styles.housecard1}>
                  <div className={styles.officecardChild} />
                  <img
                    className={styles.houseicon1}
                    alt=""
                    src="/houseicon-1@2x.png"
                  />
                  <b className={styles.offices}>Houses</b>
                </div>
                <div className={styles.officecard1}>
                  <div className={styles.officecardChild} />
                  <img
                    className={styles.workspaceicon1}
                    alt=""
                    src="/workspaceicon-1@2x.png"
                  />
                  <b className={styles.offices}>Offices</b>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.aestheticLine}>
            <div className={styles.divsecLine}>
              <div className={styles.spansecLine1} />
              <div className={styles.spansecLine2} />
            </div>
          </div>
        </div>
        <div
          className={styles.featuredSection}
          data-scroll-to="featuredSectionContainer"
        >
          <div className={styles.divcontainer2}>
            <div className={styles.divrow2}>
              <div className={styles.divcol1}>
                <div className={styles.divtitle12}>
                  <div className={styles.spanlabel4}>
                    <div className={styles.our}>Our</div>
                  </div>
                  <div className={styles.heading21}>
                    <b className={styles.featuredProperty}>Featured Property</b>
                  </div>
                  <div className={styles.separator5} />
                </div>
                <div className={styles.divslickSlider}>
                  <div className={styles.divslickList1}>
                    <div className={styles.divslickTrack}>
                      <div className={styles.divrow3}>
                        <div className={styles.divcolLg3}>
                          <div className={styles.divpropertyDetails}>
                            <div className={styles.gulshan}>GULSHAN</div>
                            <div className={styles.linkHeading3}>
                              <b className={styles.springWay}>Spring Way</b>
                              <div className={styles.spanh2d31803220margin}>
                                <div className={styles.spanlabel5}>
                                  <div className={styles.openHouse}>
                                    Open house
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className={styles.heading62}>
                              <div className={styles.bdt150000}>
                                BDT 1,50,000
                              </div>
                            </div>
                            <div className={styles.pfontRoboto}>
                              <i className={styles.nestledInOne}>
                                Nestled in one of Dhaka's most prestigious
                                neighborhoods, this palatial mansion boasts an
                                impressive façade with intricate architectural
                                details, making a statement of grandeur from the
                                moment you arrive. As you step inside, you are
                                greeted by a grand foyer adorned with sparkling
                                chandeliers and marble floors, setting the tone
                                for the extravagance that lies within.
                              </i>
                            </div>
                            <div className={styles.list4}>
                              <div className={styles.item16}>
                                <div className={styles.doubleBedsvg}>
                                  <img
                                    className={styles.doubleBedsvgIcon}
                                    alt=""
                                    src="/doublebedsvg.svg"
                                  />
                                </div>
                                <div className={styles.bed5}>Bed : 5</div>
                              </div>
                              <div className={styles.item17}>
                                <div className={styles.bathroomsvg}>
                                  <img
                                    className={styles.doubleBedsvgIcon}
                                    alt=""
                                    src="/bathroomsvg.svg"
                                  />
                                </div>
                                <div className={styles.baths}>Baths :</div>
                              </div>
                              <div className={styles.item18}>
                                <div className={styles.squareRulerToolsvg}>
                                  <img
                                    className={styles.doubleBedsvgIcon}
                                    alt=""
                                    src="/squarerulertoolsvg.svg"
                                  />
                                </div>
                                <div className={styles.baths}>Sq Ft : 5000</div>
                              </div>
                            </div>
                            <div className={styles.spanroundHalf}>
                              <div className={styles.pseudo2} />
                              <img
                                className={styles.svgIcon}
                                alt=""
                                src="/svg.svg"
                              />
                            </div>
                            <div className={styles.divpropertyBtn}>
                              <div className={styles.link18}>
                                <div className={styles.details}>Details</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={styles.divorderMd}>
                          <div className={styles.divfeatureImage}>
                            <div className={styles.heading45}>
                              <div className={styles.familyHome}>
                                FAMILY HOME
                              </div>
                            </div>
                            <div className={styles.spanboxColor} />
                            <div className={styles.spansignature}>
                              <img
                                className={styles.pngIcon}
                                alt=""
                                src="/1png@2x.png"
                              />
                            </div>
                            <div className={styles.spanlabel6}>
                              <b className={styles.featured}>Featured</b>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.button2}>
                    <div className={styles.symbol21}></div>
                  </div>
                  <div className={styles.button3}>
                    <div className={styles.symbol21}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.faqSection}>
          <img
            className={styles.faqSectionChild}
            alt=""
            src="/rectangle-123.svg"
            data-scroll-to="rectangle"
          />
          <div className={styles.accordionParent}>
            <div className={styles.accordion}>
              <div className={styles.text}>
                <div className={styles.titleChevron}>
                  <div className={styles.whatIsAircover} />
                  <img
                    className={styles.doubleBedsvgIcon}
                    alt=""
                    src="/medium1.svg"
                  />
                </div>
                <div className={styles.aircoverIsComprehensiveContainer}>
                  <p className={styles.payAsLittle}>
                    UrbanStay is your trusted partner in navigating the dynamic
                    and often challenging accommodation issues. With a team of
                    dedicated experts at your disposal, we are committed to
                    providing unparalleled support and guidance to ensure your
                    experience in the us is nothing short of extraordinary.
                  </p>
                  <p className={styles.payAsLittle}>&nbsp;</p>
                  <p className={styles.goToUrbanstay}>
                    Go to UrbanStay Home Page for more information.
                  </p>
                </div>
              </div>
              <div className={styles.accordionChild} />
            </div>
            <div className={styles.accordion1}>
              <div className={styles.item}>
                <div className={styles.titleChevron1}>
                  <div className={styles.whatIsAircover1}>
                    How do I cancel my reservation?
                  </div>
                  <img
                    className={styles.doubleBedsvgIcon}
                    alt=""
                    src="/medium1.svg"
                  />
                </div>
              </div>
              <div className={styles.accordionChild} />
            </div>
            <div className={styles.accordion2}>
              <div className={styles.item}>
                <div className={styles.titleChevron1}>
                  <div className={styles.whatIsAircover1}>
                    What if my host cancels my reservation?
                  </div>
                  <img
                    className={styles.doubleBedsvgIcon}
                    alt=""
                    src="/medium1.svg"
                  />
                </div>
              </div>
              <div className={styles.accordionChild} />
            </div>
            <div className={styles.accordion3}>
              <div className={styles.item}>
                <div className={styles.titleChevron1}>
                  <div className={styles.whatIsAircover1}>
                    How do I change the date of my reservation?
                  </div>
                  <img
                    className={styles.doubleBedsvgIcon}
                    alt=""
                    src="/medium1.svg"
                  />
                </div>
              </div>
              <div className={styles.accordionChild} />
            </div>
            <div className={styles.accordion4}>
              <div className={styles.item}>
                <div className={styles.titleChevron1}>
                  <div className={styles.whatIsAircover1}>
                    Editing, removing or adding payment method
                  </div>
                  <img
                    className={styles.doubleBedsvgIcon}
                    alt=""
                    src="/medium1.svg"
                  />
                </div>
              </div>
              <div className={styles.accordionChild} />
            </div>
            <div className={styles.accordion5}>
              <div className={styles.item}>
                <div className={styles.titleChevron1}>
                  <div className={styles.whatIsAircover1}>
                    What is the reimbursement policy of UrbanStay?
                  </div>
                  <img
                    className={styles.doubleBedsvgIcon}
                    alt=""
                    src="/medium1.svg"
                  />
                </div>
              </div>
              <div className={styles.accordionChild} />
            </div>
            <img
              className={styles.faqImgjpgIcon}
              alt=""
              src="/faqimgjpg@2x.png"
            />
            <div className={styles.divtitle13}>
              <div className={styles.spanlabel7}>
                <div className={styles.faq}>FAQ</div>
              </div>
              <b className={styles.welcomeToUrbanstay}>
                Welcome to UrbanStay Help Desk!
              </b>
              <div className={styles.separator6} />
            </div>
          </div>
          <img
            className={styles.priceBgpngIcon}
            alt=""
            src="/pricebgpng@2x.png"
          />
        </div>
        <div className={styles.stickyNavBar}>
          <div className={styles.whiterectangle} />
          <div className={styles.urbanstayParent}>
            <div className={styles.urbanstay2}>
              <span className={styles.urbanstayTxt}>
                <b>URBAN</b>
                <span className={styles.stay}>STAY</span>
              </span>
            </div>
            <img className={styles.image31} alt="" src="/image-3-11@2x.png" />
          </div>

       {/*  
        {
          visible ? (
            <div onClick={toggleLogin}>
              <Avatar {...stringAvatar(name)} />
            </div>
          ) : null 
        }
        */}


          <div className={styles.itemLinkParent}>
            <div className={styles.itemLink5} onClick={onItemLink5Click}>
              <b className={styles.home1}>HOME</b>
            </div>
            <div className={styles.itemLink6} onClick={onItemLink6Click}>
              <div className={styles.contactUs}>ExpLORE</div>
            </div>
            <div className={styles.itemLink7} onClick={onItemLink7Click}>
              <div className={styles.contactUs}>FEATURED</div>
            </div>
            <div className={styles.itemLink8} onClick={onItemLink8Click}>
              <div className={styles.contactUs}>TESTIMONIALS</div>
            </div>
            <div className={styles.itemLink9} onClick={onItemLink9Click}>
              <div className={styles.contactUs}>FAQ</div>
            </div>
            <div className={styles.itemLink10} onClick={onItemLink10Click}>
              <div className={styles.contactUs}>CONTACT US</div>
            </div>
          </div>


          { loggedIn && isGuest === 1 ? (

            <IconPopupForGuest topMargin = {23} name = {user_name} />

            ) :  !loggedIn ?  (
            
            <IconPopupSign topMargin = {23} />


            ) :  loggedIn && isGuest=== 0 ? (

            <IconPopup topMargin = {23} name = {user_name} />

            ) : null }


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
    </>
  );
};

export default LandingPage;