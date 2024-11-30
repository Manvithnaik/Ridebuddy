export const calculateEmissions = (data) => {
  let petrolEmissions = 251 * data.distance; // Base emissions for petrol
  if (data.fuelType === 'diesel') {
    petrolEmissions *= 1.15; // Adjust for diesel (15% more)
  } else if (data.fuelType === 'ev') {
    petrolEmissions = 0; // EV emissions are 0
  }

  const dieselEmissions = petrolEmissions * 1.15; // Diesel is 15% more than petrol
  const evEmissions = 0; // EV has no emissions

  return { petrol: petrolEmissions, diesel: dieselEmissions, ev: evEmissions };
};
