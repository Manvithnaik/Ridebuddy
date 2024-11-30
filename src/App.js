import React, { useState } from 'react';
import EcoImpact from './EcoImpact';  // Import the EcoImpact component
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './App.css'; // Import the CSS for styling

function App() {
  const [distance, setDistance] = useState(0);
  const [fuelType, setFuelType] = useState('petrol');
  const [trafficCondition, setTrafficCondition] = useState('light');
  const [idleTime, setIdleTime] = useState(0);
  const [numberOfRiders, setNumberOfRiders] = useState(1);
  const [totalEmissions, setTotalEmissions] = useState(0);
  const [carbonSavings, setCarbonSavings] = useState(0);
  const [latestSavings, setLatestSavings] = useState(0);

  const calculateEmissions = () => {
    // Constants
    const baseEmissionsPerKm = 251; // Base emission per km for petrol/diesel in grams
    const trafficAdjustments = {
      light: 1,  // No change for light traffic
      moderate: 1.1,  // 10% increase for moderate traffic
      heavy: 1.2,  // 20% increase for heavy traffic
    };
    const fuelAdjustments = {
      petrol: 1, // Base emission for petrol
      diesel: 1.15, // 15% more for diesel
      ev: 0, // No emissions for EV
    };
    const idleEmissionsPerMin = 10; // 10 grams per minute of idle time
    const nighttimeFactor = (new Date().getHours() >= 20 || new Date().getHours() <= 6) ? 0.95 : 1; // 5% reduction during nighttime

    // Adjustments based on user inputs
    const fuelAdjustment = fuelAdjustments[fuelType];
    const trafficAdjustment = trafficAdjustments[trafficCondition];
    const idleEmissions = idleTime * idleEmissionsPerMin;
    
    // Calculate total emissions based on selected inputs
    const emissions = distance * baseEmissionsPerKm * fuelAdjustment * trafficAdjustment * nighttimeFactor * (1 - 1 / numberOfRiders) + idleEmissions;
    
    // EV emissions (zero emissions)
    const evEmissions = distance * baseEmissionsPerKm * 0 * trafficAdjustment * nighttimeFactor * (1 - 1 / numberOfRiders) + idleEmissions;

    // Carbon savings are the difference between the emissions of a petrol/diesel vehicle and an EV (which contributes zero emissions)
    const savings = emissions - evEmissions;

    setTotalEmissions(emissions);
    setCarbonSavings(savings);
    setLatestSavings(savings);
  };

  // Graph data for the emissions comparison
  const graphData = [
    {
      fuelType: 'Petrol',
      emission: totalEmissions,
    },
    {
      fuelType: 'Diesel',
      emission: totalEmissions * 1.15, // Diesel has 15% higher emissions than petrol
    },
    {
      fuelType: 'EV',
      emission: 0, // EVs have no emissions
    },
  ];

  return (
    <div className="App">
      <h1>Carbon Emission Calculator</h1>
      <div className="inputs">
        <label>Distance (km):
          <input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} />
        </label>

        <label>Fuel Type:
          <select value={fuelType} onChange={(e) => setFuelType(e.target.value)}>
            <option value="petrol">Petrol</option>
            <option value="diesel">Diesel</option>
            <option value="ev">EV</option>
          </select>
        </label>

        <label>Traffic Condition:
          <select value={trafficCondition} onChange={(e) => setTrafficCondition(e.target.value)}>
            <option value="light">Light</option>
            <option value="moderate">Moderate</option>
            <option value="heavy">Heavy</option>
          </select>
        </label>

        <label>Idle Time (minutes):
          <input type="number" value={idleTime} onChange={(e) => setIdleTime(e.target.value)} />
        </label>

        <label>Number of Riders:
          <input type="number" value={numberOfRiders} onChange={(e) => setNumberOfRiders(e.target.value)} />
        </label>

        <button onClick={calculateEmissions}>Calculate Emission</button>
      </div>

      <div className="chart">
        <h3>Emissions Comparison (g/km)</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={graphData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="fuelType" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="emission" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="results">
        <h4>Total Emissions: {totalEmissions.toFixed(2)} grams</h4>
        <h4>Carbon Savings: {carbonSavings.toFixed(2)} grams</h4>
      </div>

      <EcoImpact latestSavings={latestSavings} />
    </div>
  );
}

export default App;
