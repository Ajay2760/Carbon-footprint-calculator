import { useState, useEffect } from "react";
import { Header } from "@/components/calculator/header";
import { TransportationSection } from "@/components/calculator/transportation-section";
import { HomeEnergySection } from "@/components/calculator/home-energy-section";
import { FoodSection } from "@/components/calculator/food-section";
import { WasteSection } from "@/components/calculator/waste-section";
import { ResultsChart } from "@/components/calculator/results-chart";
import { TipsSection } from "@/components/calculator/tips-section";
import { Card, CardContent } from "@/components/ui/card";
import { CarbonFootprintInputs, calculateCarbonFootprint, CarbonFootprintResult } from "@/lib/calculations";

const initialData: CarbonFootprintInputs = {
  carMilesPerYear: 0,
  carMpg: 25,
  publicTransportMilesPerWeek: 0,
  flightsPerYear: 0,
  flightDistance: '',
  monthlyElectricityBill: 0,
  homeSize: '',
  heatingSource: '',
  monthlyGasBill: 0,
  usesGreenEnergy: false,
  dietType: '',
  redMeatMealsPerWeek: 0,
  localFoodPercentage: 0,
  foodWasteLevel: '',
  recyclesPaper: false,
  recyclesPlastic: false,
  composts: false,
  clothingItemsPerMonth: 0,
  electronicUpgradesPerYear: 0,
};

export default function Calculator() {
  const [data, setData] = useState<CarbonFootprintInputs>(initialData);
  const [results, setResults] = useState<CarbonFootprintResult>({
    transportation: 0,
    homeEnergy: 0,
    food: 0,
    waste: 0,
    total: 0,
  });

  const handleChange = (field: keyof CarbonFootprintInputs, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const newResults = calculateCarbonFootprint(data);
    setResults(newResults);
  }, [data]);

  const globalAverage = 4.8;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header totalEmissions={results.total} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-eco-light to-green-50 rounded-2xl p-8 mb-8 border border-green-100">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Calculate Your Carbon Footprint</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Understand your environmental impact and discover actionable ways to reduce your carbon emissions across transportation, home energy, food, and lifestyle choices.
            </p>
          </div>
          
          {/* Current Total Display */}
          <Card className="mt-8 border border-green-100">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-eco-primary">{results.total.toFixed(1)}</div>
                <div className="text-slate-600 font-medium">tons CO₂ per year</div>
                <div className="text-sm text-slate-500 mt-1">Global average: {globalAverage} tons</div>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-xl font-semibold text-slate-700">{results.transportation.toFixed(1)}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide">Transport</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-semibold text-slate-700">{results.homeEnergy.toFixed(1)}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide">Home</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-semibold text-slate-700">{results.food.toFixed(1)}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide">Food</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-semibold text-slate-700">{results.waste.toFixed(1)}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide">Waste</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column - Input Forms */}
          <div className="lg:col-span-2 space-y-6">
            <TransportationSection data={data} onChange={handleChange} />
            <HomeEnergySection data={data} onChange={handleChange} />
            <FoodSection data={data} onChange={handleChange} />
            <WasteSection data={data} onChange={handleChange} />
          </div>

          {/* Right Column - Results & Tips */}
          <div className="space-y-6">
            <ResultsChart results={results} />
            <TipsSection inputs={data} results={results} />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">About Carbon Calculations</h4>
              <p className="text-sm text-slate-600">
                Our calculations use EPA emission factors and international standards to provide accurate estimates of your carbon footprint.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Take Action</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Set reduction goals</li>
                <li>• Track monthly progress</li>
                <li>• Join community challenges</li>
                <li>• Share your achievements</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Resources</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• EPA Climate Guidelines</li>
                <li>• Carbon Offset Programs</li>
                <li>• Sustainable Living Tips</li>
                <li>• Climate Science Updates</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-200 text-center">
            <p className="text-sm text-slate-500">© 2024 EcoCalculator. Helping create a sustainable future, one calculation at a time.</p>
          </div>
        </footer>

      </main>
    </div>
  );
}
