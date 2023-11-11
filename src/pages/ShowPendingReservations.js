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



const ShowPendingReservations = () => {

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



  const [data, setData] = useState([]);
  const [propName, setPropName] = useState("");
  console.log("PID : ", PID);
  //const userEmail = localStorage.getItem('email');

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
         // console.log("Data fetched: ", fetchedData);

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



  const handleApproval = (GID, PID, checkin, checkout, total_price, rooms, guests) => {

    const approval = {
      GID: GID,
      PID: PID,
      checkin: checkin ,
      checkout: checkout ,
      total_price: total_price,
      rooms: rooms,
      guests: guests,
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
  checkin: formatDateDisplay(new Date(item.CheckInDate)),
  checkout: formatDateDisplay(new Date(item.CheckOutDate)),
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
           <Avatar alt="Guest" src={params.row.pic} /> 
           
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
      width: 170,
      
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
        width: 200,
        
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
              onClick={() => handleApproval(params.row.GID, params.row.PID, params.row.checkin, params.row.checkout, params.row.Pricing, params.row.pending_Guests, params.row.pending_rooms)} 
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

    <IconPopup topMargin={6} />

  
    <div className={styles.showPendingReservations}>
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
























      <div className={styles.filter}>
        <div className={styles.filterChild} />
        <div className={styles.filterframe}>
          <div className={styles.guestrating}>
            <div className={styles.guestRating}>Guest Rating</div>
            <TextField
              className={styles.minguestrating}
              color="primary"
              sx={{ width: 141 }}
              variant="outlined"
            />
            <TextField
              className={styles.maxguestrating}
              color="primary"
              sx={{ width: 141 }}
              variant="outlined"
            />
            <img
              className={styles.guestratingChild}
              alt=""
              src="/line-63.svg"
            />
          </div>
          <div className={styles.pricing}>
            <div className={styles.minPrice}>min. Price</div>
            <div className={styles.maxPrice}>Max. price</div>
            <TextField
              className={styles.minguestrating1}
              color="info"
             // placeholder="Enter First Name"
              sx={{ width: 141 }}
              variant="outlined"
            />
            <TextField
              className={styles.maxguestrating}
              color="info"
            //  placeholder="Enter First Name"
              sx={{ width: 139 }}
              variant="outlined"
            />
            <img className={styles.pricingChild} alt="" src="/line-64.svg" />
          </div>
          <div className={styles.roomsGuests}>
            <div className={styles.minPrice}>Rooms</div>
            <div className={styles.maxPrice}>Guests</div>
            <TextField
              className={styles.minguestrating1}
              color="primary"
              sx={{ width: 141 }}
              variant="outlined"
            />
            <TextField
              className={styles.maxguestrating}
              color="primary"
              sx={{ width: 139 }}
              variant="outlined"
            />
          </div>
          <div className={styles.sortby}>
            <div className={styles.sortBy}>Sort By</div>
            <FormControl
              className={styles.parent}
              sx={{ width: 340 }}
              variant="outlined"
            >
              <InputLabel color="info" />
              <Select color="info" size="small">
                <MenuItem value="High to low rating">
                  High to low rating
                </MenuItem>
                <MenuItem value="Low to high rating">
                  Low to high rating
                </MenuItem>
              </Select>
              <FormHelperText />
            </FormControl>
          </div>
          <div className={styles.filterbtn}>
            <button className={styles.filter1}>Filter</button>
          </div>
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
    </div>
    </>
  );
};

export default ShowPendingReservations;
