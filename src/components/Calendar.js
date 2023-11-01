import React, { useState, useEffect } from "react";
import { RangePicker as ReactRangePicker } from "react-trip-date";
import dayjs from "dayjs";

export const Calendar = ({
  initialRangeValuesProps,
  onRangeChange,
  initialMonthAndYear,
  setOnRangeDateInScreen
}) => {
 
  const rangeValues = {
    from: "2023-11-22",
    to: "2023-11-25"
  };
  
  const theme = {
    primary: {
      light: "#757ce8",
     main: "#2c2e97",
       dark: "#002884",
     },
     grey: {
       700: "#707070",
       900: "#1b1b1d",
     },
     background: {
       default: "#f5f5f5",
     },
     text: {
       disabled: "#BABABA",
     },
   };


  console.log("range value: ", rangeValues);

  const rangePickerProps = {
    theme: theme,
    initialMonthAndYear: initialMonthAndYear,
    selectedDays: rangeValues,
    autoResponsive: true,
    numberOfMonths: 4,
    disabledBeforeToday: true,
    disabledBeforeDate: dayjs().add(1, "day"),
    onRangeDateInScreen: (e) => setOnRangeDateInScreen(e)
  };

 

  return <ReactRangePicker 
   {...rangePickerProps} />;
};
