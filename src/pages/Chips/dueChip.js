import React from 'react';
import Chip from '@mui/material/Chip';

const CustomChip = () => {
  const chipStyle = {
    border: '2px solid red',
    backgroundColor: 'transparent',
    color: 'red',
    borderRadius: '1px',
    fontWeight: 'bold', 
  };

  return (
    <Chip label="DUE" style={chipStyle} />
  );
};

export default CustomChip;
