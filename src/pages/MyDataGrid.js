import { useState, useEffect } from "react";
import PortalPopup from "../components/PortalPopup";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import PropertyDetailsPopup from "../components/PropertyDetailsPopup";
import GuestsLists from "../components/GuestsLists";
import FindInPageIcon from '@mui/icons-material/FindInPage';
import './CustomDataGrid.css'; 
import './CustomHeaderClass.css';
import RateReviewIcon from '@mui/icons-material/RateReview';
import SpeakerNotesRoundedIcon from '@mui/icons-material/SpeakerNotesRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

import './myStyles.css'; 
import { Link } from 'react-router-dom';
import AvatarsFromBackend from './AvatarsFromBackend'; 


const MyDataGrid = ({ data }) => {

  const [errorPopupOpen, setErrorPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);



// ERROR HERE

  const handleDeleteProperty = (PID) => {
    fetch(`http://localhost:5001/deleteProperty/${PID}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        
        console.log(data.message);
      })
      .catch((error) => {
       //insert popup here
       setErrorMessage('Error deleting property. Please try again.'); 
       setErrorPopupOpen(true);
         
        console.log('Error deleting property:', error);
      });
  };



  console.log("Data: ", data);
  const [openPopupProperty, setOpenPopupProperty] = useState(false);
  const [selectedRowProperty, setSelectedRowProperty] = useState(null);
  const [selectedRowGuests, setSelectedRowGuests] = useState(null);

  const closePopupProperty = () => {
    setSelectedRowProperty(null);
    setOpenPopupProperty(false);
    console.log("Inside closePopupProperty function");
  };

  const closePopupGuests = () => {
    setSelectedRowGuests(null);
    console.log("Inside closePopupGuests function");
  };

  const columns: GridColDef[] = [
    
    {
      field: "viewProperty",
      headerName: "Actions",
      headerAlign: "center", 
      align: "center", 
      headerClassName: 'custom-header-class',
      width: 100,
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
                onClick={() => handleDeleteProperty(params.row.id)} 
          >
            <DeleteRoundedIcon style={{ color: '0F52BA' , display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} />
          </IconButton>
          </>

      ),
      disableSelectionOnClick: true,
    },
    {
      field: "propertyDetails",
      headerName: "Property",
      width: 280,
      headerClassName: 'custom-header-class',
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
        
          <AvatarGroup max={3} sx={{ borderRadius: "8px", overflow: "hidden" }}>
         
            <Avatar
              alt="Property Image 1"
              src={params.row.pic}
              sx={{ borderRadius: "8px", width: "50px", height: "50px" }}
            />
        
           
          </AvatarGroup>
          <div style={{ marginLeft: 10 }}>{params.row.Property}</div>
        </div>
      ),
      disableSelectionOnClick: true,
    },
    {
      field: "Created",
      headerName: "Created",
      headerAlign: "center", 
      align: "center", 
      headerClassName: 'custom-header-class',
      width: 110,
      disableSelectionOnClick: true,
    },
    {
      field: "pendingReservations",
      headerName: "Pending Reservation Requests",
      width: 270,
      headerAlign: "center",
      headerClassName: 'custom-header-class',
      align: "center",
      renderCell: (params) => (
        <div>
          <Link to={`/show-pending-reservations/${params.row.id}`}>
            <AvatarsFromBackend userId={params.row.id} firstname={params.row.GuestName} />
          </Link>
        </div>
      ),
      disableSelectionOnClick: true,
    }, 

    {
      field: "reservedBypresent",
      headerName: "Presently Reserved By",
      headerAlign: "center", 
      headerClassName: 'custom-header-class',
      align: "center", 
      width: 300,
      renderCell: (params) => (
        <div>
          <Link to={`/show-reservations`}> 
          <AvatarGroup
            renderSurplus={(surplus) => <span>+{surplus.toString()[0]}k</span>}
            total={5}
            
          >
            <Avatar alt="Mayeesha Musarrat" src="/static/images/avatar/1.jpg" />
            <Avatar alt="Travis Scott" src="/static/images/avatar/2.jpg" />
            <Avatar alt="Emily Emily" src="/static/images/avatar/4.jpg" />
            <Avatar alt="Bobby Henderson" src="/static/images/avatar/5.jpg" />
          </AvatarGroup>
       </Link>
        </div>
      ),
      disableSelectionOnClick: true,
    },
    {
      field: "pastReserved",
      headerName: "Past Reservations",
      headerAlign: "center", 
      headerClassName: 'custom-header-class',
      align: "center", 
      width: 280,
      renderCell: (params) => (
        <> 
          <Link to={`/show-reservations`}> 
        
       
        <AvatarGroup
          renderSurplus={(surplus) => <span>+{surplus.toString()[0]}k</span>}
          total={24}
          style={{ cursor: "pointer" }}
        >
          <Avatar alt="Hello Hi" src="/static/images/avatar/1.jpg" />
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
         
        </AvatarGroup>
          </Link>
        </>
      ),
      
    },

    {
      field: "reviews",
      headerName: "Reviews",
      headerAlign: "center",
      align: "center",
      headerClassName: 'custom-header-class',
      width: 99,
      cellClassName: 'custom-cell-class', 
     
      renderCell: (params) => (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
          <Link to={`/show-reviews/${params.row.id}`}>
            <IconButton>
              <SpeakerNotesRoundedIcon style={{ color: '#0F52BA' }} />
            </IconButton>
          </Link>
        </div>
      ),
    },
  ];

  const gridStyle = {
    border: '1px solid',
    borderTopColor: '#fff', 
    borderRightColor: '#fff', 
    borderBottomColor: '#fff', 
    borderLeftColor: '#fff', 
  
  };
  
 
  return (
    <div>
      <Box sx={{ height: 630, width: "100%"}}>
        <DataGrid
          rows={data}
          getRowId={(rows) => rows.id}
          columns={columns}
          rowHeight={70} 
          className="custom-data-grid"
          style = {gridStyle}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5]}
          
        />
      </Box>

      {openPopupProperty && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closePopupProperty}

         
        >
          <PropertyDetailsPopup rowData={selectedRowProperty} onClose={closePopupProperty} />
        </PortalPopup>
      )}

      {selectedRowGuests && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closePopupGuests}
        >
          <GuestsLists data={selectedRowGuests} onClose={closePopupGuests} />
        </PortalPopup>
      )}

<div>
      <Dialog open={errorPopupOpen} onClose={() => setErrorPopupOpen(false)}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>{errorMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setErrorPopupOpen(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>


    </div>
  );
};

export default MyDataGrid;
