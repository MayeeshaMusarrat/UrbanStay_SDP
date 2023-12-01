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

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "jspdf-autotable";




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


  {/* 
  const [name, setName] = useState("");
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const generatePdf = () => {
    const templateDiv = document.createElement("div");
    templateDiv.innerHTML = `
    <head>
    <style>
    body {
      margin: 0;
      line-height: normal;
    }
  </style>
</head>
<body>
  <div
    style="
      position: relative;
      background-color: #fff;
      width: 100%;
      height: 457px;
      overflow: hidden;
      text-align: left;
      font-size: 10px;
      color: #000;
      font-family: Inter;
    "
  >
    <div
      style="
        position: absolute;
        top: 0px;
        left: 0px;
        background-color: #371dae;
        width: 656px;
        height: 57px;
      "
    ></div>
    <div
      style="
        position: absolute;
        top: -3px;
        left: -10px;
        width: 147px;
        height: 90px;
      "
    >
      <b
        style="
          position: absolute;
          top: 8px;
          left: 22px;
          letter-spacing: -1px;
          line-height: 70px;
          text-transform: capitalize;
          display: inline-block;
          color: #fff;
          width: 125px;
          height: 57px;
        "
      >
        URBANSTAY</b
      >
      <img
        style="
          position: absolute;
          top: 8px;
          left: 17px;
          width: 73px;
          height: 25px;
          object-fit: cover;
        "
        alt=""
        src="./public/urbanstaylogopic@2x.png"
      />

      <div
        style="
          position: absolute;
          top: 85px;
          left: 29px;
          background-color: #d9d9d9;
          width: 618px;
          height: 21px;
        "
      ></div>
      <div
        style="
          position: absolute;
          top: 85px;
          left: -124px;
          letter-spacing: -1px;
          line-height: 20px;
          text-transform: capitalize;
          font-weight: 500;
          text-align: center;
          display: inline-block;
          width: 396px;
          height: 20px;
        "
      >
        Reservation Details
      </div>
      <div
        style="
          position: absolute;
          top: 85px;
          left: 29px;
          background-color: #d9d9d9;
          width: 618px;
          height: 21px;
        "
      ></div>
      <div
        style="
          position: absolute;
          top: 85px;
          left: -115px;
          line-height: 20px;
          text-transform: capitalize;
          font-family: Poppins;
          text-align: center;
          display: inline-block;
          width: 396px;
          height: 20px;
        "
      >
        Reservation Details
      </div>
      <div
        style="
          position: absolute;
          top: 123px;
          left: 32px;
          line-height: 20px;
          text-transform: capitalize;
          font-weight: 500;
          display: inline-block;
          width: 396px;
          height: 20px;
        "
      >
        Property Name: prop
      </div>
    </div>
    <div
      style="
        position: absolute;
        top: -7px;
        left: 0px;
        font-size: 13px;
        line-height: 70px;
        text-transform: capitalize;
        font-weight: 500;
        color: #fff;
        text-align: center;
        display: inline-block;
        width: 656px;
        height: 61px;
      "
    >
      RESERVATION RECEIPT
    </div>
  </div>
  </body>
    `;

    const iframe = templateDiv.querySelector("iframe");

  if (iframe) {
    // Wait for iframe content to load
    iframe.onload = () => {
      html2canvas(templateDiv).then((canvas) => {
       // const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF();
       // pdf.addImage(imgData, "PNG", 10, 10);
        pdf.save("your_file.pdf");
      });
    };
  }
};

*/}


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
            <CompletedChip /> 
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
        const propName = params.row.Property;
        localStorage.setItem('propName', propName);
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
    {/* 
    {
      field: "download",
      headerName: "Download",
      headerAlign: "center", 
      headerClassName: 'custom-header-class',
      align: "center", 
      width: 80,
      renderCell: (params) => (
        <>
      
        <IconButton onClick = {generatePdf} >
          <DownloadRoundedIcon style={{ color: '0F52BA' , display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} />
        </IconButton>
     
        </>

      ),
       */}
     
    
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
