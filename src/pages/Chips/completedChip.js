import React from 'react';
import Chip from '@mui/material/Chip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const CompletedChip = (content) => {
  return (
    <Chip
      label="Completed"
      color="default"
      variant="outlined"
      style={{ borderColor: 'green', color: 'green' }}
      icon={<CheckCircleIcon style={{ color: 'green' }} />}
    />
  );
};

export default CompletedChip;
