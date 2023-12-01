import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ShowReservations.module.css";
import CurrentlyReservedDatagrid from "./PastlyReservedDatagrid";
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import { format } from "date-fns";

const ShowReservations = () => {
  const navigate = useNavigate();
  const onGroupContainerClick = useCallback(() => {
    navigate("/");
  }, []);

  const [data, setData] = useState([]);
  const [propName, setPropName] = useState("");
  const { PID } = useParams();

  const goListings = useCallback(() => {
    navigate("/mylistings");
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5001/getPastlyReservations/${PID}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((fetchedData) => {
        if (fetchedData) {
          const combinedResults = {
            presentReservations: fetchedData.presentReservations,
            propertyDetails: fetchedData.propertyDetails,
          };
          setData(combinedResults.presentReservations);
          setPropName(combinedResults.propertyDetails.Property_title);

          console.log("propname: ", propName);
         
        } else {
          console.error('Fetched data is not an array:', fetchedData);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  function formatDateDisplay(date, defaultText) {
    if (!date) return defaultText;
    return format(date, "d MMM, yyyy");
  }
  

  const rows = data.map((item) => ({
    id: item.User_ID, 
    GID: item.GID,
    PID: item.PID, 
    city: item.City,
    country: item.Country,
    check_in:new Date(item.CheckInDate),
    check_out: new Date(item.CheckOutDate),
    checkin: formatDateDisplay(new Date(item.CheckInDate)),
    checkout: formatDateDisplay(new Date(item.CheckOutDate)),
    GuestFirstName: item.FirstName, 
    GuestName: item.FirstName + " " + item.LastName,
    paid: item.TotalPrice + " BDT", 
    GuestRating: item.Guest_rating,
    GuestDescription: item.User_description,
    pending_Guests: item.pending_Guests, 
    pending_rooms: item.pending_Rooms,
    Joining_date: formatDateDisplay(new Date(item.Joining_date)),
    Phone: item.Phone, 
    Email: item.Email,
    pic: item.Profile_pic,
 
    requestFor: formatDateDisplay(new Date(item.CheckInDate)) + " - " + formatDateDisplay(new Date(item.CheckOutDate)),
    }));

    console.log("rows: ", rows);
  

  return (
    <div className={styles.showReservations}>
      <Footer />
    
      <b className={styles.reservationheading}>
        <span className={styles.listings1} onClick = {goListings}>Listings</span>
        {` > Past Guests of ` + propName}
      </b>
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
     
      <div className={styles.showReservationsChild} >

        <CurrentlyReservedDatagrid data = {rows} />     

      </div>
    </div>
  );
};

export default ShowReservations;
