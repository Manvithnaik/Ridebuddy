import './styles.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import InputForm from './components/InputForm';
import ResultsPage from './components/ResultsPage';
import EcoImpact from './components/EcoImpact';
import { calculateEmissions } from './utils'; // Assume the calculateEmissions function is in utils.js

const App = () => {
  const [result, setResult] = useState(null); // Emissions result

  const calculateEmissionsFromForm = (data) => {
    console.log("Data Received from Form:", data); // Debugging
    const emissions = calculateEmissions(data);
    console.log("Calculated Emissions:", emissions); // Debugging
    setResult(emissions); // Set the result
  };

  return (
    <Router>
      <div>
        <h1>Dynamic Carbon Footprint Tracker</h1>

        {/* Navigation */}
        <nav>
          <Link to="/">Input Form</Link> | <Link to="/results">View Results</Link>
        </nav>

        {/* Routing */}
        <Routes>
          <Route path="/" element={<InputForm calculateEmissions={calculateEmissionsFromForm} />} />
          <Route 
            path="/results"
            element={result ? <ResultsPage emissions={result} /> : <p>Please calculate emissions first!</p>}
          />
        </Routes>

        {/* EcoImpact Section */}
        <EcoImpact latestSavings={result || 0} />
      </div>
    </Router>
  );
};

export default App;
