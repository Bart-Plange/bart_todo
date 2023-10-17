import './calendar.css'
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const DateSelector = ({ selectedDate, handleDateChange }) => {
  const [selectedDates, setSelectedDates] = useState([]);

  const handleDateSelect = (date) => {
    // Create a copy of the existing selected dates and add the new date
    const updatedDates = [...selectedDates, date];
    setSelectedDates(updatedDates);

    // Invoke the callback function to handle date change
    handleDateChange(updatedDates);
  };

  const handleDateClear = (index) => {
    const updatedDates = [...selectedDates];
    updatedDates.splice(index, 1);
    setSelectedDates(updatedDates);
    handleDateChange(updatedDates);
  };

  return (
    <div className="mt-4">
      <Calendar
        onChange={handleDateSelect}
        value={selectedDate}
        className="custom-calendar"
      />
      <div className="mt-4">
        <h3 className="text-lg font-bold mb-2">Selected Dates:</h3>
        <ul>
          {selectedDates.map((date, index) => (
            <li key={index} className="mb-2 text-blue-600">
              {date.toDateString()}
              <button
                className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
                onClick={() => handleDateClear(index)}
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DateSelector;
