import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import Header from './Header';
import Footer from './Footer';
import { getDatabase, ref, push, get } from 'firebase/database';

function Events() {
  const [chartInstance, setChartInstance] = useState(null);
  const database = getDatabase();
  
  const [events, setEvents] = useState({
    eventName: '',
    eventDate: '',
    eventTime: '',
  });
  
  const handleTextChange = (event) => {
    const { name, value } = event.target;
    setEvents((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newData = { ...events };
      push(ref(database, 'events'), newData)
        .then(() => {
          alert('Event saved successfully!');
          setEvents({
            eventName: '',
            eventDate: '',
            eventTime: '',
          });
        })
        .catch((error) => {
          alert('Error saving event. Please try again later.');
        });
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  useEffect(() => {
    const drawChart = (eventsData) => {
      const counts = eventsData.reduce((acc, event) => {
        const date = event.eventDate;
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});
  
      const dates = Object.keys(counts).sort();
      const data = dates.map(date => counts[date]);
  
      const ctx = document.getElementById('eventChart').getContext('2d');
  
      const newChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: dates,
          datasets: [{
            label: 'Events',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          }],
        },
      });
      setChartInstance(newChartInstance);
    };
  
    const fetchEvents = async () => {
      try {
        const eventsRef = ref(database, 'events');
        const snapshot = await get(eventsRef);
        const eventsData = [];
  
        if (snapshot.exists()) {
          snapshot.forEach((childSnapshot) => {
            eventsData.push({ id: childSnapshot.key, ...childSnapshot.val() });
          });
          setEvents(eventsData);
          drawChart(eventsData); 
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
  
    fetchEvents();
  }, []); 

  return (
    <div>
      <Header />
      <div className="events-container">
        <section>
          <h2>Create Event</h2>
          <form className="event-form" onSubmit={handleSubmit}>
            <label htmlFor="eventName">Event Name</label>
            <input type="text" name="eventName" value={events.eventName} onChange={handleTextChange} required />

            <label htmlFor="eventDate">Event Date</label>
            <input type="date" name="eventDate" value={events.eventDate} onChange={handleTextChange} required />

            <label htmlFor="eventTime">Event Time</label>
            <input type="time" name="eventTime" value={events.eventTime} onChange={handleTextChange} required />

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
      <Footer />
    </div>
  );
}

export default Events;

