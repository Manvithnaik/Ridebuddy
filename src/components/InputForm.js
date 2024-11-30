import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InputForm = ({ calculateEmissions }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    distance: '',
    fuelType: 'petrol',
    traffic: 'light',
    idleTime: 0,
    rideTime: '',
    numRiders: 1
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateEmissions(formData); // Calculate emissions
    navigate('/results'); // Navigate to results page
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Distance (km):</label>
      <input 
        type="number" 
        name="distance" 
        value={formData.distance} 
        onChange={handleChange} 
      />

      <label>Fuel Type:</label>
      <select name="fuelType" value={formData.fuelType} onChange={handleChange}>
        <option value="petrol">Petrol</option>
        <option value="diesel">Diesel</option>
        <option value="ev">EV</option>
      </select>

      <label>Traffic Condition:</label>
      <select name="traffic" value={formData.traffic} onChange={handleChange}>
        <option value="light">Light</option>
        <option value="moderate">Moderate</option>
        <option value="heavy">Heavy</option>
      </select>

      <label>Idle Time (minutes):</label>
      <input 
        type="number" 
        name="idleTime" 
        value={formData.idleTime} 
        onChange={handleChange} 
      />

      <label>Ride Start Time:</label>
      <input 
        type="time" 
        name="rideTime" 
        value={formData.rideTime} 
        onChange={handleChange} 
      />

      <label>Number of Riders:</label>
      <input 
        type="number" 
        name="numRiders" 
        value={formData.numRiders} 
        onChange={handleChange} 
      />

      <button type="submit">Calculate Emissions</button>
    </form>
  );
};

export default InputForm;
