import { useState, useCallback, useEffect } from "react";
import ReviewDetails from "../components/ReviewDetails";
import PortalPopup from "../components/PortalPopup";
import SignoutConfirmationPopup from "../components/SignoutConfirmationPopup";
import { useNavigate } from "react-router-dom";
import styles from "./ViewDetails.module.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import DateRangeSelector from "../components/DateRangeSelector";
import { useParams } from 'react-router-dom';

const ViewDetails = ({ onClose }) => {
  const { prop } = useParams();
  const decodedPropValueString = decodeURIComponent(prop);
  const propValue = JSON.parse(decodedPropValueString);

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

  const [isReviewDetailsPopupOpen, setReviewDetailsPopupOpen] = useState(false);
  const [isReviewDetailsPopup1Open, setReviewDetailsPopup1Open] =
    useState(false);
  const [isSignoutConfirmationPopupOpen, setSignoutConfirmationPopupOpen] =
    useState(false);
  const navigate = useNavigate();

  const onButtonContainer4Click = () => {
    console.log("here");
    if(storedValue) navigate("/confirm-reservation");
    else navigate("/sign-in-page");
  };

  const openReviewDetailsPopup = useCallback(() => {
    setReviewDetailsPopupOpen(true);
  }, []);

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
    navigate("/");
  }, [navigate]);

  return (
    <>
      <div className={styles.viewDetails}>
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
        <img
          className={styles.viewDetailsChild}
          alt=""
          src={propValue.imageUrl}
          data-scroll-to="rectangleImage"
        />
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
            <div className={styles.divc16f2viy}>
              <div className={styles.waterfront}>
                <div className={styles.waterfront1}>
                  <div className={styles.divi4wvyiymargin}>
                    <img
                      className={styles.frameIcon2}
                      alt=""
                      src="/frame2.svg"
                    />
                  </div>
                  <div className={styles.divh2dCca3e21b}>
                    <div className={styles.freeParkingOn}>Waterfront</div>
                  </div>
                </div>
              </div>
              <div className={styles.kitchen}>
                <div className={styles.diviikjzje}>
                  <div className={styles.divi4wvyiymargin}>
                    <img
                      className={styles.frameIcon2}
                      alt=""
                      src="/frame3.svg"
                    />
                  </div>
                  <div className={styles.divh2dB0e29d5f}>
                    <div className={styles.freeParkingOn}>Kitchen</div>
                  </div>
                </div>
              </div>
              <div className={styles.wifi}>
                <div className={styles.diviikjzje1}>
                  <div className={styles.divi4wvyiymargin}>
                    <img
                      className={styles.frameIcon2}
                      alt=""
                      src="/frame4.svg"
                    />
                  </div>
                  <div className={styles.divh2d5c91f47a}>
                    <div className={styles.freeParkingOn}>Wifi</div>
                  </div>
                </div>
              </div>
              <div className={styles.parking}>
                <div className={styles.diviikjzje2}>
                  <div className={styles.divi4wvyiymargin}>
                    <img
                      className={styles.frameIcon2}
                      alt=""
                      src="/frame5.svg"
                    />
                  </div>
                  <div className={styles.divh2d92060c83}>
                    <div className={styles.freeParkingOn}>
                      Free parking on premises
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.hotTub}>
                <div className={styles.diviikjzje3}>
                  <div className={styles.divi4wvyiymargin}>
                    <img
                      className={styles.frameIcon2}
                      alt=""
                      src="/frame6.svg"
                    />
                  </div>
                  <div className={styles.divh2dFbd87c70}>
                    <div className={styles.freeParkingOn}>Private hot tub</div>
                  </div>
                </div>
              </div>
              <div className={styles.tv}>
                <div className={styles.diviikjzje4}>
                  <div className={styles.divi4wvyiymargin}>
                    <img
                      className={styles.frameIcon2}
                      alt=""
                      src="/frame7.svg"
                    />
                  </div>
                  <div className={styles.divh2dEbcf5284}>
                    <div className={styles.freeParkingOn}>TV</div>
                  </div>
                </div>
              </div>
              <div className={styles.washer}>
                <div className={styles.diviikjzje5}>
                  <div className={styles.divi4wvyiymargin}>
                    <img
                      className={styles.frameIcon2}
                      alt=""
                      src="/frame8.svg"
                    />
                  </div>
                  <div className={styles.divh2d63128074}>
                    <div className={styles.freeParkingOn}>Washer</div>
                  </div>
                </div>
              </div>
              <div className={styles.dryer}>
                <div className={styles.diviikjzje6}>
                  <div className={styles.divi4wvyiymargin}>
                    <img
                      className={styles.frameIcon2}
                      alt=""
                      src="/frame9.svg"
                    />
                  </div>
                  <div className={styles.divh2d9f41df4e}>
                    <div className={styles.freeParkingOn}>Dryer</div>
                  </div>
                </div>
              </div>
              <div className={styles.ac}>
                <div className={styles.diviikjzje7}>
                  <div className={styles.divi4wvyiymargin}>
                    <img
                      className={styles.frameIcon2}
                      alt=""
                      src="/frame10.svg"
                    />
                  </div>
                  <div className={styles.divh2d8fa08396}>
                    <div className={styles.freeParkingOn}>Window AC unit</div>
                  </div>
                </div>
              </div>
              <div className={styles.cctv}>
                <div className={styles.diviikjzje8}>
                  <div className={styles.divi4wvyiymargin}>
                    <img
                      className={styles.frameIcon2}
                      alt=""
                      src="/frame11.svg"
                    />
                  </div>
                  <div className={styles.divh2d36b25a6b}>
                    <div className={styles.freeParkingOn}>
                      Security cameras on property
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.divb9672i7}>
              <div className={styles.button1}>
                <div className={styles.showAllAmenities}>
                  Show all amenities
                </div>
              </div>
            </div>
            <div className={styles.lineParent}>
              <div className={styles.groupChild} />
              <div className={styles.groupItem} />
              <img className={styles.usericon} alt="" src="/usericon3@2x.png" />
              <div className={styles.hostedByMayeeshaContainer}>
                <span className={styles.txt}>
                  <p className={styles.hostedByMayeeshaMusarrat}>
                    <span>
                      <span className={styles.hostedByMayeesha}>
                        hosted by mayeesha Musarrat
                      </span>
                    </span>
                  </p>
                  <p className={styles.joinedOn23September2023}>
                    <span>
                      <span>Joined on 23 September 2023</span>
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
                    18 nights in Amherst
                  </div>
                </div>
                <div className={styles.divYogt7o}>
                  <div className={styles.oct202023}>
                    Oct 20, 2023 - Nov 7, 2023
                  </div>
                </div>
              </div>




              <div className={styles.calendar} >

              <DateRangeSelector />


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
            </div>
            <div className={styles.divrk4wssy}>
              <img
                className={styles.divs197t1q2marginIcon}
                alt=""
                src="/divs197t1q2margin.svg"
              />
              <div className={styles.divr1lutz1s}>
                <div className={styles.div}>{propValue.rating}</div>
              </div>
              <div className={styles.spanh2dDc59958f}>
                <div className={styles.div}>·</div>
              </div>
              <div className={styles.link18}>
                <div className={styles.reviews}>{propValue.rating_num+' reviews'}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.ourBeautifullyDesigned}>
         {propValue.description}
        </div>
        <div className={styles.location} data-scroll-to="locationContainer">
          <div className={styles.mapPicture} />
          <div className={styles.whereYoullBe}>Where You’ll Be</div>
          <div className={styles.groupParent}>
            <img className={styles.groupIcon} alt="" src="/group-1991.svg" />
            <div className={styles.vectorParent}>
              <img className={styles.vectorIcon} alt="" src="/vector.svg" />
              <div className={styles.tampaksiringBaliIndonesia}>
                {propValue.address+', '+propValue.destination}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.divb9672i71}>
          <div className={styles.button1}>
            <div className={styles.showAllReviews}>Show all reviews</div>
          </div>
        </div>
        <div className={styles.divh2dCa0a0170}>
          <div className={styles.priceCard}>
            <div className={styles.div1fl88fo}>
              <div className={styles.divWgmchy}>
                <div className={styles.slicedPriceParent}>
                  <div className={styles.slicedPrice}>
                    <div className={styles.div2}>
                      <span className={styles.txt}>
                        <span className={styles.span}>{'$'+propValue.price}</span>
                        <span className={styles.span1}> </span>
                      </span>
                    </div>
                  </div>
                  <div className={styles.realPrice}>
                    <div className={styles.div3}>{'$'+propValue.price}</div>
                  </div>
                  <div className={styles.night}>night</div>
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
                                      10/20/2023
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
                                      11/7/2023
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
                                        2 guests
                                      </div>
                                    </div>
                                  </div>
                                  <div className={styles.divW149nr2}>
                                    <div className={styles.checkIn}>Guests</div>
                                  </div>
                                </div>
                                <img
                                  className={styles.divDdq2fyIcon}
                                  alt=""
                                  src="/div-ddq2fy.svg"
                                />
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
                    <div className={styles.reserve} >Reserve</div>
                  </div>




                </div>
              </div>
              <div className={styles.div1o0c7xj}>
                <div className={styles.youWontBe}>You won't be charged yet</div>
              </div>
              <div className={styles.priceCardPriceSection}>
                <div className={styles.section1}>
                  <div className={styles.perNightStayPrice}>
                    <div className={styles.x18Nights}>$180 x 18 nights</div>
                    <div className={styles.div6}>$3,237</div>
                  </div>
                  <div className={styles.cleaningFee}>Cleaning fee</div>
                  <div className={styles.div7}>$176</div>
                  <div className={styles.serviceFee}>Service fee</div>
                  <div className={styles.div8}>$344</div>
                  <div className={styles.div6q0vike}>
                    <div className={styles.div3u0me7}>
                      <div className={styles.span18x3iiu}>
                        <div className={styles.divh2dDaca06d3}>
                          <div className={styles.div}>{`Total  `}</div>
                        </div>
                      </div>
                      <div className={styles.span1qs94rc}>
                        <div className={styles.div}>$2,462</div>
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
          <div className={styles.div10}>4.5</div>
          <div className={styles.reviews1}>Reviews</div>
          <div className={styles.reviews2}>15 Reviews</div>
          <div className={styles.reviewframeChild} />
          <div className={styles.ratingpiechart} id="pi" />
          <div className={styles.barchart} id="pi" />
          <div
            className={styles.reviewcomponent}
            onClick={openReviewDetailsPopup}
          >
            <img className={styles.usericon1} alt="" src="/usericon@2x.png" />
            <div className={styles.mayeeshaMusarrat23SeptemberContainer}>
              <span className={styles.txt}>
                <p className={styles.mayeeshaMusarrat}>
                  <span>
                    <span className={styles.hostedByMayeesha}>
                      mayeesha Musarrat
                    </span>
                  </span>
                </p>
                <p className={styles.september2023}>23 September 2023</p>
              </span>
            </div>
            <div className={styles.asSoonAsContainer}>
              <span className={styles.txt}>
                <span>{`As soon as we arrived we were greeted by the villa staff so beautifully, as they put some flowers on our necks and welcoming drinks. Our stay was amazing we felt at peace. Also Agus and his wife made us wonderful welcoming dinner every bite was delicious. Thank you for the wonderful stay. `}</span>
                <span className={styles.seeMore}>See More</span>
              </span>
            </div>
          </div>
          <div
            className={styles.reviewcomponent1}
            onClick={openReviewDetailsPopup1}
          >
            <img className={styles.usericon1} alt="" src="/usericon@2x.png" />
            <div className={styles.mayeeshaMusarrat23SeptemberContainer}>
              <span className={styles.txt}>
                <p className={styles.mayeeshaMusarrat}>Sahil Rahman</p>
                <p className={styles.september2023}>3 October 2023</p>
              </span>
            </div>
            <div className={styles.asSoonAsContainer}>
              <span className={styles.txt}>
                <span>{`Excellent time we had here.we were a group of 8 people and Ramita along with her husband and Ganga had been super helpful.we felt right at home.I would definitely recommend it to any family or friends group.thanks guys 💯❤️. `}</span>
                <span className={styles.seeMore}>See More</span>
              </span>
            </div>
          </div>
          <img className={styles.reviewframeItem} alt="" src="/star-2.svg" />
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
          <img
            className={styles.profileIcon}
            alt=""
            src="/profile-icon@2x.png"
            onClick = {toggleLogin}
          />
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
              <div className={styles.contactUs}>HOME</div>
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
          <ReviewDetails onClose={closeReviewDetailsPopup} />
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
    </>
  );
};

export default ViewDetails;
