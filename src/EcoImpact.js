import React, { useState } from 'react';

const EcoImpact = ({ latestSavings }) => {
  const [totalSavings, setTotalSavings] = useState(0);

  const handleAddSavings = () => {
    setTotalSavings(prevSavings => prevSavings + parseFloat(latestSavings));
  };

  return (
    <div className="eco-impact-container">
      <h2>Your Eco-Impact</h2>
      <h4>Total Carbon Savings: {totalSavings.toFixed(2)} grams</h4>
      <button onClick={handleAddSavings}>Add Latest Savings</button>
    </div>
  );
};

export default EcoImpact;
