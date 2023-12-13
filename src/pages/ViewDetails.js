import { useState, useCallback, useEffect } from "react";
import ReviewDetails from "../components/ReviewDetails";
import PortalPopup from "../components/PortalPopup";
import SignoutConfirmationPopup from "../components/SignoutConfirmationPopup";
import { useNavigate } from "react-router-dom";
import styles from "./ViewDetails.module.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import DateRangeSelector from "../components/DateRangeSelector";
import { useParams } from 'react-router-dom';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';
import { format } from "date-fns";
import {Calendar} from "../components/Calendar";
import dayjs from "dayjs";
import PictureGallery from "./PictureGallery";
import { PinDrop } from "@mui/icons-material";
import GradeIcon from '@mui/icons-material/Grade';

import IconPopupForGuest from '../components/IconPopupForGuest';
import IconPopup from '../components/IconPopup';
import IconPopupSign from '../components/IconPopupSign';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

import Avatar from '@mui/material/Avatar';
import ReviewComponent from '../components/ReviewComponent';

import PropertyMap from './PropertyMap';

import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ChooseAmenities from "./ChooseAmenities";
import ShowAmenities from './ShowAmenities';
import { formatMeridiem } from "@mui/x-date-pickers/internals/utils/date-utils";
import axios from 'axios';
import Footer from '../components/Footer';
import StickyNode from 'react-stickynode';


const ViewDetails = ({ onClose }) => {
  const { prop } = useParams();
  const decodedPropValueString = decodeURIComponent(prop);
  const propValue = JSON.parse(decodedPropValueString);



  ///string avatar

  function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
   
    return color;
  }
  
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }
  


  //======

  const PID = propValue.PID;
  console.log("prop: ", propValue);

  localStorage.setItem('PID', PID);

  const [pic_array, setPicArray] = useState([]);

  /// =========================== REMEMBER: USE USEEFFECT TO FETCH RESERVED DATES, AMENITIES AND HOSTED BY ==============================
  useEffect(() => {
    fetch(`http://localhost:5001/view?PID=${PID}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("data: ", data);
  
        if (data.picResult && Array.isArray(data.picResult)) {
          const formattedPropertyData = data.picResult.map(result => ({
            URL: result.Picture_url,
          }));
  
          setPicArray(formattedPropertyData);
        } else {
          console.error('Data is not in the expected format.');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  
  const [amenities, setAmenities] = useState([]);
  const [loadingAm, setLoadingAm] = useState(true);
  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/getAmenities/${PID}`);
        setAmenities(response.data.searchResults);
        setLoadingAm(false);
      } catch (error) {
        console.error('Error fetching amenities:', error);
      }
    };

    fetchAmenities();
  }, [PID]);

  

  

  const [hostInfo, setHostInfo] = useState({
    hostName: '',
    joinedIn: '',
    contact: '',
    userPic: '',
    host_rating: '',
    host_description: '',
  });

  /*

  useEffect(() => {
    fetch(`http://localhost:5001/getHostAndAmenities/${PID}`)
      .then((response) => response.json())
      .then((data) => {
        const result = data.hostResults[0]; 
        const newHostInfo = {
          hostName: result.firstname + ' ' + result.lastname,
          joinedIn: new Date(result.joinedIn).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          }),
          contact: result.contact,
          userPic: result.userPic,
          host_rating: result.rating,
          host_description: result.description,
        };
        setHostInfo(newHostInfo);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [PID]); */


  const [amenitiesData, setAmenitiesData] = useState([]);
  
  useEffect(() => {
    fetch(`http://localhost:5001/getHostAndAmenities/${PID}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((fetchedData) => {
        if (fetchedData) {

          const combinedResults = {
            hostResults: fetchedData.hostResults,
            amenitiesResults: fetchedData.amenitiesResults,
          };

          const newHostInfo = {
            hostName: combinedResults.hostResults[0].firstname + ' ' + combinedResults.hostResults[0].lastname,
            joinedIn: new Date(combinedResults.hostResults[0].joinedIn).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            }),
            contact: combinedResults.hostResults[0].contact,
            userPic: combinedResults.hostResults[0].userPic,
            host_rating: combinedResults.hostResults[0].rating,
            host_description: combinedResults.hostResults[0].description,
          };

          setHostInfo(newHostInfo);
          setAmenitiesData(combinedResults.amenitiesResults);
          
        } else {
          console.error('Fetched data is not an array:', fetchedData);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [PID]);

  
  const [reviewData, setReviewData] = useState([]);
  const [propName, setPropName] = useState("");
  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [loading, setLoading] = useState(1);
  const [Overall, setOverall] = useState(0.0);
 

  useEffect(() => {
    fetch(`http://localhost:5001/getReviews/${PID}`)
      .then(response => response.json())
      .then(data => {
        
       
        const formattedReviewData = data.searchResults.map(result => ({
          
          accuracy: result.Accuracy_rating,
          cleanliness: result.Cleanliness_rating,
          comment: result.Comment,
          location: result.Location_rating,
          overall: result.Overall_rating,
          reception: result.Reception_rating,
          scenery: result.Scenery_rating,
          service: result.Service_rating,
          created: new Date(result.Review_Created).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          }),
          guestFirstname: result.Guest_First_name,
          guestFullName: result.Guest_First_name + " " + result.Guest_Last_name,
          guestRating: result.Guest_avg_rating,
          guestJoin: result.Guest_joining_date,
          guestDescription: result.Guest_description,
          guestPhone: result.Guest_contact,
          guestEmail: result.Guest_Email,
          guestPic: result.Guest_profile_pic,
          
        }));
        
        setReviewData(formattedReviewData);
        setOverall(formattedReviewData[0].overall);
      
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [PID]);


  useEffect(() => {
    fetch(`http://localhost:5001/getRatings/${PID}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((fetchedData) => {
        if (fetchedData) {

          const combinedResults = {
            pieResults: fetchedData.pieResults,
            barResults: fetchedData.barResults,
            propertyNameResults:  fetchedData.propertyNameResults
          }

            const barInfo = {
              scenery_1:  combinedResults.barResults[0].scenery_1_star,
              scenery_2: combinedResults.barResults[0].scenery_2_star,
              scenery_3: combinedResults.barResults[0].scenery_3_star,
              scenery_4: combinedResults.barResults[0].scenery_4_star,
              scenery_5: combinedResults.barResults[0].scenery_5_star,

              accuracy_1: combinedResults.barResults[0].accuracy_1_star,
              accuracy_2: combinedResults.barResults[0].accuracy_2_star,
              accuracy_3: combinedResults.barResults[0].accuracy_3_star,
              accuracy_4: combinedResults.barResults[0].accuracy_4_star,
              accuracy_5: combinedResults.barResults[0].accuracy_5_star,


              reception_1: combinedResults.barResults[0].reception_1_star,
              reception_2: combinedResults.barResults[0].reception_2_star,
              reception_3: combinedResults.barResults[0].reception_3_star,
              reception_4: combinedResults.barResults[0].reception_4_star,
              reception_5: combinedResults.barResults[0].reception_5_star,


              clean_1: combinedResults.barResults[0].cleanliness_1_star,
              clean_2: combinedResults.barResults[0].cleanliness_2_star,
              clean_3: combinedResults.barResults[0].cleanliness_3_star,
              clean_4: combinedResults.barResults[0].cleanliness_4_star,
              clean_5: combinedResults.barResults[0].cleanliness_5_star,

              service_1: combinedResults.barResults[0].service_1_star,
              service_2: combinedResults.barResults[0].service_2_star,
              service_3: combinedResults.barResults[0].service_3_star,
              service_4: combinedResults.barResults[0].service_4_star,
              service_5: combinedResults.barResults[0].service_5_star,

              location_1: combinedResults.barResults[0].location_1_star,
              location_2: combinedResults.barResults[0].location_2_star,
              location_3: combinedResults.barResults[0].location_3_star,
              location_4: combinedResults.barResults[0].location_4_star,
              location_5: combinedResults.barResults[0].location_5_star,
          };

          const pieInfo = {
            overall_point_5: combinedResults.pieResults[0].overall_point_5_start,
            overall_1_point_5: combinedResults.pieResults[0].overall_1_point_5_start,
            overall_2: combinedResults.pieResults[0].overall_2_start,
            overall_2_point_5: combinedResults.pieResults[0].overall_2_point_5_start,
            overall_3: combinedResults.pieResults[0].overall_3_start,
            overall_3_point_5: combinedResults.pieResults[0].overall_3_point_5_start,
            overall_4: combinedResults.pieResults[0].overall_4_start,
            overall_4_point_5: combinedResults.pieResults[0].overall_4_point_5_start,
            overall_5: combinedResults.pieResults[0].overall_5_start,
            overall_1: combinedResults.pieResults[0].overall_1_start,

          }

          console.log("combined: ", combinedResults);
          
          setPieData(pieInfo);
          setBarData(barInfo);
         // setIsLoading(false);
         
        } else {
          console.error('Fetched data is not an array:', fetchedData);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [PID]);

  

  const [review, setReviewDetails] = useState([]);




  const [selectedRange, setSelectedRange] = useState(null);
  const [initialMonthAndYear, setInitialMonthAndYear] = useState(dayjs());

  useEffect(() => {
    console.log(initialMonthAndYear);
  }, [initialMonthAndYear]);

  const datesCalendar = JSON.parse(localStorage.getItem('rangeValues'));
  const dates = {
    startDate: datesCalendar.from,
    endDate: datesCalendar.to,
  
  };
  const checkIn = new Date(dates.startDate);
  const checkOut = new Date(dates.endDate);

  const user_guests = localStorage.getItem('Guests');
  const user_rooms = localStorage.getItem('Rooms');

 
  const timeDiff = checkOut - checkIn;
  const daysDiff = (Math.floor(timeDiff / (24*60*60*1000))) + 1;
  


  function formatDateDisplay(date, defaultText) {
    if (!date) return defaultText;
    return format(date, "dd/MM/yyyy");
}


  function formatDateDisplayForEase(date, defaultText) {
    if (!date) return defaultText;
    return format(date, "dd MMM, yyyy");
  }

  const user_check_in = formatDateDisplay(checkIn);
  const user_check_out = formatDateDisplay(checkOut);

  const user_check_in_for_ease = formatDateDisplayForEase(checkIn);
  const user_check_out_for_ease = formatDateDisplayForEase(checkOut);

  const user_price_per_night = parseInt(propValue.price,10)*parseInt(daysDiff,10);


  const user_name = localStorage.getItem('name');


  /* pic chart stuff */
  const chartSetting = {
   
    width: 700,
    height: 300,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'rotate(-90deg) translate(0px, -10px)',
      },
    },
  };


  /// use useEffect and PID from propValue to fetch the amenities and show them in a list here!
  /// also do this for the reviews! 

  const dataset = [
    {
      five: barData.scenery_5,
      four: barData.scenery_4,
      three: barData.scenery_3,
      two: barData.scenery_2,
      one: barData.scenery_1,
      month: 'Scenery',
    },
    {
      five: barData.accuracy_5,
      four: barData.accuracy_4,
      three: barData.accuracy_3,
      two: barData.accuracy_2,
      one: barData.accuracy_1,
      month: 'Accuracy',
    },
    {
      five: barData.reception_5,
      four: barData.reception_4,
      three: barData.reception_3,
      two: barData.reception_2,
      one: barData.reception_1,
      month: 'Reception',
    },
    {
      five: barData.clean_5,
      four: barData.clean_4,
      three: barData.clean_3,
      two: barData.clean_2,
      one: barData.clean_1,
      month: 'Cleanliness',
    },
    {
      five: barData.location_5,
      four: barData.location_4,
      three: barData.location_3,
      two: barData.location_2,
      one: barData.location_1,
      month: 'Location',
    },
    {
      five: barData.service_5,
      four: barData.service_4,
      three: barData.service_3,
      two: barData.service_2,
      one: barData.service_1,
      month: 'Services',
    },
  ];
  


  const storedValue = localStorage.getItem('email');
  const [loggedIn, setLoggedIn] = useState(storedValue);

  const isGuest = localStorage.getItem('GuestOrHost');



  useEffect(() => {
    if (storedValue) {
      setLoggedIn(true);
    }
  }, [storedValue]);

  const [popupLogin, setPopupLogin] = useState(false);
  const toggleLogin = () => {
    setPopupLogin(!popupLogin);
  };

  const [isReviewDetailsPopupOpen, setReviewDetailsPopupOpen] = useState(false);
  const [isReviewDetailsPopup1Open, setReviewDetailsPopup1Open] =
    useState(false);
  const [isSignoutConfirmationPopupOpen, setSignoutConfirmationPopupOpen] =
    useState(false);
  const navigate = useNavigate();

  const [isChooseAmenityOpen, setChooseAmenityOpen] = useState(false);

  const onButtonContainer4Click = () => {
    console.log("here");
    if(storedValue) navigate("/confirm-reservation");
    else navigate("/sign-in-page");
  };

  
  const openChooseAmenitiesPopup = () => {
    setChooseAmenityOpen(true);
  }

  const closeChooseAmenities = () => {
    setChooseAmenityOpen(false);
  }
  const openReviewDetailsPopup = (review) => {
    console.log("openReviewDetailPopup: ", review);
    setReviewDetails(review);
    setReviewDetailsPopupOpen(true);
  };

  const closeReviewDetailsPopup = useCallback(() => {
    setReviewDetailsPopupOpen(false);
  }, []);

  const openReviewDetailsPopup1 = useCallback(() => {
    setReviewDetailsPopup1Open(true);
  }, []);

  const closeReviewDetailsPopup1 = useCallback(() => {
    setReviewDetailsPopup1Open(false);
  }, []);

  const onGroupContainer7Click = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onSignInBtnClick = useCallback(() => {
    navigate("/sign-in-page");
  }, [navigate]);

  const onBecomeHostBtnClick = useCallback(() => {
    navigate("/hosting-intro");
  }, [navigate]);

  const openSignoutConfirmationPopup = useCallback(() => {
    setSignoutConfirmationPopupOpen(true);
  }, []);

  const closeSignoutConfirmationPopup = useCallback(() => {
    setSignoutConfirmationPopupOpen(false);
  }, []);

  const onItemLink5Click = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='footerContainer']");
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  const onItemLink6Click = useCallback(() => {
    const anchor = document.querySelector(
      "[data-scroll-to='amenitySectionContainer']"
    );
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  const onItemLink7Click = useCallback(() => {
    const anchor = document.querySelector(
      "[data-scroll-to='divh2dFa20da93Container']"
    );
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  const onItemLink8Click = useCallback(() => {
    const anchor = document.querySelector(
      "[data-scroll-to='locationContainer']"
    );
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  const onItemLink9Click = useCallback(() => {
    const anchor = document.querySelector(
      "[data-scroll-to='reviewFrameContainer']"
    );
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  const onItemLink10Click = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='rectangleImage']");
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  const onItemLink11Click = useCallback(() => {
    navigate("/browse");
  }, [navigate]);


  const handleSubmit = (property) => {
    const propertyParam = encodeURIComponent(JSON.stringify(property));
    navigate(`/confirm-reservation/${propertyParam}`);
  };

  
  return (
    <>


      <div className={styles.viewDetails}>
        
       <Footer />



     

      
        

         <div className = {styles.imgList} style={{ marginTop: '120px',  marginRight: '65px',  marginLeft: '80px'}} > 
  
 
           <PictureGallery pictures = {pic_array} />
 
          </div>



        <div  className={styles.Calendar} style={{ marginTop: '870px',  marginRight: '65px',  marginLeft: '75px'}}>

        <Calendar
        initialRangeValuesProps={selectedRange}
        onRangeChange={(e) => setSelectedRange(e)}
        setOnRangeDateInScreen={(e) => setInitialMonthAndYear(e.start)}
        />

        </div>



        <div className={styles.divh2d91f33e72}>
          <div className={styles.heading1}>
          {propValue.property_title}
          </div>
        </div>
        <div className={styles.div88xxct}>
          <div className={styles.div1jdtwz4}>


            <div className={styles.divC2acbpmargin}>
              <div className={styles.button}>
                <div className={styles.div5kaapu}>
                  <div className={styles.span14tkmhrmargin}>
                    <img className={styles.frameIcon} alt="" src="/frame.svg" />
                  </div>
                  <div className={styles.share}>Share</div>
                </div>
              </div>
            </div>

            <div className={styles.divh2d611e11b6}>
              <div className={styles.buttonAddToWishlist}>
                <div className={styles.div5kaapu1}>
                  <div className={styles.span14tkmhrmargin}>
                    <img
                      className={styles.frameIcon}
                      alt=""
                      src="/frame1.svg"
                    />
                  </div>
                  <div className={styles.share}>Save</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.amenitySectionParent}>
          <div
            className={styles.amenitySection}
            data-scroll-to="amenitySectionContainer"
          >
            <div className={styles.heading2}>
              <div className={styles.amenities}>Amenities</div>
            </div>

            <div>
              {loadingAm ? (
                <p>Loading amenities...</p>
              ) : (
                <ul>
                  <p>


                  </p>

                  <p>

                    
                  </p>
                  {amenities.map((amenity) => (
                    <li key={amenity.id}>{amenity.Name}</li>
                  ))}
                </ul>
              )}
            </div>

          {/*   <ShowAmenities />
            
          {
            <div className={styles.divb9672i7}>
              <div className={styles.button1}>
                <div className={styles.showAllAmenities} onClick = {openChooseAmenitiesPopup}>
                  Choose Amenities
                </div>
              </div>
            </div>
          }
          */}
            <div className={styles.lineParent}>
              <div className={styles.groupChild} />
              <div className={styles.groupItem} />

              <Avatar
                alt={hostInfo.hostName}
                className = {styles.usericon}
                src={hostInfo.userPic}
                sx={{ width: 56, height: 56 }}
              />



              <div className={styles.hostedByMayeeshaContainer}>
                <span className={styles.txt}>
                  <p className={styles.hostedByMayeeshaMusarrat}>
                    <span>
                      <span className={styles.hostedByMayeesha}>
                        {"hosted by " + hostInfo.hostName}
                      </span>
                    </span>
                  </p>
                  <p className={styles.joinedOn23September2023}>
                    <span>
                      <span>{"Joined in " + hostInfo.joinedIn}</span>
                    </span>
                  </p>
                </span>
              </div>



              <div className={styles.fluentcall16RegularParent}>
                <img
                  className={styles.fluentcall16RegularIcon}
                  alt=""
                  src="/fluentcall16regular.svg"
                />
                <div className={styles.groupInner} />
                <div className={styles.contactHostWrapper}>
                  <button className={styles.contactHost}>Contact Host</button>
                </div>
              </div>
            </div>
          </div>
          <div
            className={styles.divh2dFa20da93}
            data-scroll-to="divh2dFa20da93Container"
          >
            <img
              className={styles.divNpr0qiIcon}
              alt=""
              src="/div-npr0qi.svg"
            />
            <div className={styles.divh2dE5412b81}>
              <div className={styles.divsewcpu6}>
                <div className={styles.sectionHeading2}>
                  <div className={styles.nightsInAmherst}>
                   { daysDiff + " nights in "+propValue.destination }
                  </div>
                </div>
                <div className={styles.divYogt7o}>
                  <div className={styles.oct202023}>
                   {user_check_in_for_ease + " - " + user_check_out_for_ease}
                  </div>
                </div>
              </div>




           









            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.orderedList}>
              <div className={styles.x18Nights}>{propValue.guests_prop + ' guests'}</div>
              <div className={styles.item16}>
                <div className={styles.bedrooms}> · {propValue.bedrooms + ' bedrooms'}</div>
              </div>
              <div className={styles.item17}>
                <div className={styles.bedrooms}>· {propValue.beds + ' beds'} </div>
              </div>
              <div className={styles.item18}>
                <div className={styles.bedrooms}>· {propValue.baths + ' baths'}</div>
              </div>
              <div className={styles.item19}>
                <div className={styles.bedrooms}>· {propValue.area + ' sq. feet'}</div>
              </div>


            </div>
            <div className={styles.divrk4wssy}>
              <img
                className={styles.divs197t1q2marginIcon}
                alt=""
                src="/divs197t1q2margin.svg"
              />
              <div className={styles.divr1lutz1s}>
                <span className={styles.div}>{Overall}</span>
              </div>
              <div className={styles.spanh2dDc59958f}>
                <div className={styles.div}>·</div>
              </div>

              
              <div className={styles.link18}>
                <span className={styles.reviews}>{reviewData.length +' reviews'}</span>
              </div>
              

            </div>
          </div>
        </div>
        <div className={styles.ourBeautifullyDesigned}>
         {propValue.description}
        </div>



        <div className={styles.location} data-scroll-to="locationContainer">



          <div className={styles.mapPicture} >

           
           <PropertyMap Address_line = {propValue.address} />

          </div>

     
          <div className={styles.whereYoullBe}>Where You’ll Be</div>
          <div className={styles.groupParent}>
           
            <div className={styles.vectorParent}>
             
              <LocationOnOutlinedIcon />

              <div className={styles.tampaksiringBaliIndonesia}>
                {propValue.address}
              </div>
            </div>
          </div>
        </div>



        <div className={styles.divh2dCa0a0170}>
          <div className={styles.priceCard}>
            <div className={styles.div1fl88fo}>
            
                <div className={styles.slicedPriceParent}>

                    <div className={styles.div3}>{'BDT '+propValue.price+ ' Night'}</div>
                  
                </div>
                <div className={styles.divP03egfmargin}>
                  <div className={styles.divP03egf}>
                    <div className={styles.divc3q2aui}>
                      <div className={styles.divr1el1iwjParent}>
                        <div className={styles.divr1el1iwj}>
                          <div className={styles.divBp34sw}>
                            <div className={styles.divcc9lcoh}>
                              <div className={styles.buttonChangeDatesCheckI}>
                                <div className={styles.div19y8o0j}>
                                  <div className={styles.divTekaj0}>
                                    <div className={styles.symbol}>
                                      {user_check_in}
                                    </div>
                                  </div>
                                  <div className={styles.divW149nr}>
                                    <div className={styles.checkIn}>
                                      Check-in
                                    </div>
                                  </div>
                                </div>
                                <div className={styles.div48vms8s}>
                                  <div className={styles.divTekaj01}>
                                    <div className={styles.symbol}>
                                      {user_check_out}
                                    </div>
                                  </div>
                                  <div className={styles.divW149nr1}>
                                    <div className={styles.checkIn}>
                                      Check-out
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className={styles.divfjvzknw} />
                            </div>
                          </div>
                        </div>
                        <div className={styles.divr1el1iwj1}>
                          <div className={styles.divBp34sw}>
                            <div className={styles.divcc9lcoh}>
                              <div className={styles.button3}>
                                <div className={styles.label}>
                                  <div
                                    className={
                                      styles.divguestpickerBookItTrigge
                                    }
                                  >
                                    <div className={styles.div1e5z145}>
                                      <div className={styles.symbol}>
                                        {user_guests + ' guests'}
                                      </div>
                                    </div>
                                  </div>
                                  <div className={styles.divW149nr2}>
                                    <div className={styles.checkIn}>Guests</div>
                                  </div>
                                </div>
                              
                              </div>
                              <div className={styles.divfjvzknw1} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={styles.button4}
                  onClick={onButtonContainer4Click} 
                >

                  <div className={styles.spanc9x5udt} >
                    <div className={styles.reserve} onClick={() => handleSubmit(propValue)} >Reserve</div>
                  </div>

                </div>
             
              <div className={styles.div1o0c7xj}>
                <div className={styles.youWontBe}>You won't be charged yet</div>
              </div>
              <div className={styles.priceCardPriceSection}>
                <div className={styles.section1}>
                  <div className={styles.perNightStayPrice}>
                    <div className={styles.x18Nights}>{"BDT "+propValue.price + " x " + daysDiff + " nights"}</div>
                    <div className={styles.div6}>{"BDT " + user_price_per_night}</div>
                  </div>
                  <div className={styles.cleaningFee}>Base fee</div>
                  <div className={styles.div7}>{"BDT " + propValue.base_fee}</div>
                  <div className={styles.serviceFee}>Service fee</div>
                  <div className={styles.div8}>{"BDT " + propValue.service_fee}</div>
                  <div className={styles.div6q0vike}>
                    <div className={styles.div3u0me7}>
                      <div className={styles.span18x3iiu}>
                        <div className={styles.divh2dDaca06d3}>
                          <div className={styles.div}>{`Total `}</div>
                        </div>
                      </div>
                      <div className={styles.span1qs94rc}>
                        <div className={styles.divTot}>{"BDT " + user_price_per_night}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div className={styles.divcbiapkd}>
            <div className={styles.button5}>
              <div className={styles.spanb3g8a7f}>
                <div className={styles.spaniziq4ykmargin}>
                  <img
                    className={styles.frameIcon12}
                    alt=""
                    src="/frame12.svg"
                  />
                </div>
                <div className={styles.share}>Report this listing</div>
              </div>
            </div>
          </div>
        </div>



        
        <div
          className={styles.reviewframe}
          data-scroll-to="reviewFrameContainer"
        >
        
          <span> 
          <div className={styles.div10}><GradeIcon />{Overall}</div>
            </span>
          <div className={styles.reviews1}>Reviews</div>
          <div className={styles.reviews2}>{reviewData.length + " Reviews"}</div>
          <div className={styles.reviewframeChild} />


          <div className={styles.ratingpiechart} id="pi" >

          <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: pieData.overall_5, label: '5 stars',  },
                    { id: 1, value: pieData.overall_4_point_5, label: '4.5 Stars' },
                    { id: 2, value: pieData.overall_4, label: '4 stars' },
                    { id: 3, value: pieData.overall_3_point_5, label: '3.5 stars' },
                    { id: 4, value: pieData.overall_3, label: '3 stars' },
                    { id: 5, value: pieData.overall_2_point_5, label: '2.5 stars' },
  
                    { id: 6, value: pieData.overall_2, label: '2 stars' },
                    { id: 7, value: pieData.overall_1_point_5, label: '1.5 stars' },
                    { id: 8, value: pieData.overall_1, label: '1 star' },
                    { id: 9, value: pieData.overall_point_5, label: '0.5 stars' },
                  ],
                  innerRadius: 30,
                  outerRadius: 100,
                  paddingAngle: 5,
                  cornerRadius: 5,
                  startAngle: -90,
                  endAngle: 180,
                  cx: 150,
                  cy: 95,
                },
              ]}
              width={500}
              height={200}
            />

          </div>





          <div className={styles.barchart} id="pi" >
            <BarChart
            dataset={dataset}
            xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
            series={[
              { dataKey: 'five', label: '5 Stars', stack:'A' }, //london ar paris eke onner upore ase! //london 5 star
              { dataKey: 'four', label: '4 Stars', stack:'A' },
              { dataKey: 'three', label: '3 Stars', stack: 'A' },
              { dataKey: 'two', label: '2 Stars',  stack: 'A' },
              { dataKey: 'one', label: '1 Star',  stack: 'A' }
            ]}
            
            {...chartSetting}
          />

          </div>



         <div className = {styles.somanyReviews} >
          {reviewData.length > 0 ? (
        reviewData.map((review, index) => (
          <div className={styles.reviewcomponent} >
          {review.guestPic ? (
          <Avatar
            alt={review.guestFullName}
            className={styles.usericon}
            src={review.guestPic}
            sx={{ width: 56, height: 56 }}
          />
        ) : (
          <Avatar
            alt="Default User"
            className={styles.usericon}
            {...stringAvatar(review.guestFullName)}
            
          />
        )}
          <div className={styles.mayeeshaMusarrat}>
            <span className={styles.urbanstayTxt}>
              <p className={styles.mayeeshaMusarrat1}>{review.guestFullName}</p>
            </span>
          </div>
          <div className={styles.nov2023}>{review.created}</div>
          <div className={styles.asSoonAsContainer}>
            <span className={styles.urbanstayTxt}>
              <span>{review.comment}  </span>
              <span className={styles.seeMore} onClick={() => openReviewDetailsPopup(review)} >
                See More
              </span>
            </span>
          </div>
          <div className={styles.ratingstar}>
            <Box
              sx={{
                '& > legend': { mt: 2 },
              }}
            >
              <Rating name="simple-controlled" readOnly precision = {0.5} value={review.overall} />
            </Box>
          </div>
        </div>
        ))
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '1200px' }}>
        <p>No reviews available.</p>
      </div>
      )}

      </div>
    


      </div>




      





        <div className={styles.stickyNavBar}>
          <div className={styles.whiterectangle} />
          <div
            className={styles.urbanstayParent}
            onClick={onGroupContainer7Click}
          >
            <div className={styles.urbanstay}>
              <span className={styles.txt}>
                <b>URBAN</b>
                <span className={styles.stay}>STAY</span>
              </span>
            </div>
            <img className={styles.image31} alt="" src="/image-3-11@2x.png" />
          </div>



          { loggedIn && isGuest==='1' ? (

            <IconPopupForGuest topMargin = {23} />

            ) :  !loggedIn ?  (

            <IconPopupSign topMargin = {23} />


            ) :  loggedIn && isGuest==='0' ? (

            <IconPopup topMargin = {23} name = {user_name} />

            ) : null }



          <div className={styles.itemLinkParent}>
            <div className={styles.itemLink5} onClick={onItemLink5Click}>
              <div className={styles.contactUs}>CONTACT US</div>
            </div>
            <div className={styles.itemLink6} onClick={onItemLink6Click}>
              <div className={styles.contactUs}>Amenities</div>
            </div>
            <div className={styles.itemLink7} onClick={onItemLink7Click}>
              <div className={styles.contactUs}>CALENDAR</div>
            </div>
            <div className={styles.itemLink8} onClick={onItemLink8Click}>
              <div className={styles.contactUs}>LOCATION</div>
            </div>
            <div className={styles.itemLink9} onClick={onItemLink9Click}>
              <div className={styles.contactUs}>REVIEWS</div>
            </div>
            <div className={styles.itemLink10} onClick={onItemLink10Click}>
              <b className={styles.photos}>Photos</b>
            </div>
            <div className={styles.itemLink11} onClick={onItemLink11Click}>
              <div className={styles.contactUs}>BROWSE</div>
            </div>
          </div>
        </div>
      </div>
      {isReviewDetailsPopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeReviewDetailsPopup}
        >
          <ReviewDetails onClose={closeReviewDetailsPopup} review = {review} />
        </PortalPopup>
      )}
      {isReviewDetailsPopup1Open && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeReviewDetailsPopup1}
        >
          <ReviewDetails onClose={closeReviewDetailsPopup1} />
        </PortalPopup>
      )}
      {isSignoutConfirmationPopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeSignoutConfirmationPopup}
        >
          <SignoutConfirmationPopup onClose={closeSignoutConfirmationPopup} />
        </PortalPopup>
      )}

      {isChooseAmenityOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeChooseAmenities}
        >
          <ChooseAmenities onClose={closeChooseAmenities} />
        </PortalPopup>
      )}


    </>
  );
};

export default ViewDetails;
