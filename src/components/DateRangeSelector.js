import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import { defaultStaticRanges } from "./defaultRanges";
import { format } from "date-fns";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import "./Datepicker.css";

import PropTypes from "prop-types";

const DateRangeSelector = ({ ranges, onChange, onSubmit, ...rest }) => {
     const [selectedDateRange, setSelectedDateRange] = useState({
          startDate: new Date(),
          endDate: new Date(),
          key: "selection"
     });
     const [show, setShow] = useState(false);

     function formatDateDisplay(date, defaultText) {
          if (!date) return defaultText;
          return format(date, "mm/dd/yyyy");
     }

     const handleSelect = ranges => {
          setSelectedDateRange(ranges.selection);
          console.log(ranges.selection);
     };

      const onClickDone = () => {
         // onSubmit(selectedDateRange); 
    
          localStorage.setItem('DateRange', JSON.stringify(selectedDateRange));
         console.log(selectedDateRange);
          setShow(true);
      };

     const onClickClear = () => {
          setSelectedDateRange({
               startDate: new Date(),
               endDate: new Date(),
               key: "selection"
          });
          setShow(false);
          localStorage.clear();
     };

     return (
          <React.Fragment>
               <div className="shadow d-inline-block">
                    <DateRangePicker
                         onChange={handleSelect}
                         showSelectionPreview={true}
                         moveRangeOnFirstSelection={false}
                         months={2}
                         ranges={[selectedDateRange]}
                         direction="horizontal"
                    />
                    <div className="text-right position-relative rdr-buttons-position mt-2 mr-3" >
                         <button
                              className="btn btn-transparent text-primary rounded-0 px-4 mr-2"
                              onClick={onClickDone}
                         >
                              Done
                         </button>

                         <button
                              className="btn text-danger rounded-0 px-4"
                              onClick={onClickClear}
                         >
                              Clear
                         </button>
                    </div>
               </div>

              
          </React.Fragment>
     );
};

DateRangeSelector.defaultProps = {
     ranges: defaultStaticRanges
};

DateRangeSelector.propTypes = {
     onSubmit: PropTypes.func
};

export default DateRangeSelector;
