import React, { useState, useEffect } from "react";
import { RangePicker as ReactRangePicker } from "react-trip-date";
import dayjs from "dayjs";
import axios from 'axios';


export const Calendar = ({
  initialRangeValuesProps,
  onRangeChange,
  initialMonthAndYear,
  setOnRangeDateInScreen,
}) => {

  const PID = localStorage.getItem('PID');

  const datesCalendar = JSON.parse(localStorage.getItem('dateRange'));
  const dates = {
    startDate: datesCalendar.startDate,
    endDate: datesCalendar.endDate,
    key: datesCalendar.key
  };
  let checkIn = new Date(dates.startDate);
  let checkOut = new Date(dates.endDate);
  checkIn = checkIn.toISOString().split('T')[0];
  checkOut = checkOut.toISOString().split('T')[0];

  const format = "YYYY-MM-DD";

 
    
  const rangeValues = {
    from: checkIn,
    to: checkOut
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

   const [disabledDates, setDisabledDates] = useState([]);

  useEffect(() => {

    console.log("in calendar");
    
    axios.get(`http://localhost:5001/disabled-dates/${PID}`) 
      .then((response) => {
        
      })
      .then ((data)=>{
        console.log("data are:", data);

        const dataa = data.fetchResults.map(result => ({
          
          start: result.Start_date,
          end: result.End_date,
          
        }));

        console.log("dataa: ",dataa);
        
        setDisabledDates(dataa);
      })
      .catch((error) => {
        console.error('Error fetching disabled dates:', error);
      });
  }, []);


  console.log("range value: ", rangeValues);

  const rangePickerProps = {
    theme: theme,
    initialMonthAndYear: initialMonthAndYear,
    selectedDays: rangeValues,
    autoResponsive: true,
    numberOfMonths: 4,
    disabledBeforeToday: true,
   // disabledBeforeDate: dayjs().add(1, "day"),
    disabledDays: disabledDates,
    onRangeDateInScreen: (e) => setOnRangeDateInScreen(e)
  };

 

  return <ReactRangePicker 
   {...rangePickerProps} />;
};
