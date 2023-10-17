import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import moment from 'moment';

function Calendar() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: '',
    end: '',
    details: '', // New "details" field
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPastDatePopupOpen, setIsPastDatePopupOpen] = useState(false);

  const handleDateClick = (arg) => {
    const clickedDate = moment(arg.date);
    const currentDate = moment();

    if (clickedDate.isSameOrAfter(currentDate, 'day')) {
      const start = clickedDate.format('YYYY-MM-DD');
      setNewEvent({
        title: '',
        start,
        end: '',
        details: '', // Clear the "details" field
      });
      setIsPopupOpen(true); // Open the popup when a date is clicked
    } else {
      setIsPastDatePopupOpen(true); // Open the past date warning popup
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false); // Close the main popup
    setIsPastDatePopupOpen(false); // Close the past date warning popup
  };

  const handleEventClick = (info) => {
    const { start, end, title, details } = info.event.extendedProps;
    setNewEvent({
      title,
      start: moment(start).format('YYYY-MM-DD'),
      end: moment(end).format('YYYY-MM-DD'),
      details,
    });
    setIsPopupOpen(true); // Open the popup when an event is clicked
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddEvent = () => {
    const startMoment = moment(newEvent.start);
    const endMoment = moment(newEvent.end);

    if (newEvent.title && startMoment.isValid() && endMoment.isValid()) {
      const currentDate = moment();

      if (startMoment.isSameOrAfter(currentDate, 'day') && endMoment.isSameOrAfter(startMoment, 'day')) {
        setEvents([...events, newEvent]);
        setNewEvent({
          title: '',
          start: '',
          end: '',
          details: '', // Clear the "details" field
        });
        setIsPopupOpen(false); // Close the main popup after adding an event
      } else {
        setIsPastDatePopupOpen(true); // Open the past date or invalid date warning popup
      }
    }
  };

  useEffect(() => {
    // You can save events to your database or storage here
  }, [events]);

  return (
    <div className="w-full p-8 bg-gray-100 flex flex-col">
      <div className={`p-4 bg-gray-700 rounded-md shadow-md ${isPopupOpen ? 'hidden' : ''}`}>
        <h3 className="text-3xl mb-4 text-white font-bold">Add Event</h3>
        <input
          type="text"
          name="title"
          value={newEvent.title}
          onChange={handleInputChange}
          placeholder="Event Title"
          className="w-full border bg-transparent focus:border-orange-300 rounded-md p-2 mb-2 focus:outline-none text-white"
        />
        <div className="flex gap-12">
          <div className='flex space-x-4'>
            <label htmlFor="startDate" className='text-blue-100'>Start Date:</label>
            <input
              type="date"
              name="start"
              value={newEvent.start}
              onChange={handleInputChange}
              placeholder="Start Date"
              className="w-full bg-transparent text-white border border-gray-300 rounded-md p-2 mb-2"
            />
          </div>
          <div className='flex space-x-4'>
            <label htmlFor="endDate" className='text-blue-100'>End Date:</label>
            <input
              type="date"
              name="end"
              value={newEvent.end}
              onChange={handleInputChange}
              placeholder="End Date"
              className="w-full bg-transparent border border-gray-300 rounded-md p-2 mb-2 text-white"
            />
          </div>
        </div>
        <textarea
          name="details"
          value={newEvent.details}
          onChange={handleInputChange}
          placeholder="Event Details"
          className="w-full text-white bg-transparent border border-gray-300 rounded-md p-2 my-2 focus:outline-none focus:border-orange-300"
        />
        <button
          onClick={handleAddEvent}
          className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 cursor-pointer"
        >
          Add Event
        </button>
      </div>
      <div className={`mt-4 flex-1 ${isPopupOpen ? 'hidden' : ''}`}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events.map((event, index) => ({
            ...event,
            extendedProps: { details: event.details }, // Store "details" in extendedProps
          }))}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          height="auto"
        />
      </div>
      <div className={`p-4 bg-gray-300 rounded-md shadow-md ${isPopupOpen ? '' : 'hidden'}`}>
        <button onClick={closePopup} className="float-right text-gray-600 text-xl cursor-pointer">
          &#10006; {/* Close icon */}
        </button>
        <h3 className="text-xl mb-4">Event Details</h3>
        <ul>
          {events.map((event, index) => (
            <li key={index} className="mb-2">
              {event.title} ({event.start} - {event.end}) - {event.details}
            </li>
          ))}
        </ul>
      </div>
      <div className={`p-4 bg-blue-500 rounded-md shadow-md ${isPastDatePopupOpen ? '' : 'hidden'} fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
        <button onClick={() => setIsPastDatePopupOpen(false)} className="float-right text-white text-xl cursor-pointer">
          &#10006; {/* Close icon */}
        </button>
        <h3 className="text-xl mb-4 text-red-500">Warning</h3>
        <p className='text-white'>You cannot add an event to a date that is already in the past or has an invalid date range.</p>
      </div>
    </div>
  );
}

export default Calendar;
