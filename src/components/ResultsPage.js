import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ResultsPage = ({ emissions }) => {
  const { co2Savings, fuelAdjustment, trafficAdjustment, idleEmissions } = emissions;

  const emissionData = [
    { name: 'CO2 Savings', emissions: co2Savings },
  ];

  return (
    <div className="results-container">
      <h3>Emission Comparison</h3>
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
        <h4>Total CO2 Savings: {co2Savings.toFixed(2)} grams</h4>
        <h4>Fuel Adjustment: {fuelAdjustment}</h4>
        <h4>Traffic Adjustment: {trafficAdjustment}</h4>
        <h4>Idle Emissions: {idleEmissions} grams</h4>
      </div>
    </div>
  );
};

export default ResultsPage;
