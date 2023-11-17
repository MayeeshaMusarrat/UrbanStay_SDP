
import { useState, useCallback, useEffect } from "react";
import SignoutConfirmationPopup from "../components/SignoutConfirmationPopup";
import PortalPopup from "../components/PortalPopup";
import { useNavigate } from "react-router-dom";
import styles from "./MyReservations.module.css";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridApi, GridCellValue  } from '@mui/x-data-grid';

import './CustomDataGrid.css'; 
import './CustomHeaderClass.css';

import IconButton from "@mui/material/IconButton";
import FindInPageIcon from '@mui/icons-material/FindInPage';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import PropertyDetailsForReservation from '../components/PropertyDetailsForReservationP';

import IconPopupForGuest from '../components/IconPopupForGuest';
import IconPopup from '../components/IconPopup';
import Chip from '@mui/material/Chip';

import ReservedChip from './Chips/reservationChip';
import PendingChip from './Chips/pendingChip';
import RejectedChip from './Chips/rejectedChip';
import DueChip from './Chips/dueChip';
import PaidChip from './Chips/paidChip';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { format } from "date-fns";

import Spinner from './Chips/Spinner';


const MyReservations = () => {

  const [data, setData] = useState([]);
  const userEmail = localStorage.getItem('email');

  const [openPopupProperty, setOpenPopupProperty] = useState(false);
  const [selectedRowProperty, setSelectedRowProperty] = useState(null);

  const closePopupProperty = () => {
    setSelectedRowProperty(null);
    setOpenPopupProperty(false);
    console.log("Inside closePopupProperty function");
  };


  const gridStyle = {
    border: '1px solid',
    borderTopColor: '#fff', 
    borderRightColor: '#fff', 
    borderBottomColor: '#fff', 
    borderLeftColor: '#fff', 
  
  };

  function formatDateDisplay(date, defaultText) {
    if (!date) return defaultText;
    return format(date, "d MMM, yyyy");
  }

  const [loading, setLoading] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:5001/getReservations/${userEmail}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((fetchedData) => {
        if (fetchedData.pendingReservations && fetchedData.approvedReservations) {
          console.log('Data fetched');
          setData({
            pendingReservations: fetchedData.pendingReservations,
            approvedReservations: fetchedData.approvedReservations,
          });
        } else {
          console.error('Data structure is not as expected:', fetchedData);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(0);
        }, 800);
      });
  }, []);
  
  
  const oneDay = 24 * 60 * 60 * 1000;
  
  const rows = data.pendingReservations
  ? data.pendingReservations.map((item) => ({
      id: item.GID,
      pid: item.PropertyID,
      Property: item.Property_title,
      Status: "Pending",
      bedrooms: item.Num_of_bedrooms,
      beds: item.Num_of_beds,
      baths: item.Num_of_bathrooms,
      guests: item.pending_Guests,
      rooms: item.pending_Rooms,
      location: item.City,
      reservationID: "-",
      Check_in: formatDateDisplay(new Date(item.CheckInDate).getTime() + oneDay),
      Check_out: formatDateDisplay(new Date(item.CheckOutDate).getTime() + oneDay),
      price: item.TotalPrice + ' BDT',
      price_night: item.Price_per_night,
      pics: item.pics,
      address_line: item.Address_line,
      category: item.category,
      days: Math.floor(((new Date(item.CheckOutDate)) - (new Date(item.CheckInDate)))/(24*60*60*1000) + 1),
      Requested_on: formatDateDisplay(new Date(item.Requested_on)),
      description: item.description,
      rating: item.Avg_ratings,
      area: item.Area,
      payment: "DUE",
    }))
  : [];

const approvedRows = data.approvedReservations
  ? data.approvedReservations.map((item) => ({
      id: item.GID,
      pid: item.PID,
      Property: item.Property_title,
      Status: "Reserved",
      bedrooms: item.Num_of_bedrooms,
      beds: item.Num_of_beds,
      baths: item.Num_of_bathrooms,
      guests: item.approved_Guests,
      rooms: item.approved_Rooms,
      location: item.City,
      Check_in: formatDateDisplay(new Date(item.CheckInDate).getTime() + oneDay),
      Check_out: formatDateDisplay(new Date(item.CheckOutDate).getTime() + oneDay),
      price: item.TotalPrice + ' BDT',
      price_night: item.Price_per_night,
      reservationID: "RES_US" + item.Reservation_ID,
      pics: item.pics,
      address_line: item.Address_line,
      category: item.category,
      Requested_on: item.Requested_on,
      description: item.description,
      days: item.days,
      days: Math.ceil((new Date(item.CheckOutDate) - new Date(item.CheckInDate))/(1000 * 60 * 60 * 24)) + 1,
      rating: item.Avg_ratings,
      area: item.Area,
      payment: "PAID", 
    }))
  : [];

// Merge the rows from both views
const allRows = rows.concat(approvedRows);

  
const columns: GridColDef[] = [
   
  {
    field: "viewProperty",
    headerName: "Action",
    
    headerClassName: 'custom-header-class',
    width: 90,
    renderCell: (params) => (
      <>
      

      <IconButton
        onClick={() => {
          setSelectedRowProperty(params.row);
          setOpenPopupProperty(true);
        }}
      >
        <FindInPageIcon style={{ color: '0F52BA', display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} />
      </IconButton>

        <IconButton
            
        >
          <DeleteRoundedIcon style={{ color: '0F52BA' , display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} />
        </IconButton>
        </>

    ),
    disableSelectionOnClick: true,
  },

  {
    field: 'Property',
    headerName: 'Property',
    headerClassName: 'custom-header-class',
    width: 240,
    renderCell: (params) => (
      <div style={{ display: "flex", alignItems: "center" }}>
      
        <AvatarGroup max={3} sx={{ borderRadius: "8px", overflow: "hidden" }}>
       
          <Avatar
            alt="Property Image 1"
            src={params.row.pics}
            sx={{ borderRadius: "8px", width: "50px", height: "50px" }}
          />
      
         
        </AvatarGroup>
        <div style={{ marginLeft: 10 }}>{params.row.Property}</div>
      </div>
    ),
    
  },
  {
    field: 'Requested_on',
    headerName: 'Requested On',
    headerAlign: "center", 
    align: "center", 
    headerClassName: 'custom-header-class',
    width: 138,
   
    
  },
  
  {
    field: 'Status',
    headerName: 'Status',
    headerAlign: "center", 
    align: "center", 
    headerClassName: 'custom-header-class',
    width: 140,
    renderCell: (params) => (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
            {params.row.Status === "Reserved" ? <ReservedChip /> : <PendingChip />}
        </div>
    ),
 
  },
  {
    field: 'reservationID',
    headerName: 'Reservation ID',
    headerAlign: "center", 
    align: "center", 
    headerClassName: 'custom-header-class',
    width: 140,
    
    
  },

  {
    field: 'Check_in',
    headerName: 'Check-in',
    width: 140,
    headerAlign: "center", 
    align: "center", 
    headerClassName: 'custom-header-class',
    
  },
  {
    field: 'Check_out',
    headerName: 'Check-out',
    width: 140,
    headerAlign: "center", 
    align: "center", 
    headerClassName: 'custom-header-class',
    
  },
  {
    field: 'days',
    headerName: 'No. of Days',
    width: 120,
    headerAlign: "center", 
    align: "center", 
    headerClassName: 'custom-header-class',
    
  },
  {
    field: 'price',
    headerName: 'Pricing',
    width: 150,
    headerAlign: "center", 
    align: "center", 
    headerClassName: 'custom-header-class',
    
  },
  {
    field: 'payment',
    headerName: 'Payment',
    width: 110,
    headerAlign: "center", 
    align: "center", 
    headerClassName: 'custom-header-class',
    renderCell: (params) => (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
          {params.row.payment === "PAID" ? <PaidChip /> : <DueChip />}
      </div>
  ),
    
  }

];

/* const rows = [
   {id:1, Property: "Neel Oboni 5th floor",Status: "Reserved", bedrooms: "2", beds: "2", bathrooms: "2", location: "Shahinbagh, Dhaka", check_in: "17/10/23", check_out: "18/10/23", price: "1400$"}
]; */


const getCellClassName = (params) => {
  if (params.field === 'Status') {
    if (params.value === 'Reserved') {
      return 'reserved-cell';
    } else if (params.value === 'Pending') {
      return 'pending-cell';
    }
  }
  return '';
};

  const [popup, setPopup] = useState(false);

  const toggle = () => {
    setPopup(!popup);
  };



  const [isSignoutConfirmationPopupOpen, setSignoutConfirmationPopupOpen] =
    useState(false);
  const navigate = useNavigate();

  const onGroupContainerClick = useCallback(() => {
    navigate("/");
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
    navigate("/mylistings");
  }, [navigate]);

  const onItemLink7Click = useCallback(() => {
    navigate("/mypastreservations");
  }, [navigate]);

  const onItemLink8Click = useCallback(() => {
    navigate("/temp-profile");
  }, [navigate]);

  const onItemLink9Click = useCallback(() => {
    navigate("/");
  }, [navigate]);


  const [isGuest, setIsGuest] = useState(false);
  const hostOrGuest = localStorage.getItem('GuestOrHost');

  useEffect(() => {
      if (hostOrGuest) {
        setIsGuest(true);
      }
      else
      {
        setIsGuest(false);
      }
    }, [hostOrGuest]);



  return (
    <>
      <div className={styles.myreservations}>
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


      

        <div className={styles.myreservationsDatagridWrapper}>
        {loading && (
        <div className={styles.spinnerWrapper}>
          <Spinner />
        </div>
        )}
        {!loading && (

                <div className={styles.myreservationsDatagrid}>

                {loading ? <Spinner /> : ""}

                <Box sx={{ height: 600, width: '100%' }}>
                <DataGrid
                  rows={allRows}
                  getRowId={(allRows) => allRows.pid}
                  columns={columns}
                  getCellClassName={getCellClassName}
                  rowHeight={70} 
                  className="custom-data-grid"
                  style = {gridStyle}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 15,
                      },
                    },
                  }}
                  pageSizeOptions={[5]}
                
                
                />
                </Box>
                </div>

        )}
         
        </div>


        {openPopupProperty && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closePopupProperty}
        >
          <PropertyDetailsForReservation rowData={selectedRowProperty} onClose={closePopupProperty} />
        </PortalPopup>
      )}

        { isGuest ? (

        <IconPopupForGuest topMargin = {6} />

        ) : !isGuest ? (

        <IconPopup topMargin = {6} />

        ) : null }           


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
            <img className={styles.image31} alt="" src="/image-3-11@2x.png" />
          </div>


      



          <div className={styles.itemLinkParent}>
            <div className={styles.itemLink5} onClick={onItemLink5Click}>
              <div className={styles.pastReservations}>listings</div>
            </div>
            <div className={styles.itemLink6}>
              <b className={styles.reservations}>Reservations</b>
            </div>
            <div className={styles.itemLink7} onClick={onItemLink7Click}>
              <div className={styles.pastReservations}>Past reservations</div>
            </div>
            <div className={styles.itemLink8} onClick={onItemLink8Click}>
              <div className={styles.pastReservations}>Profile</div>
            </div>
            <div className={styles.itemLink9} onClick={onItemLink9Click}>
              <div className={styles.pastReservations}>HOME</div>
            </div>
          </div>
        </div>
      </div>
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

export default MyReservations;
