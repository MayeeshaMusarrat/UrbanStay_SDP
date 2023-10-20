import { useState, useCallback, useEffect } from "react";
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


const Browse = ({ onClose }) => {

  const [dateShow, setDateShow]  = useState("19 Oct, 2023 - 25 Oct, 2023");
  const [checkin, setCheckIn] = useState("");
  const [checkout, setCheckOut] = useState("");

  const openFrame = () => {
    navigate("/view-details");
  }


  const destination = localStorage.getItem('Destination');
  const rooms = localStorage.getItem('Rooms');
  const guests = localStorage.getItem('Guests');
  const datesCalendar = JSON.parse(localStorage.getItem('dateRange'));

 

  const [isSignoutConfirmationPopupOpen, setSignoutConfirmationPopupOpen] =
    useState(false);
  const navigate = useNavigate();

  const onGroupContainer2Click = useCallback(() => {
    navigate("/");
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

  const onItemLink8Click = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onSearchPropertyComponentContainerClick = useCallback(() => {
    navigate("/browse");
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

  const onSignInBtnClick = useCallback(() => {
    navigate("/sign-in-page");
  }, [navigate]);

  return (
    <>
      <div className={styles.browse}>
        <div className={styles.footer} data-scroll-to="footerContainer">
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
                          <div className={styles.itemLink}>
                            <div className={styles.ifaBrands}>
                              <div className={styles.symbol}></div>
                            </div>
                          </div>
                        </div>
                        <div className={styles.itemmargin}>
                          <div className={styles.itemLink1}>
                            <div className={styles.ifaBrands}>
                              <div className={styles.symbol}></div>
                            </div>
                          </div>
                        </div>
                        <div className={styles.itemmargin}>
                          <div className={styles.itemLink2}>
                            <div className={styles.ifaBrands}>
                              <div className={styles.symbol}></div>
                            </div>
                          </div>
                        </div>
                        <div className={styles.itemmargin}>
                          <div className={styles.itemLink3}>
                            <div className={styles.ifaBrands}>
                              <div className={styles.symbol}></div>
                            </div>
                          </div>
                        </div>
                        <div className={styles.itemmargin}>
                          <div className={styles.itemLink4}>
                            <div className={styles.ifaBrands}>
                              <div className={styles.symbol}></div>
                            </div>
                          </div>
                        </div>
                        <div className={styles.item}>
                          <div className={styles.itemLink1}>
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
                          <div className={styles.listings}>Listings</div>
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
        <div className={styles.filterframeWrapper}>
          <div className={styles.filterframe}>
            <div className={styles.filterframeChild} />
            <div className={styles.filtersParent}>
              <button className={styles.filters}>Filters</button>
              <img className={styles.mifilterIcon} alt="" src="/mifilter.svg" />
            </div>
          </div>
        </div>



        <div className={styles.somanypropertycardsFrame} onClick = {openFrame}>
          <div className={styles.card}>
            <img className={styles.imageIcon} alt="" src="/image@2x.png" />
            <img className={styles.heartIcon} alt="" src="/heart.svg" />
            <div className={styles.locationDates}>
              <div className={styles.info}>
                <b className={styles.line1}>Groveland, California</b>
                <div className={styles.dates}>Yosemite National Park</div>
                <div className={styles.dates}>Oct 23 - 28</div>
              </div>
              <div className={styles.price}>
                <div className={styles.dates}>
                  <b>$289</b>
                  <span> night</span>
                </div>
              </div>
            </div>
            <div className={styles.star}>
              <img className={styles.starChild} alt="" src="/star-1.svg" />
              <div className={styles.dates}>4.91</div>
            </div>
            <img className={styles.ellipsesIcon} alt="" src="/ellipses.svg" />
            <div className={styles.superhostBadge}>
              <div className={styles.superhost}>Superhost</div>
            </div>
          </div>
        </div>








        

        
        <div className={styles.sortByParent}>
          <div className={styles.sortBy}>Sort By</div>
          <FormControl
            className={styles.parent}
            sx={{ width: 298 }}
            variant="outlined"
          >
            <InputLabel color="info" />
            <Select color="info" size="small">
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
        <div className={styles.showing647Places}>Showing 1 Place</div>
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
          <img
            className={styles.profileIcon}
            alt=""
            src="/profile-icon@2x.png"
            onClick = {toggleLogin}
          />
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
          <div
            className={styles.searchPropertyComponent}
            onClick={onSearchPropertyComponentContainerClick}
          >
            <div className={styles.searchbarParent}>
              <div className={styles.searchbar}>
                <TextField
                  className={styles.roomsAndGuestsSearchBar}
                  color="info"
                  placeholder="2 Rooms, 1 Guest"
                  fullWidth={true}
                  sx={{ width: 282 }}
                  variant="outlined"
                  multiline
                />
                <div className={styles.reservationDates} />
                <TextField
                  className={styles.destination}
                  color="info"
                  size="medium"
                  placeholder="Enter Destination"
                  fullWidth={true}
                  variant="outlined"
                  type="text"
                />
              </div>
              <img
                className={styles.searchbuttonIcon}
                alt=""
                src="/searchbutton.svg"
              />
            </div>
          </div>
          <div className={styles.roomsAndGuestsPopup}>
            <div className={styles.roomandguestrectangle}>
              <div className={styles.roomandguestrectangleChild} />
              <button className={styles.roomframe}>
                <button className={styles.rooms}>Rooms</button>
              </button>
              <div className={styles.roomplusminus}>
                <button className={styles.roomcounterframe}>
                  <button className={styles.button}>1</button>
                </button>
                <button className={styles.minussign}>
                  <div className={styles.minussignChild} />
                  <img
                    className={styles.mdiLightminusIcon}
                    alt=""
                    src="/mdilightminus.svg"
                  />
                </button>
                <button className={styles.plussign} id="plusRooms">
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
                  <button className={styles.button1}>1</button>
                </button>
                <button className={styles.minussign1} id="minusGuests">
                  <div className={styles.plusrectangle} />
                  <img
                    className={styles.mdiLightminusIcon}
                    alt=""
                    src="/mdilightminus.svg"
                  />
                </button>
                <button className={styles.plussign} id="plusGuests">
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
                  <button className={styles.cancel}>Cancel</button>
                </button>
                <button className={styles.confirmbtn} id="confirm">
                  <button className={styles.cancel}>Confirm</button>
                </button>
              </div>
            </div>
          </div>


          { loggedIn && popupLogin ? (

          <div className={styles.signinPopupWithSignout}>
            <div className={styles.loginPopupWithLogoutGrp}>
              <div className={styles.loginPopupWithLogoutGrpChild} />
              <button
                className={styles.becomehostbtn}
                id="BecomeHost"
                onClick={onBecomeHostBtnClick}
              >
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
          ) : popupLogin ?  (
            <div className={styles.signinPopupWithoutSignout}>
            <div className={styles.loginPopupWithoutLogoutGrp}>
              <div className={styles.loginPopupWithoutLogoutGrpChild} />
              <button
                className={styles.signinbtn}
                id="signin"
                onClick={onSignInBtnClick}
              >
                <button className={styles.signIn}> Sign In</button>
              </button>
              <button className={styles.signupbtn} id="signUp">
                <button className={styles.signUp}>{`    Sign up `}</button>
              </button>
            </div>
          </div>
          ) : (
            null
          )}




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
