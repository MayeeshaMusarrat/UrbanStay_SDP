
import { useState, useCallback, useEffect } from "react";
import SignoutConfirmationPopup from "../components/SignoutConfirmationPopup";
import PortalPopup from "../components/PortalPopup";
import { useNavigate } from "react-router-dom";
import styles from "./MyListings.module.css";
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridApi, GridCellValue } from '@mui/x-data-grid';
import Rating from '@mui/material/Rating';
import Button from "@mui/material/Button";
import FindInPageIcon from '@mui/icons-material/FindInPage';
import './DataGridStyles.css';
import PropertyDetailsPopup from '../components/PropertyDetailsPopup';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import './CustomDataGrid.css'; 


function MyDataGrid({ data }) {

  const [openPopup, setOpenPopup] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);


  
  const openPopupWithRow = (rowData) => {
    setSelectedRow(rowData);
    setOpenPopup(true);
  };
  
  const closePopup = () => {
    setSelectedRow(null);
    setOpenPopup(false);

    console.log("Inside closePopup function");
  };
  
const columns: GridColDef[] = [
  {
    field: "action",
    headerName: "",
    sortable: false,
    width: 10,
    renderCell: (params) => (
      <IconButton
        onClick={() => {
          setSelectedRow(params.row); 
          setOpenPopup(true); 
        }}
      >
        <FindInPageIcon />
      </IconButton>
    ),
    disableSelectionOnClick: true,
  },


    {
      field: 'Property',
      headerName: 'Property',
      width: 200,
      sortable: false, 
      disableSelectionOnClick: true,
      
    },
    /*{
      field: 'Status',
      headerName: 'Status',
      width: 150,
      
    },*/


    {
      field: 'reservedBypresent',
      headerName: 'Presently Reserved By',
      width: 500,
      renderCell: (params) => {
        return (
          <AvatarGroup
            renderSurplus={(surplus) => <span>+{surplus.toString()[0]}k</span>}
            total = {5}
          >
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
          </AvatarGroup>
        );
      },
      disableSelectionOnClick: true,
    },

    {
      field: 'pastReserved',
      headerName: 'Past Reservations',
      width: 400,
      renderCell: (params) => {
        return (
          <AvatarGroup
            renderSurplus={(surplus) => <span>+{surplus.toString()[0]}k</span>}
            total = {24}
          >
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
          </AvatarGroup>
        );
      },
      disableSelectionOnClick: true,
    },
    
    


    /*
    {
      field: 'paidAmount',
      headerName: 'Paid Amount',
      width: 150,
      
    },

   
    {
      field: 'reservedDates',
      headerName: 'Reservation Dates',
      width: 250,
      sortable: true, 
      
    },

    {
      field: 'reservedOn',
      headerName: 'Reserved On',
      width: 150,
      
    },
    */

    {
      field: 'reviews',
      headerName: 'Reviews',
      width: 150,
      disableSelectionOnClick: true,
      
    },

    /*
    {
      field: 'ratings',
      headerName: 'Average Rating',
      width: 150,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
         
          <Rating name="read-only" value={params.value} readOnly />
          
        </div>
      ),
      
    },
    */
  ];
/*
  const getCellClassName = (params) => {
    if (params.field === 'Status') {
      if (params.value === 'Available') {
        return 'available-cell';
      } else if (params.value === 'Reserved') {
        return 'booked-cell';
      }
    }
    return '';
  };
  */

  return (
    <div>
      <Box sx={{ height: 630, width: '100%' }}>
          <DataGrid
            rows={data}
            getRowId={(rows) => rows.id} 
            columns={columns}
            className="custom-data-grid"
            //getCellClassName={getCellClassName}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
          />
        </Box>

        {selectedRow && (
  <PortalPopup
    overlayColor="rgba(113, 113, 113, 0.3)"
    placement="Centered"
    onOutsideClick={closePopup}
  >
    <PropertyDetailsPopup rowData={selectedRow} onClose={closePopup} />
  </PortalPopup>
)}

    </div>
  );
}

export default MyDataGrid;