// Import React and the hooks
// useEffect runs code when the component loads
// userstate stores data in the component
import React, { useEffect, useState } from 'react';

// Import the CSS file for styling
import './App.css';

function App() {
  // Declare a state variable call `temperatures` to store data from backend
  // useState([]) initiallizes it as an empty array
  const [temperatures, setTemperature] = useState([]);

  // useEffect runs automatically ONCE when the component loads (= componentDidMount in older React)
  useEffect(() => {
    // fetch data from backend server (GET /api/temperatures)
    fetch('http://localhost:4000/api/temperatures')
    .then(response => response.json()) // Convert the response into JSON format
    .then(data => setTemperature(data)) // Store the sata into `temperatures` state
    .catch(error => console.error('Error fetching temperatures: ', error)); // Handle fetch error
  }, []); // Empty array means this only runs once on first render

  
  // What to show on the screen (JSX)
  return (
    <div className = "App">
      {/* Main Heading */}
      <h1>🌎 Climate Data</h1>

      {/* Conditional rendering: of temperatures not yet loaded, show "Loading..." */}
      {temperatures.length === 0 ? (
        <p>Loading...</p>
      ) : (
        // if the data exists,  map over and display each item as a list
        <ul>
          {temperatures.map((temp) => (
            <li key={temp.id}>
              {/* Show each temperature record with location, temperature, and day */}
              {temp.location} - {temp.temperature_celsius}°C / {temp.temperature_fahrenheit}°F on {temp.day_of_week}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Export the App component so it can be run in index.js
export default App;