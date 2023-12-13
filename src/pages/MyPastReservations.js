import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MyPastReservations.module.css";
import './CustomDataGrid.css'; 
import './CustomHeaderClass.css';
import IconPopup from '../components/IconPopup';
import IconPopupForGuest from '../components/IconPopupForGuest';
import PastReservationDatagrid from './PastReservationDatagrid';
import {format} from "date-fns";
import Footer from '../components/Footer';

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
     <Footer />

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
