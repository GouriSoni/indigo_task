import React, { useEffect, useState } from 'react';
import './App.css';

const initialFlights = [
  { id: 1, number: 'AA123', status: 'On Time', gate: 'A1' },
  { id: 2, number: 'BA456', status: 'Delayed', gate: 'B2' },
  { id: 3, number: 'CA789', status: 'Cancelled', gate: 'C3' },
  { id: 4, number: 'DA789', status: 'On Time', gate: 'D4' },
  { id: 5, number: 'EA789', status: 'On Time', gate: 'B2' }
];

const statuses = ['On Time', 'Delayed', 'Cancelled', 'Boarding'];

const getRandomIndex = (length) => {
  return Math.floor(Math.random() * length);
};

const getRandomStatus = () => {
  return statuses[getRandomIndex(statuses.length)];
};

function App() {
  const [flights, setFlights] = useState(initialFlights);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const flightIndex = getRandomIndex(flights.length);
      const randomStatus = getRandomStatus();
      const updatedFlight = { ...flights[flightIndex], status: randomStatus };

      setFlights(prevFlights => 
        prevFlights.map(flight => 
          flight.id === updatedFlight.id ? updatedFlight : flight
        )
      );

      setNotifications(prevNotifications => [
        // ...prevNotifications, 
       ` Flight ${updatedFlight.number} status changed to ${updatedFlight.status}.`
      ]);
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [flights]);

  return (
    <div className="App">
      <h1>Flight Status</h1>
      <FlightList flights={flights} />
      <Notifications notifications={notifications} />
    </div>
  );
}

function FlightList({ flights }) {
  return (
    <div>
      {flights.map(flight => (
        <div key={flight.id} className="flight">
          <p>Flight: {flight.number}</p>
          <p>Status: {flight.status}</p>
          <p>Gate: {flight.gate}</p>
        </div>
      ))}
    </div>
  );
}

function Notifications({ notifications }) {
  return (
    <div className="notifications">
      <h2>Notifications</h2>
      {notifications.map((notification, index) => (
        <div key={index} className="notification">
          {notification}
        </div>
      ))}
    </div>
  );
}

export default App;