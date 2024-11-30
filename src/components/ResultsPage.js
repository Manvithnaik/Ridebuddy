import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ResultsPage = ({ emissions }) => {
  const { petrol, diesel, ev } = emissions; // Assuming emissions data is passed as {petrol, diesel, ev}

  const emissionData = [
    { name: 'Petrol', emissions: petrol },
    { name: 'Diesel', emissions: diesel },
    { name: 'EV', emissions: ev }
  ];

  return (
    <div className="results-container">
      <h3>Emission Comparison by Fuel Type</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={emissionData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="emissions" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <div className="carbon-savings">
        <h4>Total Carbon Emissions: {petrol.toFixed(2)} grams</h4>
        <h4>Carbon Savings: {petrol > 0 ? (petrol * 0.8).toFixed(2) : 0} grams</h4>
      </div>
    </div>
  );
};

export default ResultsPage;
