import React from 'react';
import Chip from '@mui/material/Chip';

const CustomChip = () => {
  const chipStyle = {
    border: '2px solid green',
    backgroundColor: 'transparent',
    color: 'green',
    borderRadius: '1px',
    fontWeight: 'bold',
  };

  return (
    <Chip label="PAID" style={chipStyle} />
  );
};

export default CustomChip;
