import React from 'react';
import Chip from '@mui/material/Chip';
import ErrorIcon from '@mui/icons-material/Error';

const CancelledChip = () => {
  return (
    <Chip
      label="Cancelled"
      color="default"
      variant="outlined"
      style={{ borderColor: 'red', color: 'red' }}
      icon={<ErrorIcon style={{ color: 'red' }} />}
    />
  );
};

export default CancelledChip;
