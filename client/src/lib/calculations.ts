export interface EmissionFactors {
  // Transportation (kg CO2 per unit)
  carPerMile: number;
  publicTransportPerMile: number;
  flights: {
    short: number; // per flight
    medium: number;
    long: number;
  };
  
  // Home Energy (kg CO2 per rupee of bill)
  electricityPerRupee: number;
  gasPerRupee: number;
  greenEnergyReduction: number; // percentage reduction
  
  // Food (kg CO2 per year based on diet and habits)
  diet: {
    omnivore: number;
    pescatarian: number;
    vegetarian: number;
    vegan: number;
  };
  redMeatPerMeal: number;
  localFoodReduction: number; // per percentage point
  foodWaste: {
    minimal: number;
    low: number;
    average: number;
    high: number;
  };
  
  // Waste (kg CO2 per year)
  clothingPerItem: number;
  electronicsPerDevice: number;
  recyclingReduction: number; // percentage reduction per type
  compostingReduction: number;
}

export const EMISSION_FACTORS: EmissionFactors = {
  carPerMile: 0.404, // EPA average for passenger vehicles
  publicTransportPerMile: 0.096, // Bus average
  flights: {
    short: 180, // kg CO2 per short flight
    medium: 580, // kg CO2 per medium flight  
    long: 1100, // kg CO2 per long flight
  },
  electricityPerRupee: 0.038, // Average kg CO2 per rupee of electricity (3.2/83 USD to INR)
  gasPerRupee: 0.064, // Average kg CO2 per rupee of natural gas (5.3/83 USD to INR)
  greenEnergyReduction: 0.7, // 70% reduction for renewable energy
  diet: {
    omnivore: 2300, // kg CO2 per year
    pescatarian: 1800,
    vegetarian: 1200,
    vegan: 800,
  },
  redMeatPerMeal: 6.8, // kg CO2 per red meat meal
  localFoodReduction: 0.02, // 2% reduction per percentage point of local food
  foodWaste: {
    minimal: 1.0, // multiplier
    low: 1.1,
    average: 1.2,
    high: 1.4,
  },
  clothingPerItem: 8.5, // kg CO2 per clothing item
  electronicsPerDevice: 85, // kg CO2 per electronic device
  recyclingReduction: 0.15, // 15% reduction per recycling type
  compostingReduction: 0.1, // 10% reduction for composting
};

export interface CarbonFootprintInputs {
  // Transportation
  carMilesPerYear: number;
  carMpg: number;
  publicTransportMilesPerWeek: number;
  flightsPerYear: number;
  flightDistance: 'short' | 'medium' | 'long' | '';
  
  // Home Energy
  monthlyElectricityBill: number;
  homeSize: 'small' | 'medium' | 'large' | '';
  heatingSource: 'electric' | 'gas' | 'oil' | 'renewable' | '';
  monthlyGasBill: number;
  usesGreenEnergy: boolean;
  
  // Food
  dietType: 'omnivore' | 'pescatarian' | 'vegetarian' | 'vegan' | '';
  redMeatMealsPerWeek: number;
  localFoodPercentage: number;
  foodWasteLevel: 'minimal' | 'low' | 'average' | 'high' | '';
  
  // Waste
  recyclesPaper: boolean;
  recyclesPlastic: boolean; 
  composts: boolean;
  clothingItemsPerMonth: number;
  electronicUpgradesPerYear: number;
}

export interface CarbonFootprintResult {
  transportation: number;
  homeEnergy: number;
  food: number;
  waste: number;
  total: number;
}

export function calculateCarbonFootprint(inputs: CarbonFootprintInputs): CarbonFootprintResult {
  const factors = EMISSION_FACTORS;
  
  // Transportation calculations
  const carEmissions = inputs.carMilesPerYear * factors.carPerMile;
  const publicTransportEmissions = inputs.publicTransportMilesPerWeek * 52 * factors.publicTransportPerMile;
  const flightEmissions = inputs.flightsPerYear * (inputs.flightDistance ? factors.flights[inputs.flightDistance] : 0);
  const transportation = carEmissions + publicTransportEmissions + flightEmissions;
  
  // Home energy calculations
  let electricityEmissions = inputs.monthlyElectricityBill * 12 * factors.electricityPerRupee;
  let gasEmissions = inputs.monthlyGasBill * 12 * factors.gasPerRupee;
  
  if (inputs.usesGreenEnergy) {
    electricityEmissions *= (1 - factors.greenEnergyReduction);
  }
  
  const homeEnergy = electricityEmissions + gasEmissions;
  
  // Food calculations
  let baseFoodEmissions = inputs.dietType ? factors.diet[inputs.dietType] : factors.diet.omnivore;
  const redMeatEmissions = inputs.redMeatMealsPerWeek * 52 * factors.redMeatPerMeal;
  const localFoodReduction = inputs.localFoodPercentage * factors.localFoodReduction;
  const wasteMultiplier = inputs.foodWasteLevel ? factors.foodWaste[inputs.foodWasteLevel] : 1.2;
  
  const food = (baseFoodEmissions + redMeatEmissions) * (1 - localFoodReduction) * wasteMultiplier;
  
  // Waste calculations  
  const clothingEmissions = inputs.clothingItemsPerMonth * 12 * factors.clothingPerItem;
  const electronicsEmissions = inputs.electronicUpgradesPerYear * factors.electronicsPerDevice;
  
  let recyclingReduction = 0;
  if (inputs.recyclesPaper) recyclingReduction += factors.recyclingReduction;
  if (inputs.recyclesPlastic) recyclingReduction += factors.recyclingReduction;
  if (inputs.composts) recyclingReduction += factors.compostingReduction;
  
  const waste = (clothingEmissions + electronicsEmissions) * (1 - recyclingReduction);
  
  const total = transportation + homeEnergy + food + waste;
  
  // Convert from kg to tons
  return {
    transportation: transportation / 1000,
    homeEnergy: homeEnergy / 1000,
    food: food / 1000, 
    waste: waste / 1000,
    total: total / 1000,
  };
}

export function getPersonalizedTips(inputs: CarbonFootprintInputs, results: CarbonFootprintResult) {
  const tips = [];
  
  // Transportation tips
  if (results.transportation > 3) {
    if (inputs.carMilesPerYear > 10000) {
      tips.push({
        category: 'transportation',
        title: 'Reduce Car Travel',
        description: 'Consider carpooling or public transport 2 days/week.',
        potentialSavings: Math.round((inputs.carMilesPerYear * 0.2 * EMISSION_FACTORS.carPerMile) / 1000 * 10) / 10,
        priority: 'high'
      });
    }
    
    if (inputs.flightsPerYear > 2) {
      tips.push({
        category: 'transportation', 
        title: 'Reduce Air Travel',
        description: 'Consider video conferencing or train travel for shorter trips.',
        potentialSavings: Math.round((EMISSION_FACTORS.flights.medium * 0.5) / 1000 * 10) / 10,
        priority: 'high'
      });
    }
  }
  
  // Home energy tips
  if (results.homeEnergy > 2 && !inputs.usesGreenEnergy) {
    tips.push({
      category: 'energy',
      title: 'Switch to Green Energy',
      description: 'Contact your utility about renewable energy options.',
      potentialSavings: Math.round(results.homeEnergy * 0.7 * 10) / 10,
      priority: 'high'
    });
  }
  
  if (inputs.monthlyElectricityBill > 8300) {
    tips.push({
      category: 'energy',
      title: 'Improve Home Efficiency',
      description: 'Adjust thermostat by 2°F and use LED bulbs.',
      potentialSavings: Math.round(results.homeEnergy * 0.15 * 10) / 10,
      priority: 'medium'
    });
  }
  
  // Food tips
  if (inputs.dietType === 'omnivore' && inputs.redMeatMealsPerWeek > 3) {
    tips.push({
      category: 'food',
      title: 'Reduce Meat Consumption', 
      description: 'Try 1-2 vegetarian days per week.',
      potentialSavings: Math.round((inputs.redMeatMealsPerWeek * 2 * 52 * EMISSION_FACTORS.redMeatPerMeal) / 1000 * 10) / 10,
      priority: 'high'
    });
  }
  
  if (inputs.localFoodPercentage < 30) {
    tips.push({
      category: 'food',
      title: 'Buy Local Food',
      description: 'Increase local/seasonal food purchases to 50%.',
      potentialSavings: Math.round(results.food * 0.2 * 10) / 10,
      priority: 'medium'
    });
  }
  
  // Waste tips
  if (!inputs.recyclesPaper || !inputs.recyclesPlastic) {
    tips.push({
      category: 'waste',
      title: 'Improve Recycling',
      description: 'Recycle all paper, plastic, and glass materials.',
      potentialSavings: Math.round(results.waste * 0.3 * 10) / 10,
      priority: 'medium'
    });
  }
  
  if (inputs.clothingItemsPerMonth > 3) {
    tips.push({
      category: 'waste',
      title: 'Buy Less Fast Fashion',
      description: 'Reduce clothing purchases by buying quality items.',
      potentialSavings: Math.round((inputs.clothingItemsPerMonth * 2 * 12 * EMISSION_FACTORS.clothingPerItem) / 1000 * 10) / 10,
      priority: 'medium'
    });
  }
  
  return tips.sort((a, b) => {
    if (a.priority === 'high' && b.priority !== 'high') return -1;
    if (b.priority === 'high' && a.priority !== 'high') return 1;
    return b.potentialSavings - a.potentialSavings;
  });
}
