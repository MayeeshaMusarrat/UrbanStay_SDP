import { useState, useCallback, useEffect } from "react";
import { TextField, InputAdornment, Icon, IconButton } from "@mui/material";
import { Checkbox, FormControlLabel, Input, FormControl} from "@mui/material";
import SignoutConfirmationPopup from "../components/SignoutConfirmationPopup";
import PortalPopup from "../components/PortalPopup";
import { useNavigate } from "react-router-dom";
import styles from "./ConfirmListing.module.css";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import axios from 'axios';
import { setDayWithOptions } from "date-fns/fp";

const ConfirmListing = () => {

    
  const [popup, setPopup] = useState(false);

  const toggle = () => {
    setPopup(!popup);
  };


  const [propertyName, setPropertyName] = useState(null);
  const [propertyLocation, setPropertyLocation] = useState(null);

  let bprice = 0, scharge = 0;

  const email = localStorage.getItem('email');

  
  const [basePrice, setBasePrice] = useState(0);
  const [serviceCharge, setServiceCharge] = useState(0);

  const [totalPrice, setTotalPrice] = useState(0);
  
  const [myPrice, setMyPrice] = useState(null);
  const Property = JSON.parse(localStorage.getItem('Property'));
  const propertyURL = Property.pics;
  const [days, setDays] = useState(null);
 
  useEffect(() => {
   
    if (Property) {
      const { property_name,
        property_type,
        bedroom_count,
        bed_count,
        bathroom_count,
        room_count,
        guest_count,
        area,
        availability,
        description,
        country,
        state,
        zipcode,
        address_line,
        amenities,
        pics,
        pics_array } = Property;


        setPropertyName(property_name);
        setPropertyLocation(state+', '+country);

        const startDate = new Date(availability[0]);
        const endDate = new Date(availability[1]);

        console.log("end Date: ", endDate);
        const timeDiff = endDate - startDate;
        const daysDiff = Math.floor(timeDiff / (24*60*60*1000));
        setDays(daysDiff);

        const amenityBasePrices = {
           CCTV: 1,
           washer: 1,
           wifi: 2,
           parking: 3,
           waterfront: 1,
           hotTub: 2,
           TV: 1,
           workspace: 2,
           AC: 1
          };
    
          amenities.forEach(amenity => {
            if (amenityBasePrices[amenity]) {
              scharge += (5*amenityBasePrices[amenity]);
            }
          });

          bprice += (area*5);
          setTotalPrice(scharge + bprice);
          setBasePrice(bprice);
          setServiceCharge(scharge);

          console.log("Service charge: ", scharge);
    
    }


  }, []);



  // ====================================================================

  

  const handleSubmit = (e)=>{
    e.preventDefault();
    NotificationManager.success("Property is successfully hosted", "Success!", 3000);

    console.log("Here");
   
    
    const property = {
            property_title: Property.property_name,
            property_category: Property.property_type,
            bedroom_count: Property.bedroom_count,
            bed_count: Property.bed_count,
            bathroom_count: Property.bathroom_count,
            room_count: Property.room_count,
            guest_count: Property.guest_count,
            area: Property.area,
            availability: Property.availability,
            description: Property.description,
            country: Property.country,
            state: Property.state,
            zipcode: Property.zipcode,
            address_line: Property.address_line,
            amenities: Property.amenities,
            pics: Property.pics,
            pricePerNight: totalPrice, 
            email: email,
            base_price: basePrice,
            serviceCharge: serviceCharge,
            number_of_days: days,
            pics_array: Property.pics_array
            
           
    };
    
    
    fetch("http://localhost:5001/confirm-listing",{
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(property),
    }).then(result=>{
      
      if(result.status==200) {
       
       
        navigate("/mylistings");
      }
      else {
       
        console.log("oops");
      }
    })
  }





// ============================================================================









  const [isSignoutConfirmationPopupOpen, setSignoutConfirmationPopupOpen] =
    useState(false);
  const navigate = useNavigate();

  const onConfirmPaymentBtnContainerClick = useCallback(() => {
    navigate("/mylistings");
  }, [navigate]);

  const onGroupContainerClick = useCallback(() => {
    navigate("/");
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

  const onProfileBtnClick = useCallback(() => {
    navigate("/temp-profile");
  }, [navigate]);

  
 

  return (
    <>
    <form onSubmit={handleSubmit}> 
      <div className={styles.confirmListing}>
        <div className={styles.divb9672i7}>
          <div className={styles.button}>
            <div className={styles.showAllReviews}>Show all reviews</div>
          </div>
        </div>
        <div className={styles.pricecardpreview}>
          <div className={styles.pricecardpreviewChild} />
          <img
            className={styles.propertyimageIcon}
            alt=""
            src={propertyURL}
          />
          <div className={styles.neelOboni5th}>
           {propertyName}
          </div>
          <div className={styles.shahinbaghDhaka}>{propertyLocation}</div>
          <div className={styles.pricePerNightContainer}>
            <span className={styles.urbanstayTxt}>
              <span
                className={styles.pricePerNight}
              >{`Price per night: `}</span>
              <span>{totalPrice + ' BDT'}</span>
            </span>
          </div>
        </div>
        <b className={styles.basePriceFor}>Base Price for your property</b>
        <div className={styles.priceTable}>{`Price Table (per night) `}</div>
        <b className={styles.total}>Total</b>
        <div className={styles.basePrice}>Base price</div>
        <div className={styles.div}>{basePrice+ ' BDT'}</div>
        <div className={styles.div1}>{serviceCharge+ ' BDT'}</div>
        <div className={styles.serviceFee}>Service Fee</div>
        <b className={styles.b}>{totalPrice+ ' BDT'}</b>
       {/* <div className={styles.yourRevenue}>Your Revenue</div> */}
        <div
          className={styles.urbanstayFixesA}
        >{`UrbanStay fixes a base price of your property based on the amenities, service fee and location provided! You can always increase your revenue by filling up the form below. `}</div>
        <div className={styles.confirmListingChild} />
        <div className={styles.confirmListingItem} />
       
      {/*

          <FormControl variant="outlined" className={styles.confirmListingInner}  sx={{ width: 70 }}>

          <Input
            id="outlined-adornment-weight"
            endAdornment={<InputAdornment position="end">$</InputAdornment>}
            placeholder = "0"
            value = {myPrice}
            onChange = {handlePrice}
          />

          </FormControl>

  */}

        <div
          className={styles.confirmpaymentbtn}
        >
          <button className={styles.confirmListing1} type = "submit" >Confirm Listing</button>
        </div>
        <NotificationContainer/>
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
        <div className={styles.stickyNavBar}>
          <div className={styles.whiterectangle} />
          <div
            className={styles.urbanstayParent}
            onClick={onGroupContainerClick}
          >
            <div className={styles.urbanstay}>
              <span className={styles.urbanstayTxt}>
                <b>URBAN</b>
                <span className={styles.stay}>STAY</span>
              </span>
            </div>
            <img className={styles.image31} alt="" src="/image-3-1@2x.png" />
          </div>
          <img
            className={styles.profileIcon}
            alt=""
            src="/profile-icon1@2x.png"
            onClick={toggle}
          />


          {popup && (
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
              <button className={styles.accsettingsbtn} id="accSettings">
                <button className={styles.becomeAHost}>
                  {" "}
                  Account Settings
                </button>
              </button>
              <button className={styles.wishlistbtn} id="wishlist">
                <button className={styles.becomeAHost}> Wishlist</button>
              </button>
              <div className={styles.loginPopupWithLogoutGrpItem} />
              <button
                className={styles.signoutbtn}
                id="signOut"
                onClick={openSignoutConfirmationPopup}
              >
                <button className={styles.signOut}> Sign out</button>
              </button>
              <button
                className={styles.profilebtn}
                id="accSettings"
                onClick={onProfileBtnClick}
              >
                <button className={styles.becomeAHost}> Profile</button>
              </button>
            </div>
          </div>
           )}
          
        </div>

         
      </div>
      </form>
      
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

export default ConfirmListing;
