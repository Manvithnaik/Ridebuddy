const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests

// Endpoint to calculate emissions
app.post('/calculate', (req, res) => {
  console.log("Received Data:", req.body);
  const { distance, fuelType, traffic, idleTime, numRiders } = req.body;

  const baseEmissions = 251; // Base emissions per km for petrol/diesel
  let fuelAdjustment = 1;
  let trafficAdjustment = 1;

  // Adjust for fuel type
  if (fuelType === "diesel") fuelAdjustment = 1.15;
  else if (fuelType === "ev") fuelAdjustment = 0; // EV has no emissions

  // Adjust for traffic conditions
  if (traffic === "moderate") trafficAdjustment = 1.10;
  else if (traffic === "heavy") trafficAdjustment = 1.20;

  // Idle emissions (10 grams per minute)
  const idleEmissions = 10 * idleTime;

  // Rider sharing factor
  const riderSharingFactor = 1 - 1 / numRiders;

  // Calculate total emissions using the provided formula
  const co2Savings =
    distance *
    baseEmissions *
    fuelAdjustment *
    trafficAdjustment *
    riderSharingFactor +
    idleEmissions;

  res.json({ emissions: co2Savings.toFixed(2) }); // Return the result as a JSON response
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
