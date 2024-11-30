export const calculateEmissions = (data) => {
  // Base emission for petrol
  const baseEmissionFactor = 251; 

  // Determine Fuel Adjustment factor
  let fuelAdjustment = 1; // Default to petrol
  if (data.fuelType === 'diesel') {
    fuelAdjustment = 1.15; // Diesel is 15% more than petrol
  } else if (data.fuelType === 'ev') {
    fuelAdjustment = 0; // EV has no emissions
  }

  // Determine Traffic Adjustment factor
  let trafficAdjustment = 1; // Default is light traffic
  if (data.traffic === 'moderate') {
    trafficAdjustment = 1.10; // 10% more emissions for moderate traffic
  } else if (data.traffic === 'heavy') {
    trafficAdjustment = 1.20; // 20% more emissions for heavy traffic
  }

  // Calculate Idle emissions (10 grams per minute)
  let idleEmissions = data.idleTime * 10;

  // Apply formula for CO2 Savings
  const co2Savings = (data.distance * baseEmissionFactor * fuelAdjustment * trafficAdjustment * (1 - (1 / data.numRiders))) + idleEmissions;

  // Return calculated values
  return {
    co2Savings: co2Savings,
    fuelAdjustment: fuelAdjustment,
    trafficAdjustment: trafficAdjustment,
    idleEmissions: idleEmissions,
  };
};
