import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
// Ensure you have Tailwind CSS set up

// Moment.js localization
const localizer = momentLocalizer(moment);

// Sample orders data
const orders = [
  {
    id: 1,
    title: "1 orders",
    start: new Date(2024, 8, 2), // Month is 0-indexed (so 8 means September)
    end: new Date(2024, 8, 2),
  },
  {
    id: 2,
    title: "2 orders",
    start: new Date(2024, 8, 3),
    end: new Date(2024, 8, 3),
  },
  {
    id: 3,
    title: "2 orders",
    start: new Date(2024, 8, 9),
    end: new Date(2024, 8, 9),
  },
  {
    id: 4,
    title: "2 orders",
    start: new Date(2024, 8, 10),
    end: new Date(2024, 8, 10),
  },
];

const Order = () => {
  const [view, setView] = useState("month"); // Current view state (month, week, day)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Order </h1>

      {/* Calendar UI */}
      <Calendar
        localizer={localizer}
        events={orders}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={["month", "week", "day", "agenda"]}
        step={60}
        showMultiDayTimes
        defaultDate={new Date(2024, 8, 1)} // Default to September 2024
        className="bg-white shadow-md rounded-lg"
        eventPropGetter={() => ({
          className: "bg-blue-500 text-white px-2 py-1 rounded",
        })}
      />

      {/* Add navigation buttons */}
      <div className="flex justify-end mt-4">
        <button
          onClick={() => setView("month")}
          className={`px-4 py-2 bg-gray-100 rounded-md mr-2 ${
            view === "month" ? "bg-blue-500 text-white" : ""
          }`}
        >
          Month
        </button>
        <button
          onClick={() => setView("week")}
          className={`px-4 py-2 bg-gray-100 rounded-md mr-2 ${
            view === "week" ? "bg-blue-500 text-white" : ""
          }`}
        >
          Week
        </button>
        <button
          onClick={() => setView("day")}
          className={`px-4 py-2 bg-gray-100 rounded-md ${
            view === "day" ? "bg-blue-500 text-white" : ""
          }`}
        >
          Day
        </button>
      </div>
    </div>
  );
};

export default Order;
