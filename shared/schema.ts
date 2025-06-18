import { pgTable, text, serial, integer, real, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const carbonCalculations = pgTable("carbon_calculations", {
  id: serial("id").primaryKey(),
  // Transportation
  carMilesPerYear: integer("car_miles_per_year").default(0),
  carMpg: integer("car_mpg").default(25),
  publicTransportMilesPerWeek: integer("public_transport_miles_per_week").default(0),
  flightsPerYear: integer("flights_per_year").default(0),
  flightDistance: text("flight_distance"), // short, medium, long
  
  // Home Energy
  monthlyElectricityBill: real("monthly_electricity_bill").default(0),
  homeSize: text("home_size"), // small, medium, large
  heatingSource: text("heating_source"), // electric, gas, oil, renewable
  monthlyGasBill: real("monthly_gas_bill").default(0),
  usesGreenEnergy: boolean("uses_green_energy").default(false),
  
  // Food
  dietType: text("diet_type"), // omnivore, pescatarian, vegetarian, vegan
  redMeatMealsPerWeek: integer("red_meat_meals_per_week").default(0),
  localFoodPercentage: integer("local_food_percentage").default(0),
  foodWasteLevel: text("food_waste_level"), // minimal, low, average, high
  
  // Waste
  recyclesPaper: boolean("recycles_paper").default(false),
  recyclesPlastic: boolean("recycles_plastic").default(false),
  composts: boolean("composts").default(false),
  clothingItemsPerMonth: integer("clothing_items_per_month").default(0),
  electronicUpgradesPerYear: integer("electronic_upgrades_per_year").default(0),
  
  // Results
  totalEmissions: real("total_emissions").default(0),
  transportationEmissions: real("transportation_emissions").default(0),
  homeEmissions: real("home_emissions").default(0),
  foodEmissions: real("food_emissions").default(0),
  wasteEmissions: real("waste_emissions").default(0),
  
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCarbonCalculationSchema = createInsertSchema(carbonCalculations).omit({
  id: true,
  createdAt: true,
});

export type InsertCarbonCalculation = z.infer<typeof insertCarbonCalculationSchema>;
export type CarbonCalculation = typeof carbonCalculations.$inferSelect;
