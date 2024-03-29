import React, { useState, useEffect } from "react";
import { RangePicker as ReactRangePicker } from "react-trip-date";
import dayjs from "dayjs";
import axios from 'axios';

export const Calendar = ({
  initialRangeValuesProps,
  onRangeChange,
  initialMonthAndYear,
  setOnRangeDateInScreen,
  initialDisabledBeforeDate, 
  initialDisabledAfterDate, 
}) => {
  const PID = localStorage.getItem('PID');
  
  const datesCalendar = JSON.parse(localStorage.getItem('rangeValues'));
  const checkIn = dayjs(datesCalendar.from).format("YYYY-MM-DD");
  const checkOut = dayjs(datesCalendar.to).format("YYYY-MM-DD");
  
  const [disabledBeforeDate, setDisabledBeforeDate] = useState(initialDisabledBeforeDate); 
  const [disabledAfterDate, setDisabledAfterDate] = useState(initialDisabledAfterDate); 
  
  const [disabledDates, setDisabledDates] = useState([]);
  
  useEffect(() => {
    axios.get(`http://localhost:5001/disabled-dates/${PID}`)
      .then((response) => {
        
        const data = response.data;
        const disabledDatesArray = data.flatMap((range) => {
          const startDate = dayjs(range.Start_date);
          const endDate = dayjs(range.End_date);
          const daysDifference = endDate.diff(startDate, 'day');
          
          return Array.from({ length: daysDifference + 1 }, (_, index) => {
            const formattedDate = startDate.add(index, 'day').format('YYYY-MM-DD');
            return formattedDate;
          });
        });

        setDisabledDates(disabledDatesArray);
      })
      .catch((error) => {
        console.error('Error fetching disabled dates:', error);
      });
  }, [PID]);
  
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

  const rangePickerProps = {
    theme: theme,
    initialMonthAndYear: initialMonthAndYear,
    selectedDays: rangeValues,
    autoResponsive: true,
    numberOfMonths: 4,
    disabledBeforeToday: true,
    disabledDays: disabledDates, 
   // disabledBeforeToday: disabledBeforeDate, // Use the state variable
   // disabledAfterDate: disabledAfterDate, // Use the state variable
    onRangeDateInScreen: (e) => setOnRangeDateInScreen(e),
  };

  return <ReactRangePicker {...rangePickerProps} />;
};
