import React, { useState, useEffect } from 'react';
import Slider from '@mui/material/Slider';
import styled from 'styled-components';

const PrettoSlider = styled(Slider)({
  color: '#2c2e97',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#2c2e97',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});

const PriceSlider = () => {
  
  const [selectedRange, setSelectedRange] = useState([500, 60000]);
  const handleRangeChange = (event, newValue) => {
    setSelectedRange(newValue);
  };

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  useEffect(() => {
    setMinPrice(selectedRange[0]);
    setMaxPrice(selectedRange[1]);
    localStorage.setItem("minprice", minPrice);
    localStorage.setItem("maxprice", maxPrice);
  }, [selectedRange]);


 
  return (
    <div>
      <PrettoSlider
        value={selectedRange}
        min={500}
        max={60000}
        step={1000}
        onChange={handleRangeChange}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `${value}`}
      />
      <div style = {{fontSize: 14}}>
        Selected Range: {`BDT ${selectedRange[0]} - BDT ${selectedRange[1]}`}
      </div>
      
    </div>
  );
};

export default PriceSlider;
