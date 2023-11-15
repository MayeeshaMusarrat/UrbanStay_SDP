import { useCallback, useState, useEffect } from "react";
import { TextField } from "@mui/material";
import styles from "./GivePropertyReview.module.css";
import { useNavigate } from "react-router-dom";
import RatingStar from '../Chips/ratingStar';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const GivePropertyReview = () => {
  const navigate = useNavigate();
  const onGroupContainerClick = useCallback(() => {
    navigate("/");
  }, []);

  const goPastReservation = useCallback(() => {
    navigate("/mypastreservations");
  }, []);

  const labels = {
    0.5: 'Not Worth',
    1: 'Very Poor',
    1.5: 'Poor',
    2: 'Fairly Satisfactory',
    2.5: 'Satisfactory',
    3: 'Fairly Good',
    3.5: 'Good',
    4: 'Very Good',
    4.5: 'Excellent',
    5: 'Extraordinary!',
  };

  const [loading, setLoading] = useState(1);

  const [sceneryValue, setSceneryValue] = useState(0);
  const [locationValue, setLocationValue] = useState(0);
  const [accuracyValue, setAccuracyValue] = useState(0);
  const [receptionValue, setReceptionValue] = useState(0);
  const [serviceValue, setServiceValue] = useState(0);
  const [cleanValue, setCleanValue] = useState(0);
  const [overallValue, setOverallValue] = useState(0);
  
  const handleSceneryChange = (event, newValue) => {
    setSceneryValue(newValue);
    console.log("Scenery: ",newValue);
  };
  
  const handleLocationChange = (event, newValue) => {
    setLocationValue(newValue);
    console.log("Location: ",newValue);
  };

  
  const handleAccuracyChange = (event, newValue) => {
    setAccuracyValue(newValue);
    console.log("Accuracy: ",newValue);
  };

  
  const handleReceptionChange = (event, newValue) => {
    setReceptionValue(newValue);
    console.log("Reception: ",newValue);
  };

  
  const handleServiceChange = (event, newValue) => {
    setServiceValue(newValue);
    console.log("Service: ",newValue);
  };

  
  const handleCleanChange = (event, newValue) => {
    setCleanValue(newValue);
    console.log("Cleanliness: ",newValue);
  };

  useEffect(() => {
    const calculatedOverallValue =
    (sceneryValue + locationValue + accuracyValue + receptionValue + serviceValue + cleanValue) / 6;
    const roundedOverallValue = Math.ceil(calculatedOverallValue * 2) / 2;
    setOverallValue(roundedOverallValue);
    console.log("calculated: ", calculatedOverallValue);
    console.log("roundedOverallValue: ", roundedOverallValue);
    console.log("Overall: ", overallValue);
  }, [sceneryValue, locationValue, accuracyValue, receptionValue, serviceValue, cleanValue]);


  

  return (
    <div className={styles.givepropertyreview}>
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
      <div className={styles.reservationheadingParent}>
        <b className={styles.reservationheading}>{`> Review for PropName`}</b>
        <b className={styles.reservationheading1} onClick = {goPastReservation} >Past Reservations</b>
      </div>
      <TextField
        className={styles.reviewbox}
        color="info"
        rows={3}
        required={true}
        fullWidth={true}
        sx={{ width: 907 }}
        variant="outlined"
        multiline
      />
      <div className={styles.frame}>
        <div className={styles.leaveAReview}>Leave a review!</div>
      </div>
      <div className={styles.rateThePropertyParent}>
        <div className={styles.rateTheProperty}>Rate the property!</div>
        <div className={styles.sceneryParent}>
          <div className={styles.scenery}>Scenery</div>
          <div className={styles.sceneryrating} > 
          <Box
           sx={{
              '& > legend': { mt: 2 },
            }}
          >
            <Rating
              name="simple-controlled"
              onChange = {handleSceneryChange}
              //value={value}
              size="large"
            />
    
          </Box>
     </div>
        </div>
        <div className={styles.locationParent}>
          <div className={styles.location}>Location</div>
          <div className={styles.locationrating} >  
          <Box
          sx={{
            '& > legend': { mt: 2 },
          }}
        >
          <Rating
            name="simple-controlled"
            onChange = {handleLocationChange}
            size="large"
          />
        
        </Box>
          
          </div>
        </div>
        <div className={styles.accuracyParent}>
          <div className={styles.accuracy}>Accuracy</div>
          <div className={styles.sceneryrating} > 
          <Box
           sx={{
              '& > legend': { mt: 2 },
            }}
          >
            <Rating
              name="simple-controlled"
              onChange = {handleAccuracyChange}
              size="large"
            />
    
          </Box>
          
           </div>
        </div>
        <div className={styles.receptionParent}>
          <div className={styles.reception}>Reception</div>
          <div className={styles.receptionrating} > 
          <Box
           sx={{
              '& > legend': { mt: 2 },
            }}
          >
            <Rating
              name="simple-controlled"
              onChange = {handleReceptionChange}
              size="large"
            />
    
          </Box>
          
          </div>
        </div>
        <div className={styles.cleanlinessParent}>
          <div className={styles.cleanliness}>Cleanliness</div>
          <div className={styles.sceneryrating} > 
          <Box
           sx={{
              '& > legend': { mt: 2 },
            }}
          >
            <Rating
              name="simple-controlled"
              onChange = {handleCleanChange}
              size="large"
            />
    
          </Box>
          </div>
        </div>
        <div className={styles.servicesParent}>
          <div className={styles.location}>Services</div>
          <div className={styles.receptionrating} >  
          <Box
           sx={{
              '& > legend': { mt: 2 },
            }}
          >
            <Rating
              name="simple-controlled"
              onChange = {handleServiceChange}
              size="large"
            />
    
          </Box>
          </div>
        </div>
      </div>
      <div className={styles.frameParent}>
        <div className={styles.overallRatingParent}>
          <div className={styles.overallRating}>Overall Rating</div>
          <div className={styles.overallRating1} >  
          


          <Box
          sx={{
            width: 500,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Rating
            name="text-feedback"
            value={overallValue}
            readOnly
            precision={0.5}
            size = "large" 
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          />
          <Box sx={{ ml: 2, color: "gray" }}>{labels[overallValue]}</Box>
        </Box>

    
            </div>
        </div>
        <div className={styles.frame1}>
          <div className={styles.theOverallProperty}>
            The overall property rating is calculated based on the given
            ratings.
          </div>
        </div>
      </div>
      <div className={styles.confirmpaymentbtn}>
        <button className={styles.submitReview}>Submit Review</button>
      </div>
    </div>
  );
};

export default GivePropertyReview;
