import React, { useState, useCallback, useEffect } from "react";
import {
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  TextField,
  InputAdornment,
  Icon,
  IconButton,
} from "@mui/material";
import SignoutConfirmationPopup from "../components/SignoutConfirmationPopup";
import PortalPopup from "../components/PortalPopup";
import { useNavigate } from "react-router-dom";
import styles from "./Browse.module.css";
import ViewDetails from "./ViewDetails";
import ReactDOM from 'react-dom';
import { format } from "date-fns";
import axios from 'axios';
import FilterPopup from "../components/FilterPopup";
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import IconPopupForGuest from '../components/IconPopupForGuest';
import IconPopup from '../components/IconPopup';
import IconPopupSign from '../components/IconPopupSign';

import Footer from '../components/Footer';


//============== PLEASE FIX THE POPUP ZINDEX ISSUES ========


const Browse = ({ onClose }) => {

  useEffect(() => {
    const localStorageValue = localStorage.getItem('PID');
    if (localStorageValue) {
      localStorage.removeItem('PID');
    }
  }, []);

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
        width: 30.55,
        height: 30.55,
        marginTop: 5.5,
        marginLeft: 179.99,
        position: 'relative',
        zIndex: 1,
      },
      children: `${name.split(' ')[0][0]}`,
    };
  }
  const [visible, setVisible] = useState(true);
  const isGuest = localStorage.getItem('GuestOrHost');



  const [dateShow, setDateShow] = useState("19 Oct, 2023 - 25 Oct, 2023");

  const name = localStorage.getItem('name');


  useEffect(() => {

    if (localStorage.getItem('name')) {

    }
    else {
      setVisible(false);
    }
  }, [name]);


  function formatDateDisplay(date, defaultText) {
    if (!date) return defaultText;
    return format(date, "d MMM, yyyy");
  }

  /******************************* FILTER POPUP ************************** */

  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };






  /***************** I am extracting the parameters to be sent to nodeJS backend **************/



  const propType = localStorage.getItem('proptype');
  const minPrice = localStorage.getItem('minprice');
  const maxPrice = localStorage.getItem('maxprice');
  const destination = localStorage.getItem('Destination');
  const rooms = localStorage.getItem('Rooms');
  const guests = localStorage.getItem('Guests');
  const datesCalendar = JSON.parse(localStorage.getItem('rangeValues'));
  const dates = {
    startDate: datesCalendar.from,
    endDate: datesCalendar.to,
   
  };
  let checkIn = new Date(dates.startDate);
  let checkOut = new Date(dates.endDate);
  checkIn = checkIn.toISOString().split('T')[0];
  checkOut = checkOut.toISOString().split('T')[0];

  const [resultCount, setResultCount] = useState(0);


  /**************************** End ***********************************************************/

  //  dates: `${checkin_date_result} - ${checkout_date_result}`,

  const [propertyData, setPropertyData] = useState([]);


  useEffect(() => {
    fetch(`http://localhost:5001/browse?destination=${destination}&checkIn=${checkIn}&checkOut=${checkOut}&rooms=${rooms}&guests=${guests}&proptype=${propType}&minprice=${minPrice}&maxprice=${maxPrice}`)
      .then(response => response.json())
      .then(data => {
        console.log("data: ", data);



        const formattedPropertyData = data.searchResults.map(result => ({

          PID: result.PID,
          imageUrl: result.pics,
          property_title: result.Property_title,
          guests_prop: result.Num_of_guests,
          rooms_prop: result.Num_of_rooms,
          bedrooms: result.Num_of_bedrooms,
          baths: result.Num_of_bathrooms,
          beds: result.Num_of_beds,
          description: result.description,
          destination: `${result.City}, ${result.Country}`,
          checkin_date_result: result.Check_in_date,
          checkout_date_result: result.Check_out_date,
          price: result.Price_per_night,
          rating: result.Avg_ratings,
          rating_num: result.Num_of_ratings,
          address: result.Address_line,
          area: result.Area,
          service_fee: result.service_fee,
          base_fee: result.base_fee

        }));

        setPropertyData(formattedPropertyData);

      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  const [selectedSortOption, setSelectedSortOption] = useState('default');


  useEffect(() => {

    const sortAndRenderCards = () => {
      let sortedData = [...propertyData];

      if (selectedSortOption === 'High to low price') {
        sortedData.sort((a, b) => b.price - a.price);
      }
      else if (selectedSortOption === 'Low to high price') {
        sortedData.sort((a, b) => a.price - b.price);
      }
      else if (selectedSortOption === 'Large to small area') {
        sortedData.sort((a, b) => b.area - a.area);
      }
      else if (selectedSortOption === 'Small to large area') {
        sortedData.sort((a, b) => a.area - b.area);
      }

      setPropertyData(sortedData);
    };

    sortAndRenderCards();
  }, [selectedSortOption]);



  const [isSignoutConfirmationPopupOpen, setSignoutConfirmationPopupOpen] =
    useState(false);
  const navigate = useNavigate();

  const onGroupContainer2Click = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onSignUpBtnClick = useCallback(() => {
    navigate("/leading-page");
  }, [navigate]);

  const storedValue = localStorage.getItem('email');
  const [loggedIn, setLoggedIn] = useState(storedValue);

  useEffect(() => {
    if (storedValue) {
      setLoggedIn(true);
    }
  }, [storedValue]);

  const [popupLogin, setPopupLogin] = useState(false);
  const toggleLogin = () => {
    setPopupLogin(!popupLogin);
  };

  console.log("popupLogin: ", popupLogin);

  /**************************** Open view-details page depending on the clicked component*******/
  const [selectedProperty, setSelectedProperty] = useState(null);

  const openPropertyFrame = (property) => {
    console.log("passed param: ", property);
    const prop = encodeURIComponent(JSON.stringify(property));
    navigate(`/view-details/${prop}`);
  };

  const closePropertyFrame = () => {
    setSelectedProperty(null);
  };

  const goHost = useCallback(() => {
    navigate("/hosting-intro");
  }, [navigate]);


  const onItemLink5Click = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='footerContainer']");
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  const onItemLink6Click = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='rectangle']");
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  const goProfile = useCallback(() => {
    navigate("/profile");
  }, [navigate]);

  const onItemLink8Click = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onSearchPropertyComponentContainerClick = useCallback(() => {
    navigate("/browse");
  }, [navigate]);

  const onBecomeHostBtnClick = useCallback(() => {
    navigate("/become-host");
  }, [navigate]);

  const openSignoutConfirmationPopup = useCallback(() => {
    setSignoutConfirmationPopupOpen(true);
  }, []);

  const closeSignoutConfirmationPopup = useCallback(() => {
    setSignoutConfirmationPopupOpen(false);
  }, []);

  const onSignInBtnClick = useCallback(() => {
    navigate("/sign-in-page");
  }, [navigate]);



  return (
    <>
      <div className={styles.browse}>
        <div className={styles.filterframeWrapper}>
          <div className={styles.filterframe}>
            <div className={styles.filterframeChild} />
            <div className={styles.filtersParent}>
              <button className={styles.filters} style={{ zIndex: 2000 }} onClick={openPopup} >Filters</button>
              <img className={styles.mifilterIcon} alt="" src="/mifilter.svg" />
            </div>
          </div>
        </div>

        {isPopupOpen && (
          <FilterPopup onClose={closePopup} />
        )}


        <div className={styles.sortByParent}>
          <div className={styles.sortBy}>Sort By</div>
          <FormControl className={styles.parent} sx={{ width: 298 }} variant="outlined">
            <Select
              onChange={(e) => setSelectedSortOption(e.target.value)}
              id="sort-select"
              color="info"
              size="small"
            >
              <MenuItem value="High to low price">High to low price</MenuItem>
              <MenuItem value="Low to high price">Low to high price</MenuItem>
              <MenuItem value="Large to small area">
                Large to small area
              </MenuItem>
              <MenuItem value="Small to large area">
                Small to large area
              </MenuItem>
            </Select>
            <FormHelperText />
          </FormControl>
        </div>



          <Footer />




        <div className={styles.somanypropertycardsFrame}>


        <Box>
            <Grid container spacing={0} columns={10}>
              {propertyData.map((property, index) => (
                <Grid key={index}>

                  <div className={styles.card} onClick={() => openPropertyFrame(property)}>
                    <img className={styles.imageIcon} src={property.imageUrl} alt="" />
                   
                    <div className={styles.locationDates}>
                      <div className={styles.info}>
                        <b className={styles.line1}>{property.property_title}</b>
                        <div className={styles.dates}>{property.destination}</div>
                        {<div className={styles.dates}>{formatDateDisplay(new Date(property.checkin_date_result)) + ' - ' + formatDateDisplay(new Date(property.checkout_date_result))}</div>}
                      </div>
                      <div className={styles.price}>
                        <div className={styles.dates}>
                          <b>BDT {property.price}</b>
                          <span> night</span>
                        </div>
                      </div>
                    </div>
                   
                   
                  </div>
                </Grid>
              ))}
            </Grid>
          </Box>



        </div>



        {loggedIn && isGuest ? (

          <IconPopupForGuest />

        ) : !loggedIn ? (

          <IconPopupSign topMargin={7} />


        ) : loggedIn && !isGuest ? (

          <IconPopup />

        ) : null}


        <div className={styles.showing647Places}>{"Showing " + propertyData.length + " Places"}</div>
        <div className={styles.browseChild} data-scroll-to="rectangle" />
        <div className={styles.stickyNavBar}>
          <div className={styles.whiterectangle} />
          <div className={styles.stickyNavBarChild} />
          <div
            className={styles.urbanstayParent}
            onClick={onGroupContainer2Click}
          >
            <div className={styles.urbanstay}>
              <span className={styles.urbanstayTxt}>
                <b>URBAN</b>
                <span className={styles.stay}>STAY</span>
              </span>
            </div>
            <img className={styles.image31} alt="" src="/image-3-11@2x.png" />
          </div>



          {/*   {
          visible ? (
            <div onClick={toggleLogin}>
              <Avatar {...stringAvatar(name)} />
            </div>
          ) : null 
        }
        */}




          <div className={styles.itemLinkParent}>
            <div className={styles.itemLink5} onClick={onItemLink5Click}>
              <div className={styles.contactUs}>CONTACT US</div>
            </div>
            <div className={styles.itemLink6} onClick={onItemLink6Click}>
              <div className={styles.contactUs}>FILTER</div>
            </div>
            <div className={styles.itemLink7}>
              <b className={styles.browse1}>BROWSE</b>
            </div>
            <div className={styles.itemLink8} onClick={onItemLink8Click}>
              <div className={styles.contactUs}>HOME</div>
            </div>
          </div>



          <form >
            <div className={styles.searchbarParent}>
              <div className={styles.searchbar}>

                <div
                  //  onClick={toggle}
                  className={styles.roomsAndGuestsSearchBar}

                  style={{
                    width: 282,
                    //  color: contentColor,
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    padding: 15,
                    fontFamily: 'Roboto',
                    fontSize: 'medium',
                  }}
                >

                </div>


                <div className={styles.reservationDates}
                  // onClick = {toggleCalender}
                  style={{
                    //  color: fontColor,
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    padding: 15,
                    fontFamily: 'Roboto',
                    fontSize: 'medium',
                  }}
                >

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
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}

                />
              </div>
              <img
                //  onClick={handleSubmit}
                className={styles.searchbuttonIcon}
                alt=""
                src="/searchbutton1.svg"
              />
            </div>
          </form>












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

export default Browse;