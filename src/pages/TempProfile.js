import { useState, useCallback } from "react";
import ProfileDetailsPopup from "../components/ProfileDetailsPopup";
import PortalPopup from "../components/PortalPopup";
import SignoutConfirmationPopup from "../components/SignoutConfirmationPopup";
import { useNavigate } from "react-router-dom";
import styles from "./TempProfile.module.css";
import { BarChart } from '@mui/x-charts/BarChart';

const TempProfile = () => {


  const [popup, setPopup] = useState(false);
  const toggle = () => {
    setPopup(!popup);
  };



  const [isProfileDetailsPopupOpen, setProfileDetailsPopupOpen] =
    useState(false);
  const [isSignoutConfirmationPopupOpen, setSignoutConfirmationPopupOpen] =
    useState(false);
  const navigate = useNavigate();

  const openProfileDetailsPopup = useCallback(() => {
    setProfileDetailsPopupOpen(true);
  }, []);

  const closeProfileDetailsPopup = useCallback(() => {
    setProfileDetailsPopupOpen(false);
  }, []);

  const onGroupContainer1Click = useCallback(() => {
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

  const onItemLink5Click = useCallback(() => {
    navigate("/mylistings");
  }, [navigate]);

  const onItemLink6Click = useCallback(() => {
    navigate("/myreservations");
  }, [navigate]);

  const onItemLink7Click = useCallback(() => {
    navigate("/mypastreservations");
  }, [navigate]);

  const onItemLink9Click = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <>
      <div className={styles.tempProfile}>
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
        <div className={styles.rentedVsCancelledParent}>
          <div className={styles.rentedVsCancelled}>Rented Vs Cancelled</div>
          <div className={styles.ratingsAsA}>Ratings as a host</div>
          <div className={styles.ratingsAsA1}>Ratings as a Guest</div>
          <div className={styles.rentedvccanceled} />
          <div className={styles.hostratingbreakdown} />
          <div className={styles.guestratingbreakdown} />
        </div>
        <div className={styles.totalEarnings}>Total Earnings</div>
        <div className={styles.divb9672i7}>
          <div className={styles.button}>
            <div className={styles.showAllReviews}>Show all reviews</div>
          </div>
        </div>
        <div className={styles.testimonialSection}>
          <div className={styles.h3}>Welcome to Your Profile, Mayeesha!</div>
        </div>
        <img className={styles.pseudoIcon} alt="" src="/pseudo2@2x.png" />
        <div className={styles.h31}>
          <p className={styles.thankYouForCreatingAnAcco}>
            <b>
              <span>{`Thank you for creating an account! `}</span>
            </b>
          </p>
          <p className={styles.blankLine}>
            <b>
              <span>&nbsp;</span>
            </b>
          </p>
          <p className={styles.weHaveSent}>
            We have sent an authentication code to your provided email. Kindly
            verify your account and set up a profile to start your journey with
            UrbanStay.
          </p>
        </div>
        <div
          className={styles.setupprofilebtn}
          onClick={openProfileDetailsPopup}
        >
          <button className={styles.setUpA}>{`Set up a Profile `}</button>
        </div>
        <div className={styles.earningGraphWrapper}>
          <div className={styles.earningGraph} >

          <BarChart
            xAxis={[
              {
                id: 'barCategories',
                data: ['Jan', 'Feb', 'Mar','Apr','May','June','Jul','Aug','Sept','Oct','Nov','Dec'],
                scaleType: 'band',
                label: "Months (2023)"
              },
            ]}
          
            series={[
              {
                data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              },
            ]}
            width={900}
            height={300}
          />

          </div>
        </div>
        <div className={styles.profileCardParent}>
          <div className={styles.profileCard}>
            <img className={styles.usericon} alt="" src="/usericon2@2x.png" />
            <div className={styles.mayeeshaMusarrat}>Mayeesha Musarrat</div>
            <div className={styles.profileCardChild} />
            <div className={styles.userjoin}>
              <img
                className={styles.solarcalendarOutlineIcon}
                alt=""
                src="/solarcalendaroutline1.svg"
              />
              <div className={styles.joinedOn18}>
                Joined on 18 September 2023
              </div>
            </div>
            <div className={styles.rating}>
              <img
                className={styles.ratingstarIcon}
                alt=""
                src="/ratingstar1.svg"
              />
              <div className={styles.stars}>{` 0 stars `}</div>
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
          <img
            onClick = {toggle}
            className={styles.profileIcon}
            alt=""
            src="/profile-icon@2x.png"
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

          <div className={styles.itemLinkParent}>
            <div className={styles.itemLink5} onClick={onItemLink5Click}>
              <div className={styles.reservations}>listings</div>
            </div>
            <div className={styles.itemLink6} onClick={onItemLink6Click}>
              <div className={styles.reservations}>Reservations</div>
            </div>
            <div className={styles.itemLink7} onClick={onItemLink7Click}>
              <div className={styles.reservations}>Past reservations</div>
            </div>
            <div className={styles.itemLink8}>
              <b className={styles.profile}>Profile</b>
            </div>
            <div className={styles.itemLink9} onClick={onItemLink9Click}>
              <div className={styles.reservations}>HOME</div>
            </div>
          </div>
        </div>
      </div>
      {isProfileDetailsPopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeProfileDetailsPopup}
        >
          <ProfileDetailsPopup onClose={closeProfileDetailsPopup} />
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
    </>
  );
};

export default TempProfile;
