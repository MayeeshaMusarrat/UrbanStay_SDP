import React from 'react';
import Chip from '@mui/material/Chip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ReservedChip = () => {
  return (
    <Chip
      label="Reserved"
      color="default"
      variant="outlined"
      style={{ borderColor: 'green', color: 'green' }}
      icon={<CheckCircleIcon style={{ color: 'green' }} />}
    />
  );
};

export default ReservedChip;
