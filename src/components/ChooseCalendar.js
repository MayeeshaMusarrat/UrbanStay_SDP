import React, { useState, useEffect } from "react";
import { RangePicker as ReactRangePicker } from "react-trip-date";
import dayjs from "dayjs";

const ChooseCalendar = ({
  initialRangeValuesProps,
  onRangeChange,
  initialMonthAndYear,
  setOnRangeDateInScreen
}) => {
  const [rangeValues, setRangeValues] = useState(initialRangeValuesProps);

  useEffect(() => {
    setRangeValues(initialRangeValuesProps);
  }, [initialRangeValuesProps]);




  const theme = {
    primary: {
      light: "#757ce8",
      main: "#371DAE",
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
    numberOfMonths: 2,
    disabledBeforeToday: true,
    disabledBeforeDate: dayjs().add(1, "day"),
    onRangeDateInScreen: (e) => setOnRangeDateInScreen(e)
  };

  const onChange = (e) => {
    setRangeValues(e);
    onRangeChange(e);
    localStorage.setItem("rangeValues", JSON.stringify(e));
  };

  return <ReactRangePicker {...rangePickerProps} onChange={onChange} />;
};

export default ChooseCalendar;
