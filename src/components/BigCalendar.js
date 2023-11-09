import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';


const localizer = momentLocalizer(moment);

const BigCalendar = ({ events }) => {
  // Define events for booked and reserved slots
  const bookedEvents = events.filter(event => event.status === 'booked');
  const reservedEvents = events.filter(event => event.status === 'reserved');

  // Define the colors for booked and reserved slots
  const bookedSlotColor = 'green'; // Customize the color as needed
  const reservedSlotColor = 'yellow'; // Customize the color as needed

  console.log(bookedSlotColor);


 

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        views={["month"]}
        defaultView="month"
        startAccessor="start"
        endAccessor="end"
        style={{ height: 685, fontSize: 15, color: "gray" }} // Set the desired calendar height
        // Define background events with distinct colors
        backgroundEvents={{color: "green"}}
      />
     
    </div>
  );
};

export default BigCalendar;
