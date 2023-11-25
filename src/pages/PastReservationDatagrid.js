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
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';

import CompletedChip from './Chips/completedChip';
import CancelledChip from './Chips/cancelledChip';

import GiveReview from './Review/GivePropertyReview';
import { Link, useNavigate } from 'react-router-dom';



const PastReservationDatagrid = ({ data }) => {


  console.log("PastReservationDatagrid: ", data);
  

// ERROR HERE

  const [selectedRowProperty, setSelectedRowProperty] = useState(null);
  const [openPopupProperty, setOpenPopupProperty] = useState(false);

  const closePopupProperty = () => {
    setSelectedRowProperty(null);
    setOpenPopupProperty(false);
    console.log("Inside closePopupProperty function");
  };

  const navigate = useNavigate();

  const goToReview = (row) => {
    navigate(`/give-property-review/${row}`);
  }
  

  const columns: GridColDef[] = [
    
    {
      field: "actions",
      headerName: "Actions",
      headerClassName: 'custom-header-class',
      width: 100,
      renderCell: (params) => (
        <>
      
        <IconButton>
          <FindInPageIcon style={{ color: '0F52BA', display: "flex", justifyContent: "left", alignItems: "center", height: "100%" }} />
        </IconButton>


        <IconButton>
          <DeleteRoundedIcon style={{ color: '0F52BA' , display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} />
        </IconButton>
     
        </>

      ),
      disableSelectionOnClick: true,
    },
    {
      field: "propertyDetails",
      headerName: "Property",
      width: 260,
      headerClassName: 'custom-header-class',
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
        
          <AvatarGroup max={3} sx={{ borderRadius: "8px", overflow: "hidden" }}>
         
            <Avatar
              alt="Property Image "
              src={params.row.pics}
              sx={{ borderRadius: "8px", width: "50px", height: "50px" }}
            />
        
           
          </AvatarGroup>
          <div style={{ marginLeft: 10 }}>{params.row.Property}</div>
        </div>
      ),
      disableSelectionOnClick: true,
    },
    {
      field: "Status",
      headerName: "Status",
      headerAlign: "center", 
      headerClassName: 'custom-header-class',
      align: "center", 
      width: 140,
      renderCell: (params) => (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
            {params.row.Status === null ? <CompletedChip /> : <CancelledChip />}
        </div>
    ),
    },
    {
      field: "ReservationID",
      headerName: "Reservation ID",
      headerAlign: "center", 
      headerClassName: 'custom-header-class',
      align: "center", 
      width: 130,
    },
    {
      field: "checkin",
      headerName: "Check-in",
      headerAlign: "center", 
      headerClassName: 'custom-header-class',
      align: "center", 
      width: 140,
      disableSelectionOnClick: true,
    },
    {
      field: "checkout",
      headerName: "Check-out",
      headerAlign: "center", 
      headerClassName: 'custom-header-class',
      align: "center", 
      width: 140,
    },
    {
      field: "days",
      headerName: "No. of days",
      headerAlign: "center", 
      headerClassName: 'custom-header-class',
      align: "center", 
      width: 110,
    },
    {
      field: "Pricing",
      headerName: "Pricing",
      headerAlign: "center", 
      headerClassName: 'custom-header-class',
      align: "center", 
      width: 120,
    },
    {
      field: "review",
      headerName: "Review",
      headerAlign: "center", 
      headerClassName: 'custom-header-class',
      align: "center", 
      width: 80,
      renderCell: (params) => {
        const reviewDone = params.row.reviewDone;
        console.log("review: ", reviewDone);
       return (
      <IconButton disabled = {reviewDone}>
          <RateReviewIcon 
          style={{ color: reviewDone ? '#A9A9A9' : '0F52BA' , display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} 
          onClick={() => goToReview(params.row.id)}
          />
        </IconButton>

      
       );
      },

    },
    {
      field: "download",
      headerName: "Download",
      headerAlign: "center", 
      headerClassName: 'custom-header-class',
      align: "center", 
      width: 80,
      renderCell: (params) => (
        <>
      
        <IconButton>
          <DownloadRoundedIcon style={{ color: '0F52BA' , display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} />
        </IconButton>
     
        </>

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
        <GiveReview rowData={selectedRowProperty} onClose={closePopupProperty} />
      </PortalPopup>
    )}

    


    </div>
    
  

  );
};

export default PastReservationDatagrid;
