import { FunctionComponent, useCallback, useEffect, useState } from "react";
import {
  TextField,
  InputAdornment,
  Icon,
  IconButton,
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
} from "@mui/material";
import styles from "./ShowPendingReservations.module.css";
import BigCalendar from "../components/BigCalendar";
import IconPopup from "../components/IconPopup";
import Avatar from '@mui/material/Avatar';

import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridApi, GridCellValue } from '@mui/x-data-grid';

import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';

import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { format } from "date-fns";
import { useParams } from 'react-router-dom';

import PortalPopup from "../components/PortalPopup";

import GuestDetailsPopup from '../components/UserInfoPopup';
import Footer from '../components/Footer';



const ShowPendingReservations = () => {

  const isGuest = localStorage.getItem('GuestOrHost');
  const user_name = localStorage.getItem('name');

  const { PID } = useParams();

  const navigate = useNavigate();

  function formatDateDisplay(date, defaultText) {
    if (!date) return defaultText;
    return format(date, "d MMM, yyyy");
  }

  const onGroupContainerClick = useCallback(() => {
    navigate("/");
  }, []);

  const goToListing = useCallback(() => {
    navigate("/mylistings");
  }, []);


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
      children: `${name.split(' ')[0][0]}`,
    };
  }



  const [data, setData] = useState([]);
  const [propName, setPropName] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5001/getPendingReservations/${PID}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((fetchedData) => {
        if (fetchedData) {
          const combinedResults = {
            pendingReservations: fetchedData.pendingReservations,
            propertyDetails: fetchedData.propertyDetails,
          };
          setData(combinedResults.pendingReservations);
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



  const handleApproval = (GID, PID, check_in, check_out, total_price, rooms, guests, Email, Requested_on, city, country, requestFor, property_title) => {

    const approval = {
      GID: GID,
      PID: PID,
      checkin: check_in ,
      checkout: check_out ,
      total_price: total_price,
      rooms: rooms,
      guests: guests,

      Email: Email,
      AppliedIn: Requested_on,
      location: city + ", " + country, 
      reservedForStart: requestFor, 
      property_title: property_title,

    };

    console.log("Approval: ", approval);

    fetch("http://localhost:5001/approve-reservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(approval),
    })
      .catch((error) => {
        console.log("Error occurred:", error);
      
      });
  };

  const handleDeletion = (Email, PID) => {

    const deletion = {
      Email: Email,
      PID: PID,
    };

    console.log("Deletion: ", deletion);

    fetch("http://localhost:5001/reject-reservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deletion),
    })
      .catch((error) => {
        console.log("Error occurred:", error);
      
      });
  };


  console.log("pending data: ", data);
 
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
  Pricing: item.TotalPrice, 
  RequestedOn: formatDateDisplay(new Date(item.Requested_on)),
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

  const gridStyle = {
    border: '1px solid',
    borderTopColor: '#fff', 
    borderRightColor: '#fff', 
    borderBottomColor: '#fff', 
    borderLeftColor: '#fff', 
  
  };

  const events = data.map((item) => ({
   
    id: item.User_ID, 
    start: item.CheckInDate, 
    end: item.CheckOutDate,
    title: item.FirstName + " " + item.LastName + " (" + item.pending_Rooms + " rooms, " + item.pending_Guests + " guests)"
    
    }));


    const [openPopupGuest, setOpenPopupPGuest] = useState(false);
    const [selectedGuest, setSelectedGuest] = useState(null);
    

    const closePopupGuest = () => {
      //setSelectedGuest(null);
      setOpenPopupPGuest(false);
      console.log("Inside closePopupGuests function");
    };
  


  const columns: GridColDef[] = [
    /*
             ///ADD CROSS OR TICK! 
    */

                 
    {
        field: "viewGuest",
        headerName: "",
        headerAlign: "center", 
        align: "center", 
        width: 10,
        renderCell: (params) => (
          <>
          <IconButton
           onClick={() => {
            setSelectedGuest(params.row);
            setOpenPopupPGuest(true);
          }}>
            <LaunchRoundedIcon style={{ color: '0F52BA', display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} />
          </IconButton>
            </>
        ),
        disableSelectionOnClick: true,
      },
  
    {
      field: 'avatar',
      headerName: '',
      width: 50,
      renderCell: (params) => (
        <div>
          {params.row.pic ? (
            <Avatar alt="Guest" src={params.row.pic} />
          ) : (
            <Avatar   {...stringAvatar(params.row.GuestFirstName)} />
          )}  
        </div>
      ),
      
    },
    {
      field: 'GuestName',
      headerName: 'Guest Name',
      width: 150,
      
    },
    
    {
      field: 'RequestedOn',
      headerName: 'Requested On',
      headerAlign: "center", 
      align: "center",
      width: 160,
      
    },
    {
      field: 'requestFor',
      headerName: 'Requested For',
      headerAlign: "center", 
      align: "center",
      width: 200,
      
    },

    {
        field: 'Pricing',
        headerName: 'Pricing (BDT)',
        headerAlign: "center", 
        align: "center",
        width: 180,
        
    },
    
    {
    field: 'Action',
    headerName: 'Action',
    headerAlign: "center", 
    align: "center", 
    width: 120,
    renderCell: (params) => (
      <>
        <IconButton
              onClick={() => handleApproval(params.row.GID, params.row.PID, params.row.check_in, params.row.check_out, params.row.Pricing, params.row.pending_Guests, params.row.pending_rooms, params.row.Email, params.row.RequestedOn, params.row.city, params.row.country, params.row.requestFor, propName)} 
        >
          <DoneRoundedIcon style={{ color: 'green', display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} />
        </IconButton>

          <IconButton
              onClick={() => handleDeletion(params.row.Email, params.row.PID)}
          >
            <ClearRoundedIcon style={{ color: 'red' , display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} />
          </IconButton>
          </>
    ),
    disableSelectionOnClick: true,
    
    }
  
  
  
  
  ];

/*
  const events = [
    {
      id: 1,
      title: 'Raiyan Mashhureen',
      start: new Date(2023, 10, 15),
      end: new Date(2023, 10, 17), 
      status: 'booked',
      color: 'green', 
    },
    {
      id: 2,
      title: 'Mayeesha Musarrat',
      start: new Date(2023, 10, 13),
      end: new Date(2023, 10, 22),
      status: 'booked',
      
    },
   
  ];
  */

 


  return (

    <> 

   

  
    <div className={styles.showPendingReservations}>
       <IconPopup topMargin={6} name = {user_name} />
      <b className={styles.reservationheadingListing} onClick = {goToListing}>
        {"Listings "}
      </b>
      <b className={styles.reservationheading}>
        {"> Pending Reservation Requests for "+ propName}
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



       <div className={styles.bigcalendar} > 

       <BigCalendar events={events}  />



       </div>


       <Footer />


  


      <div className={styles.guestdatagrid} >


      <Box sx={{ height: 660, width: '100%' }}>
            <DataGrid
              rows={rows}
              //getRowId={(rows) => rows.id}
              columns={columns}
              style = {gridStyle}
              rowHeight={70}
              disableColumnMenu
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 15,
                  },
                },
              }}
              pageSizeOptions={[5]}
             
              disableRowSelectionOnClick
            />
          </Box>

          {openPopupGuest && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closePopupGuest}
        >
          <GuestDetailsPopup rowData={selectedGuest} onClose={closePopupGuest}/>
        </PortalPopup>
      )}
    </div>


    </div>
    </>
  );
};

export default ShowPendingReservations;
