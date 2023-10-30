
import { useState, useCallback, useEffect } from "react";
import SignoutConfirmationPopup from "../components/SignoutConfirmationPopup";
import PortalPopup from "../components/PortalPopup";
import { useNavigate } from "react-router-dom";
import styles from "./MyReservations.module.css";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridApi, GridCellValue } from '@mui/x-data-grid';


const MyReservations = () => {

  const [data, setData] = useState([]);
  const userEmail = localStorage.getItem('email');
  
  useEffect(() => {
    fetch(`http://localhost:5001/getReservations/${userEmail}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((fetchedData) => {
        if (Array.isArray(fetchedData)) {
          console.log("Data fetched");
          setData(fetchedData);
        } else {
          console.error('Fetched data is not an array:', fetchedData);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
  
  
  
  const rows = data.map((item) => ({
     
    id: item.PID, 
    Property: item.Property_title,
    bedrooms: item.Num_of_bedrooms,
    beds: item.Num_of_beds,
    baths: item.Num_of_bathrooms,
    rooms: item.Num_of_rooms,
    location: item.City,
    Check_in: new Date(item.Check_in_date).toISOString().split('T')[0],
    Check_out: new Date(item.Check_out_date).toISOString().split('T')[0], 
    price: item.Price_per_night+'$',
    
  }));

  
const columns: GridColDef[] = [
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    renderCell: (params) => {
      const onClick = (e) => {
        e.stopPropagation(); // don't select this row after clicking

        const api: GridApi = params.api;
        const thisRow: Record<string, GridCellValue> = {};

        api
          .getAllColumns()
          .filter((c) => c.field !== "__check__" && !!c)
          .forEach(
            (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
          );

        return alert(JSON.stringify(thisRow, null, 4));
      };

      return <Button onClick={onClick}>Click</Button>;
    }
  },

  {
    field: 'Property',
    headerName: 'Property',
    width: 280,
    
  },
  
  {
    field: 'bedrooms',
    headerName: 'Bedrooms',
  
    width: 120,
    
  },
  {
    field: 'beds',
    headerName: 'Beds',
    
    width: 80,
    
  },
  {
    field: 'baths',
    headerName: 'Bathrooms',
    width: 160,
    
  },

  {
    field: 'rooms',
    headerName: 'Rooms',
    width: 160,
    
  },

  {
    field: 'location',
    headerName: 'Location',
    width: 180,
    
  },
  {
    field: 'Check_in',
    headerName: 'Check-in',
    width: 100,
    
  },
  {
    field: 'Check_out',
    headerName: 'Check-out',
    width: 120,
    
  },
  {
    field: 'price',
    headerName: 'Total Price',
    width: 100,
    
  }


];

/* const rows = [
   {id:1, Property: "Neel Oboni 5th floor",Status: "Reserved", bedrooms: "2", beds: "2", bathrooms: "2", location: "Shahinbagh, Dhaka", check_in: "17/10/23", check_out: "18/10/23", price: "1400$"}
]; */


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
    navigate("/profile");
  }, [navigate]);

  const onItemLink9Click = useCallback(() => {
    navigate("/");
  }, [navigate]);

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
        <div className={styles.testimonialSection}>
          <div className={styles.h3}>View the properties reserved by you!</div>
        </div>
        <img className={styles.pseudoIcon} alt="" src="/pseudo@2x.png" />


        <div className={styles.myreservationsDatagridWrapper}>
          <div className={styles.myreservationsDatagrid}>

            <Box sx={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>


          </div>
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
            <img className={styles.image31} alt="" src="/image-3-11@2x.png" />
          </div>


          <img
            onClick = {toggle}
            className={styles.profileIcon}
            alt=""
            src="/profile-icon3@2x.png"
          />

          { popup && (
          <div className={styles.signinPopupWithSignout}>
            <div className={styles.loginPopupWithLogoutGrp}>
              <div className={styles.loginPopupWithLogoutGrpChild} />
              <button
                className={styles.becomehostbtn}
                id="BecomeHost"
                onClick={onBecomeHostBtnClick}
              >
                <button
                  className={styles.becomeAHost}
                >{`    Become a host `}</button>
              </button>
              <div className={styles.loginPopupWithLogoutGrpItem} />
              <button className={styles.accsettingsbtn} id="accSettings">
                <button className={styles.becomeAHost}>
                  {" "}
                  Account Settings
                </button>
              </button>
              <button className={styles.wishlistbtn} id="wishlist">
                <button className={styles.becomeAHost}> Wishlist</button>
              </button>
              <button
                className={styles.signoutbtn}
                id="signOut"
                onClick={openSignoutConfirmationPopup}
              >
                <button className={styles.signOut}> Sign out</button>
              </button>
            </div>
          </div>

          )}

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
