// DatePicker.jsx
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Calendar = ({ selectedDate, handleDateChange }) => {
  return (
    <div className="mt-4">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy/MM/dd"
        className="w-full py-2 px-3 border rounded-md shadow-md focus:outline-none focus:ring focus:border-blue-300"
      />
    </div>
  );
};

export default Calendar;
