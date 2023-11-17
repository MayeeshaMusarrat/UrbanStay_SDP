import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';


const localizer = momentLocalizer(moment);

const BigCalendar = ({ events }) => {

  const bookedEvents = events.filter(event => event.status === 'booked');
  const reservedEvents = events.filter(event => event.status === 'reserved');

  const bookedSlotColor = 'green'; 
  const reservedSlotColor = 'orange'; 

  console.log(bookedSlotColor);

  const eventStyleGetter = (event, start, end, isSelected) => {
    return {
      style: {
        fontSize: '12px', 
      },
    };
  };


  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        views={["month"]}
        defaultView="month"
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, fontSize: 12, color: "gray" }} 
        eventPropGetter={eventStyleGetter}
      />
     
    </div>
  );
};

export default BigCalendar;
