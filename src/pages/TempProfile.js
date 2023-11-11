import { useState, useCallback, useEffect } from "react";
import ProfileDetailsPopup from "../components/ProfileDetailsPopup";
import PortalPopup from "../components/PortalPopup";
import SignoutConfirmationPopup from "../components/SignoutConfirmationPopup";
import { useNavigate } from "react-router-dom";
import styles from "./TempProfile.module.css";
import { BarChart } from '@mui/x-charts/BarChart';

import IconPopupForGuest from '../components/IconPopupForGuest';
import IconPopup from '../components/IconPopup';

const TempProfile = () => {

  const [isGuest, setIsGuest] = useState(false);
  const hostOrGuest = localStorage.getItem('GuestOrHost');

  useEffect(() => {
      if (hostOrGuest) {
        setIsGuest(true);
      }
      else
      {
        setIsGuest(false);
      }
    }, [hostOrGuest]);

  const [popup, setPopup] = useState(false);
  const toggle = () => {
    setPopup(!popup);
  };
 
  const email = localStorage.getItem('email');

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5001/temp-profile?email=${email}`)
      .then(response => response.json())
      .then(data => {
        
        console.log("data from js page");
        console.log("data: ",data);
          
        const formattedUserData = data.searchResults.map(result => ({
          

          userName :  `${result.First_name} ${result.Last_name}`, /**/
          joinDate: new Date(result.Joining_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            
            
          }),
          description : result.description,
          city : result.City,
          country : result.Country,
          livesIn: `${result.City}, ${result.Country}`
          
        }));
        
        setUserData(formattedUserData);

        const desc= result.description;
        const city=result.City;
        const country = result.Country;


        
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const userName = userData.length > 0 ? userData[0].userName : '';
  const joinDate = userData.length > 0 ? userData[0].joinDate : '';
  const livesIn = userData.length > 0 ? userData[0].livesIn : '';
  const description = userData.length > 0 ? userData[0].description : '';
  const city = userData.length > 0 ? userData[0].city : '';
  const country = userData.length > 0 ? userData[0].country : '';

  localStorage.setItem('Description', description);
  localStorage.setItem('City', city);
  localStorage.setItem('Country', country); 

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
          <div className={styles.h3}>Welcome to Your Profile, {userName}!</div>
        </div>
        <img className={styles.pseudoIcon} alt="" src="/pseudo2@2x.png" />
        <div className={styles.h31}>
          <p className={styles.thankYouForCreatingAnAcco}>
            <b>
              <span>{`About me `}</span>
            </b>
          </p>
          <p className={styles.blankLine}>
            <b>
              <span>&nbsp;</span>
            </b>
          </p>
          <p className={styles.weHaveSent}>
          <div className={styles.weHaveSent}>{description}</div>
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
            <img className={styles.usericon} alt="" src="/usericon1@2x.png" />
            <div className={styles.userName}>{userName}</div>
            <div className={styles.profileCardChild} />
            <div className={styles.userjoin}>
              <img
                className={styles.solarcalendarOutlineIcon}
                alt=""
                src="/solarcalendaroutline.svg"
              />
              <div className={styles.joinedOn18}>
              <div className={styles.joinedOn18}>Joined on {joinDate}</div>
              </div>
            </div>
            <div className={styles.rating}>
              <img
                className={styles.ratingstarIcon}
                alt=""
                src="/ratingstar.svg"
              />
              <div className={styles.stars}>{` 0 stars `}</div>
            </div>
            <div className={styles.userlocation}>
              <img
                className={styles.carbonlocationIcon}
                alt=""
                src="/carbonlocation.svg"
              />
              <div className={styles.livesInDhaka}>
              <div className={styles.livesInDhaka}>Lives in {livesIn}</div>
              </div>
            </div>
            
          </div>
          <div className={styles.verifiedemail}>
            <div className={styles.verifiedEmail}>Verified Email</div>
            <img className={styles.charmtickIcon} alt="" src="/charmtick.svg" />
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


          { isGuest ? (

          <IconPopupForGuest topMargin = {20} />

          ) : !isGuest ? (

          <IconPopup topMargin = {6} />

          ) : null } 

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