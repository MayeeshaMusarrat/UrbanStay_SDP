
import { useState, useCallback, useEffect } from "react";
import SignoutConfirmationPopup from "../components/SignoutConfirmationPopup";
import PortalPopup from "../components/PortalPopup";
import { useNavigate } from "react-router-dom";
import styles from "./MyListings.module.css";
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridApi, GridCellValue } from '@mui/x-data-grid';
import Rating from '@mui/material/Rating';
import Button from "@mui/material/Button";

function MyDataGrid({ data }) {
  
const columns: GridColDef[] = [
  /*{
    field: "action",
    headerName: "Action",
    sortable: false,
    renderCell: () => {
      return <Button>Click</Button>;
    }
  },*/


    {
      field: 'Property',
      headerName: 'Property',
      width: 290,
     
      
    },
    {
      field: 'Status',
      headerName: 'Status',
      width: 150,
      
    },

    {
      field: 'reservedBy',
      headerName: 'Reserved By',
      width: 250,
      
    },

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

    {
      field: 'reviews',
      headerName: 'Reviews',
      width: 150,
      
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