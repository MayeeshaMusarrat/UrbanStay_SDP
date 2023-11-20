import { useState, useCallback, useEffect } from "react";
import ReviewDetails from "../../components/ReviewDetails";
import PortalPopup from "../../components/PortalPopup";
import styles from "./ShowReviews.module.css";
import ratingPieChart from '../../components/pieChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';
import { useNavigate, useParams } from "react-router-dom";
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { format } from "date-fns";
import Spinner from '../Chips/Spinner';


import ReviewComponent from '../../components/ReviewComponent';

const ShowReviews = () => {
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
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }







  const [isReviewDetailsPopupOpen, setReviewDetailsPopupOpen] = useState(false);
  const { PID } = useParams();

  const [review, setReviewDetails] = useState([]);

  const navigate = useNavigate();

  const onGroupContainerClick = useCallback(() => {
    navigate('/');
  }, []);

  const goListings = useCallback(() => {
    navigate('/mylistings');
  }, []);

  const openReviewDetailsPopup = (review) => {
    console.log("openReviewDetailPopup: ", review);
    setReviewDetails(review);
    setReviewDetailsPopupOpen(true);
  };

  const closeReviewDetailsPopup = useCallback(() => {
    setReviewDetailsPopupOpen(false);
  }, []);


  console.log("PID from review page : ", PID);

  const [reviewData, setReviewData] = useState([]);
  const [propName, setPropName] = useState("");
  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  function formatDateDisplay(date, defaultText) {
    if (!date) return defaultText;
    return format(date, "d MMM, yyyy");
}

  useEffect(() => {
    fetch(`http://localhost:5001/getReviews/${PID}`)
      .then(response => response.json())
      .then(data => {
        
       
        const formattedReviewData = data.searchResults.map(result => ({
          
          accuracy: result.Accuracy_rating,
          cleanliness: result.Cleanliness_rating,
          comment: result.Comment,
          location: result.Location_rating,
          overall: result.Overall_rating,
          reception: result.Reception_rating,
          scenery: result.Scenery_rating,
          service: result.Service_rating,
          created: new Date(result.Review_Created).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          }),
          guestFirstname: result.Guest_First_name,
          guestFullName: result.Guest_First_name + " " + result.Guest_Last_name,
          guestRating: result.Guest_avg_rating,
          guestJoin: result.Guest_joining_date,
          guestDescription: result.Guest_description,
          guestPhone: result.Guest_contact,
          guestEmail: result.Guest_Email,
          guestPic: result.Guest_profile_pic,
          
        }));
        
        setReviewData(formattedReviewData);

       
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [PID]);


  

  useEffect(() => {
    fetch(`http://localhost:5001/getRatings/${PID}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((fetchedData) => {
        if (fetchedData) {

          const combinedResults = {
            pieResults: fetchedData.pieResults,
            barResults: fetchedData.barResults,
            propertyNameResults:  fetchedData.propertyNameResults,
          };

          console.log("combined: ", combinedResults);
          
          setPropName(combinedResults.propertyNameResults);
          setPieData(combinedResults.pieResults);
          setBarData(combinedResults.barResults);
          setIsLoading(false);
         
        } else {
          console.error('Fetched data is not an array:', fetchedData);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [PID]);

  if (isLoading) {
    
    return <p>Loading...</p>; 
  }

  ///========================== USE ANOTHER USE-EFFECT TO FETCH PROPERTYNAME AND RATING VALUES FOR PIE AND BAR


  const chartSetting = {
   
    width: 700,
    height: 300,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'rotate(-90deg) translate(0px, -10px)',
      },
    },
  };


  /**************   barchart stuff */

  const dataset = [
    
    {
      five: barData[0].scenery_5_star,
      four: barData[0].scenery_4_star,
      three: barData[0].scenery_3_star,
      two: barData[0].scenery_2_star,
      one: barData[0].scenery_1_star,
      month: 'Scenery',
    },
    {
      five: barData[0].accuracy_5_star,
      four: barData[0].accuracy_4_star,
      three: barData[0].accuracy_3_star,
      two: barData[0].accuracy_2_star,
      one: barData[0].accuracy_1_star,
      month: 'Accuracy',
    },
    {
      five: barData[0].reception_5_star,
      four: barData[0].reception_4_star,
      three: barData[0].reception_3_star,
      two: barData[0].reception_2_star,
      one: barData[0].reception_1_star,
      month: 'Reception',
    },
    {
      five: barData[0].cleanliness_5_star,
      four: barData[0].cleanliness_4_star,
      three: barData[0].cleanliness_3_star,
      two: barData[0].cleanliness_2_star,
      one: barData[0].cleanliness_1_star,
      month: 'Cleanliness',
    },
    {
      five: barData[0].location_5_star,
      four: barData[0].location_4_star,
      three: barData[0].location_3_star,
      two: barData[0].location_2_star,
      one: barData[0].location_1_star,
      month: 'Location',
    },
    {
      five: barData[0].service_5_star,
      four: barData[0].service_4_star,
      three: barData[0].service_3_star,
      two: barData[0].service_2_star,
      one: barData[0].service_1_star,
      month: 'Services',
    },
  ];
  




  return (
    <>
      < div className={styles.showReviews}>
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
                        <div className={styles.link3}  >
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
        <div className={styles.reviewheading}>
          <b className={styles.reviewheading1} onClick = {goListings} > Listings</b>
          <b className={styles.reviewheading2}>{`> Reviews for ` + propName}</b>
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
        </div>
        <div className={styles.charts}>
          <div className={styles.piechart} >


            <PieChart
            series={[
              {
                data: [
                  { id: 0, value: pieData[0].overall_5_start, label: '5 stars',  },
                  { id: 1, value: pieData[0].overall_4_point_5_start, label: '4.5 Stars' },
                  { id: 2, value: pieData[0].overall_4_start, label: '4 stars' },
                  { id: 3, value: pieData[0].overall_3_point_5_start, label: '3.5 stars' },
                  { id: 4, value: pieData[0].overall_3_start, label: '3 stars' },
                  { id: 5, value: pieData[0].overall_2_point_5_start, label: '2.5 stars' },

                  { id: 6, value: pieData[0].overall_2_start, label: '2 stars' },
                  { id: 7, value: pieData[0].overall_1_point_5_start, label: '1.5 stars' },
                  { id: 8, value: pieData[0].overall_1_start, label: '1 star' },
                  { id: 9, value: pieData[0].overall_point_5_start, label: '0.5 stars' },
          
                ],
                innerRadius: 30,
                outerRadius: 100,
                paddingAngle: 5,
                cornerRadius: 5,
                startAngle: -90,
                endAngle: 180,
                cx: 150,
                cy: 95,
              },
            ]}
            width={500}
            height={200}
            />

            







          </div>
          <div className={styles.barchart} >


          <BarChart
            dataset={dataset}
            xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
            series={[
              { dataKey: 'five', label: '5 Stars', stack:'A' }, //london ar paris eke onner upore ase! //london 5 star
              { dataKey: 'four', label: '4 Stars', stack:'A' },
              { dataKey: 'three', label: '3 Stars', stack: 'A' },
              { dataKey: 'two', label: '2 Stars',  stack: 'A' },
              { dataKey: 'one', label: '1 Star',  stack: 'A' }
            ]}
            
            {...chartSetting}
          />



          </div>

        </div>


       
       

        <div className={styles.somanyreviewframe}>
      {reviewData.length > 0 ? (
        reviewData.map((review, index) => (
          <div className={styles.reviewcomponent} >
          {review.guestPic ? (
          <Avatar
            alt={review.guestFullName}
            className={styles.usericon}
            src={review.guestPic}
            sx={{ width: 56, height: 56 }}
          />
        ) : (
          <Avatar
            alt="Default User"
            className={styles.usericon}
            {...stringAvatar(review.guestFullName)}
            
          />
        )}
          <div className={styles.mayeeshaMusarrat}>
            <span className={styles.urbanstayTxt}>
              <p className={styles.mayeeshaMusarrat1}>{review.guestFullName}</p>
            </span>
          </div>
          <div className={styles.nov2023}>{review.created}</div>
          <div className={styles.asSoonAsContainer}>
            <span className={styles.urbanstayTxt}>
              <span>{review.comment}  </span>
              <span className={styles.seeMore} onClick={() => openReviewDetailsPopup(review)} >
                See More
              </span>
            </span>
          </div>
          <div className={styles.ratingstar}>
            <Box
              sx={{
                '& > legend': { mt: 2 },
              }}
            >
              <Rating name="simple-controlled" readOnly value={review.overall} />
            </Box>
          </div>
        </div>
        ))
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '1200px' }}>
        <p>No reviews available.</p>
      </div>
      )}
    </div>

          
        




        </div>
      
      {isReviewDetailsPopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeReviewDetailsPopup}
        >
          <ReviewDetails onClose={closeReviewDetailsPopup} review = {review}
          
          />
        </PortalPopup>
      )}
    </>
  );
};

export default ShowReviews;
