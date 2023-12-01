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
import AvatarsFromBackendPresentlyReserved from './AvatarsFromBackendPresentlyReserved';
import AvatarsFromBackendPastlyReserved from './AvatarsFromBackendPastlyReserved';

import DurationProgressBar from './DurationProgressBar';


const CurrentlyReservedDatagrid = ({ data }) => {

  const [errorPopupOpen, setErrorPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);

  


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

  const MAX_DURATION = 14;



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
        field: "Guest",
        headerName: "Guest Name",
        headerAlign: "center", 
        align: "center", 
        headerClassName: 'custom-header-class',
        width: 280,
        disableSelectionOnClick: true,
        renderCell: (params) => (
            <div style={{ display: "flex", alignItems: "center" }}>
            
                <Avatar
                  alt="Property Image 1"
                  src={params.row.pic}
                  sx={{ width: "50px", height: "50px" }}
                />
            
               
              <div style={{ marginLeft: 10 }}>{params.row.GuestName}</div>
            </div>
        )
      },
    
    
    {
        field: "checkin",
        headerName: "Check-in",
        headerAlign: "center", 
        align: "center", 
        headerClassName: 'custom-header-class',
        width: 150,
        disableSelectionOnClick: true,
      },
      
    {
        field: "checkout",
        headerName: "Check-out",
        headerAlign: "center", 
        align: "center", 
        headerClassName: 'custom-header-class',
        width: 150,
        disableSelectionOnClick: true,
      },
    
      {
        field: "paid",
        headerName: "Amount Paid",
        headerAlign: "center", 
        align: "center", 
        headerClassName: 'custom-header-class',
        width: 150,
        disableSelectionOnClick: true,
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

export default CurrentlyReservedDatagrid;
