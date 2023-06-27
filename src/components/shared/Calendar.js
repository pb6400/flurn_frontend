import React from 'react';
import Calendar from 'react-calendar';

const CustomCalendar = ({ selectedDate, onDateChange }) => {
  return (
    <div>
      <Calendar value={selectedDate} onChange={onDateChange} />
    </div>
  );
};

export default CustomCalendar;
