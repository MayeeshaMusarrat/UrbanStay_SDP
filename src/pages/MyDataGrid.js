
import { useState, useCallback, useEffect } from "react";
import SignoutConfirmationPopup from "../components/SignoutConfirmationPopup";
import PortalPopup from "../components/PortalPopup";
import { useNavigate } from "react-router-dom";
import styles from "./MyListings.module.css";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Rating from '@mui/material/Rating';

function MyDataGrid({ data }) {
  
const columns = [
    {
      field: 'Property',
      headerName: 'Property',
      width: 200,
      
    },
    {
      field: 'Status',
      headerName: 'Status',
      width: 100,
      
    },
    {
      field: 'bedrooms',
      headerName: 'Bedrooms',
    
      width: 100,
      
    },
    {
      field: 'beds',
      headerName: 'Beds',
      
      width: 80,
      
    },
    {
      field: 'baths',
      headerName: 'Baths',
      width: 80,
      
    },
    {
      field: 'rooms',
      headerName: 'Rooms',
      width: 90,
      
    },
    {
      field: 'guests',
      headerName: 'Guests',
      width: 100,
      
    },
    {
      field: 'location',
      headerName: 'Location',
      width: 130,
      
    },
    {
      field: 'Check_in',
      headerName: 'Check-in',
      width: 130,
      
    },
    {
      field: 'Check_out',
      headerName: 'Check-out',
      width: 130,
      
    },
    {
      field: 'price',
      headerName: 'Total Price',
      width: 110,
      
    },
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
  ];

  return (
    <div>
      <Box sx={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={data}
            getRowId={(rows) => rows.id} 
            columns={columns}
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
    </div>
  );
}

export default MyDataGrid;