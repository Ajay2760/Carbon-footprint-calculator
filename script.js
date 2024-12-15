function getEnergyEmissions() {
  console.log("[DEBUG] Starting energy emissions calculation.");
  const electricityUsage = parseFloat(
    prompt("Enter your monthly electricity usage in kWh:")
  );
  const gasUsage = parseFloat(
    prompt("Enter your monthly gas usage in liters:")
  );

  // Emission factors
  const electricityEmissionFactor = 0.233; // kg CO2e per kWh
  const gasEmissionFactor = 2.34; // kg CO2e per liter

  const electricityEmissions = electricityUsage * electricityEmissionFactor;
  const gasEmissions = gasUsage * gasEmissionFactor;

  const totalEnergyEmissions = electricityEmissions + gasEmissions;
  console.log(
    `[DEBUG] Energy emissions calculated: ${totalEnergyEmissions.toFixed(
      2
    )} kg CO2e`
  );
  return totalEnergyEmissions;
}

function getTransportEmissions() {
  console.log("[DEBUG] Starting transport emissions calculation.");
  const vehicleType = prompt(
    "Enter your vehicle type (car/bike/public):"
  ).toLowerCase();
  const distanceTraveled = parseFloat(
    prompt("Enter your average monthly distance traveled in km:")
  );

  // Emission factors
  let emissionFactor;
  switch (vehicleType) {
    case "car":
      emissionFactor = 0.21; // kg CO2e per km
      break;
    case "bike":
      emissionFactor = 0.1; // kg CO2e per km
      break;
    case "public":
      emissionFactor = 0.05; // kg CO2e per km
      break;
    default:
      console.log("Unknown vehicle type. Assuming 0 emissions.");
      console.log("[DEBUG] Vehicle type unknown. Emissions set to 0.");
      return 0;
  }

  const transportEmissions = distanceTraveled * emissionFactor;
  console.log(
    `[DEBUG] Transport emissions calculated: ${transportEmissions.toFixed(
      2
    )} kg CO2e`
  );
  return transportEmissions;
}

function getFoodEmissions() {
  console.log("[DEBUG] Starting food emissions calculation.");
  const meatConsumption = parseInt(
    prompt("How many meals containing meat do you consume weekly?")
  );
  const dairyConsumption = parseInt(
    prompt("How many meals containing dairy do you consume weekly?")
  );
  const plantBasedConsumption = parseInt(
    prompt("How many plant-based meals do you consume weekly?")
  );

  // Emission factors
  const meatEmissionFactor = 7.2; // kg CO2e per meal
  const dairyEmissionFactor = 2.0; // kg CO2e per meal
  const plantEmissionFactor = 0.5; // kg CO2e per meal

  const weeklyEmissions =
    meatConsumption * meatEmissionFactor +
    dairyConsumption * dairyEmissionFactor +
    plantBasedConsumption * plantEmissionFactor;

  const monthlyEmissions = weeklyEmissions * 4; // Approximate 4 weeks in a month
  console.log(
    `[DEBUG] Food emissions calculated: ${monthlyEmissions.toFixed(2)} kg CO2e`
  );
  return monthlyEmissions;
}

function getWasteEmissions() {
  console.log("[DEBUG] Starting waste emissions calculation.");
  const wasteGenerated = parseFloat(
    prompt("Enter your monthly waste generation in kg:")
  );

  // Emission factor
  const wasteEmissionFactor = 0.45; // kg CO2e per kg of waste

  const wasteEmissions = wasteGenerated * wasteEmissionFactor;
  console.log(
    `[DEBUG] Waste emissions calculated: ${wasteEmissions.toFixed(2)} kg CO2e`
  );
  return wasteEmissions;
}

function main() {
  console.log("[DEBUG] Application started.");
  alert("Welcome to the Carbon Footprint Calculator!");

  // Calculate emissions from different categories
  console.log("[DEBUG] Calculating energy emissions.");
  const energyEmissions = getEnergyEmissions();

  console.log("[DEBUG] Calculating transport emissions.");
  const transportEmissions = getTransportEmissions();

  console.log("[DEBUG] Calculating food emissions.");
  const foodEmissions = getFoodEmissions();

  console.log("[DEBUG] Calculating waste emissions.");
  const wasteEmissions = getWasteEmissions();

  // Total emissions
  const totalEmissions =
    energyEmissions + transportEmissions + foodEmissions + wasteEmissions;
  console.log(
    `[DEBUG] Total emissions calculated: ${totalEmissions.toFixed(2)} kg CO2e`
  );

  alert(
    `\n--- Your Monthly Carbon Footprint ---\n` +
      `Energy Emissions: ${energyEmissions.toFixed(2)} kg CO2e\n` +
      `Transport Emissions: ${transportEmissions.toFixed(2)} kg CO2e\n` +
      `Food Emissions: ${foodEmissions.toFixed(2)} kg CO2e\n` +
      `Waste Emissions: ${wasteEmissions.toFixed(2)} kg CO2e\n` +
      `Total Monthly Emissions: ${totalEmissions.toFixed(2)} kg CO2e\n`
  );

  alert(
    "Suggestions to Reduce Your Carbon Footprint:\n" +
      "- Use energy-efficient appliances and turn off devices when not in use.\n" +
      "- Use public transport, carpool, or switch to electric vehicles.\n" +
      "- Opt for plant-based meals more often.\n" +
      "- Reduce, reuse, and recycle your waste."
  );

  console.log("[DEBUG] Application finished.");
}

main();
