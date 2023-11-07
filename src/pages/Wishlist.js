import { useCallback } from "react";
import styles from "./Notifications.module.css";
import IconPopup from "../components/IconPopup";

const Wishlist = () => {
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


      <b className={styles.h3}>Wishlist</b>

      

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
     


    
    </div>
  );
};

export default Wishlist;
