import { useState, useCallback } from "react";
import SignoutConfirmationPopup from "../components/SignoutConfirmationPopup";
import PortalPopup from "../components/PortalPopup";
import { useNavigate } from "react-router-dom";
import styles from "./ConfirmReservation.module.css";
import { useParams } from 'react-router-dom';


const ConfirmReservation = () => {

  const { propertyParam } = useParams();
  const decodedPropValueString = decodeURIComponent(propertyParam);
  const propValue = JSON.parse(decodedPropValueString);
  
  const [popup, setPopup] = useState(false);

  const toggle = () => {
    setPopup(!popup);
  };

  const [isSignoutConfirmationPopupOpen, setSignoutConfirmationPopupOpen] =
    useState(false);
  const navigate = useNavigate();

  const onConfirmPaymentBtnContainerClick = useCallback(() => {
    navigate("/myreservations");
  }, [navigate]);

  const onGroupContainer5Click = useCallback(() => {
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


  const handleSubmit = (e) => {
    e.preventDefault();
    const em = localStorage.getItem('email');
    const reserveProperty = {
      PID: propValue.PID,
      checkin: propValue.checkin_date_result,
      checkout:propValue.checkout_date_result,
      email: em
    };

    fetch("http://localhost:5001/confirm-reservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reserveProperty),
    })
      .then((response) => {
        if (response.status === 200) {
          navigate("/myReservations");
          return response.json();
        } 
      })
      .catch((error) => {
        console.log("Error occurred:", error);
      
      });
  };












  return (
    <>
    <form> 
      <div className={styles.confirmReservation}>
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
        <div className={styles.divb9672i7}>
          <div className={styles.button}>
            <div className={styles.showAllReviews}>Show all reviews</div>
          </div>
        </div>
        <b className={styles.h3}>Confirm and Pay</b>
        <div className={styles.h31}>Your Trip</div>
        <div className={styles.h32}>Pay with</div>
        <div className={styles.h3Parent}>
          <div className={styles.h33}>Dates</div>
          <div className={styles.h34}>Oct 7-10</div>
        </div>
        <div className={styles.h3Group}>
          <div className={styles.h35}>Rooms</div>
          <div className={styles.h36}>{propValue.rooms_prop + ' Rooms'}</div>
        </div>
        <div className={styles.h3Container}>
          <div className={styles.h37}>Guests</div>
          <div className={styles.h38}>{propValue.guests_prop + ' Guests'}</div>
        </div>
        <div className={styles.confirmReservationChild} />
        <div className={styles.confirmReservationItem} />
        <img className={styles.image4Icon} alt="" src="/image-4@2x.png" />
        <img className={styles.image5Icon} alt="" src="/image-5@2x.png" />
        <div
          className={styles.confirmpaymentbtn}
          onClick={onConfirmPaymentBtnContainerClick}
        >
          <button className={styles.confirmAndPay} type = "submit" onClick = {handleSubmit} >Confirm and Pay </button>
        </div>
        <div className={styles.card}>
          <div className={styles.rectangleParent}>
            <div className={styles.groupChild} />
            <div className={styles.line28Parent}>
              <div className={styles.line28}>500 x 5 nights</div>
              <div className={styles.line33}>Total (BDT)</div>
              <div className={styles.line34}>{'BDT '+propValue.price}</div>
              <div className={styles.groupItem} />
              <div className={styles.line30}>Cleaning fee</div>
              <div className={styles.line31}>Service fee</div>
              <div className={styles.line24}>$2,500</div>
              <div className={styles.line26}>$200</div>
              <div className={styles.line27}>$0</div>
              <div className={styles.line23}>Price details</div>
            </div>
            <div className={styles.groupInner} />
            <div className={styles.priceWrapper}>
              <div className={styles.price}>
                <div className={styles.starPrice}>
                  <img
                    className={styles.starPriceChild}
                    alt=""
                    src="/star-1.svg"
                  />
                  <div className={styles.div}>{propValue.rating}</div>
                </div>
                <div className={styles.reviews}>{'('+propValue.rating_num+' reviews)'}</div>
              </div>
            </div>
            <div className={styles.line21}>
              {propValue.property_title}
            </div>
        
            <img
              className={styles.rectangleIcon}
              alt=""
              src={propValue.imageUrl}
            />
          </div>
        </div>
        <div className={styles.stickyNavBar}>
          <div className={styles.whiterectangle} />
          <div
            className={styles.urbanstayParent}
            onClick={onGroupContainer5Click}
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
            onClick = {toggle}
          />

 
          { popup && (
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
    </form>
    </>
  );
};

export default ConfirmReservation;
