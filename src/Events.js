import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

function Events() {
  const [events, setEvents] = useState([]);
  const [chartInstance, setChartInstance] = useState(null);

  const handleEventSubmit = (e) => {
    e.preventDefault();

    const { eventName, eventDate, eventTime } = e.target.elements;

    if (eventName.value && eventDate.value && eventTime.value) {
      const newEvent = {
        id: events.length + 1,
        name: eventName.value,
        date: eventDate.value,
        time: eventTime.value,
      };

      setEvents((prevEvents) => [...prevEvents, newEvent]);
      e.target.reset();
    }
  };

  const drawChart = () => {
    const counts = events.reduce((acc, event) => {
      acc[event.date] = (acc[event.date] || 0) + 1;
      return acc;
    }, {});

    const ctx = document.getElementById('eventChart').getContext('2d');

    // Check if a chart instance exists and destroy it
    if (chartInstance) {
      chartInstance.destroy();
    }

    // Create a new Chart instance and set it to state
    const newChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(counts),
        datasets: [{
          label: 'Events',
          data: Object.values(counts),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        }],
      },
    });

    setChartInstance(newChartInstance);
  };

  // Trigger chart drawing on component mount and when events change
  useEffect(() => {
    drawChart();
  }, [events]);

  return (
    <div className="events-container">
      <section>
        <h2>Create Event</h2>
        <form onSubmit={handleEventSubmit}>
          <label htmlFor="eventName">Event Name:</label>
          <input type="text" id="eventName" name="eventName" required />

          <label htmlFor="eventDate">Event Date:</label>
          <input type="date" id="eventDate" name="eventDate" required />

          <label htmlFor="eventTime">Event Time:</label>
          <input type="time" id="eventTime" name="eventTime" required />

          <button type="submit">Create Event</button>
        </form>
      </section>

      <section>
        <h2>Scheduled Events</h2>
        <div>
          <canvas id="eventChart" width="400" height="200"></canvas>
        </div>
      </section>
    </div>
  );
}

export default Events;
