import React from 'react';
import Chip from '@mui/material/Chip';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';

const PendingChip = () => {
  return (
    <Chip
      label="Pending"
      color="default"
      variant="outlined"
      style={{ borderColor: 'orange', color: 'orange' }}
      icon={<PauseCircleFilledIcon style={{ color: 'orange'}} />}
    />
  );
};

export default PendingChip;
