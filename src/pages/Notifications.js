import { useCallback } from "react";
import styles from "./Notifications.module.css";
import IconPopup from "../components/IconPopup";

const Notifications = () => {
  const onGroupContainerClick = useCallback(() => {
    // Please sync "LandingPage" to the project
  }, []);

  return (
    <div className={styles.notifications}>
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



      <IconPopup />


      <b className={styles.h3}>Notifications</b>

      

      <div className={styles.stickyNavBar}>
        <div className={styles.whiterectangle} />
        <div className={styles.urbanstayParent} onClick={onGroupContainerClick}>
          <div className={styles.urbanstay}>
            <span className={styles.urbanstayTxt}>
              <b>URBAN</b>
              <span className={styles.stay}>STAY</span>
            </span>
          </div>
          <img className={styles.image31} alt="" src="/image-3-1@2x.png" />
        </div>
      </div>
      <div className={styles.successnotif}>
        <div className={styles.confirmationnotif}>
          <img
            className={styles.confirmationnotifChild}
            alt=""
            src="/group-2013.svg"
          />
          <div className={styles.congratulationsYourPendingContainer}>
            <span className={styles.urbanstayTxt}>
              <p className={styles.congratulationsYourPending}>
                Congratulations! Your pending reservation has been approved.
              </p>
              <p className={styles.yourReservationApplied}>
                Your Reservation applied in 6 Oct, 2023 has been approved by the
                host. The property titled “Cozy Coop” located in Dhaka,
                Bangladesh has been reserved for 10 oct, 2023 - 15 oct, 2023.
                Enjoy!
              </p>
            </span>
          </div>
          <img className={styles.vectorIcon} alt="" src="/tick.svg" />
        </div>
      </div>
      <div className={styles.rejectionnotif}>
        <div className={styles.apologiesYourPendingContainer}>
          <span className={styles.urbanstayTxt}>
            <p className={styles.congratulationsYourPending}>
              Apologies! Your pending reservation has been Rejected.
            </p>
            <p className={styles.yourReservationApplied}>
              Your Reservation Applied in 6 Oct, 2023 has been Rejected by the
              host.
            </p>
          </span>
        </div>
        <img className={styles.vectorIcon1} alt="" src="/vector1.svg" />
      </div>
      <div className={styles.pendingnotif}>
        <div className={styles.knockKnockYouContainer}>
          <span className={styles.urbanstayTxt}>
            <p className={styles.congratulationsYourPending}>
              Knock knock! You have pending reservation requests!
            </p>
            <p className={styles.yourReservationApplied}>
              Your property “Cozy Coop” hosted on 13 Oct, 2023 has 3 Pending
              approvals.
            </p>
          </span>
        </div>
        <img className={styles.vectorIcon2} alt="" src="/vector2.svg" />
      </div>
    </div>
  );
};

export default Notifications;
