import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MyPastReservations.module.css";
import './CustomDataGrid.css'; 
import './CustomHeaderClass.css';
import IconPopup from '../components/IconPopup';
import IconPopupForGuest from '../components/IconPopupForGuest';
import PastReservationDatagrid from './PastReservationDatagrid';
import {format} from "date-fns";

const MyPastReservations = () => {

  const navigate = useNavigate();

  const onGroupContainerClick = useCallback(() => {
    navigate("/");
  }, []);

  const onItemLink5Click = useCallback(() => {
    // Please sync "myListings" to the project
    navigate("/mylistings");
  }, []);

  const onItemLink6Click = useCallback(() => {
    // Please sync "myReservations" to the project
    navigate("/myreservations");
  }, []);

  const onItemLink8Click = useCallback(() => {
    // Please sync "Profile" to the project
    navigate("/temp-profile");
  }, []);

  const onItemLink9Click = useCallback(() => {
    // Please sync "LandingPage" to the project
    navigate("/");
  }, []);

  const isGuest = localStorage.getItem('GuestOrHost');
  const user_name = localStorage.getItem('name');


  function formatDateDisplay(date, defaultText) {
    if (!date) return defaultText;
    return format(date, "d MMM, yyyy");
  }

  const [loading, setLoading] = useState(1);

  const [Pastdata, setPastData] = useState([]);
  const userEmail = localStorage.getItem('email');

  useEffect(() => {
    fetch(`http://localhost:5001/getPastReservations/${userEmail}`)
      .then(response => response.json())
      .then(data => {
        const formattedData = data.searchResults.map(result => ({
          PID: result.PID, 
          Property_title: result.Property_title,
          Email: result.Email,
          FullName: result.FirstName + " " + result.LastName,
          Joining_date: result.Joining_date, 
          User_description: result.User_description,
          User_ID: result.User_ID,
          Num_of_guests: result.pending_Guests,
          Price_per_night: result.Price_per_night,
          Check_in_date: result.Check_in_date,
          Check_out_date: result.Check_out_date,
          Num_of_ratings: result.Num_of_ratings,
          Avg_ratings: result.Avg_ratings,
          UID: result.UID,
          City: result.City,
          Country: result.Country,
          Property_description: result.description,
          Num_of_rooms: result.pending_Rooms,
          Address_line: result.Address_line,
          Num_of_bedrooms: result.Num_of_bedrooms,
          Num_of_bathrooms: result.Num_of_bathrooms,
          Num_of_beds: result.Num_of_beds,
          num_of_days: result.days,
          Status: result.Status,
          Area: result.Area,
          RID: result.Reservation_ID,
          Guest_checkin: result.CheckInDate,
          Guest_checkout: result.CheckOutDate,
          TotalPrice: result.TotalPrice,
          GuestRating: result.GuestRating,
          GID: result.GID,
          pics: result.pics,
          reviewDone: result.reviewDone,
        }));
  
        console.log("past data: ", Pastdata); 
        setPastData(formattedData);
        
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  
 
  const rows = Pastdata.map((item) => ({
    id: item.PID,
    Property: item.Property_title,
    Status: item.Status,
    ReservationID: "RES_US"+item.RID,
    checkin: formatDateDisplay(new Date(item.Guest_checkin)),
    checkout: formatDateDisplay(new Date(item.Guest_checkout)),
    days: Math.ceil((new Date(item.Guest_checkout) - new Date(item.Guest_checkin))/(1000 * 60 * 60 * 24)) + 1,
    Pricing: item.TotalPrice + " BDT",
    pics: item.pics,
    reviewDone: item.reviewDone,

  }));

 // console.log("data: ", data);

  return (
    <div className={styles.mypastreservations}>
     
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

      <div className={styles.pastreservations}>

         <PastReservationDatagrid data = {rows} />
         

      </div>



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


        { isGuest==='1' ? (

        <IconPopupForGuest topMargin = {23} name = {user_name}/>

        ) : isGuest==='0' ? (

        <IconPopup topMargin = {23}  name = {user_name} />

        ) : null }

        <div className={styles.itemLinkParent}>
          <div className={styles.itemLink5} onClick={onItemLink5Click}>
            <div className={styles.reservations}>listings</div>
          </div>
          <div className={styles.itemLink6} onClick={onItemLink6Click}>
            <div className={styles.reservations}>Reservations</div>
          </div>
          <div className={styles.itemLink7}>
            <b className={styles.pastReservations}>Past reservations</b>
          </div>
          <div className={styles.itemLink8} onClick={onItemLink8Click}>
            <div className={styles.reservations}>Profile</div>
          </div>
          <div className={styles.itemLink9} onClick={onItemLink9Click}>
            <div className={styles.reservations}>HOME</div>
          </div>
        </div>



      </div>
    </div>
  );
};

export default MyPastReservations;
