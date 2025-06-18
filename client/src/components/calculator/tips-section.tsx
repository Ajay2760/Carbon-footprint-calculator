import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, Zap, Leaf, Thermometer, Shirt, Info, Lightbulb, Sprout } from "lucide-react";
import { getPersonalizedTips, CarbonFootprintInputs, CarbonFootprintResult } from "@/lib/calculations";

interface TipsSectionProps {
  inputs: CarbonFootprintInputs;
  results: CarbonFootprintResult;
}

const iconMap = {
  transportation: Car,
  energy: Zap,
  food: Leaf,
  waste: Shirt,
};

export function TipsSection({ inputs, results }: TipsSectionProps) {
  const tips = getPersonalizedTips(inputs, results);
  
  const highImpactTips = tips.filter(tip => tip.priority === 'high').slice(0, 3);
  const mediumImpactTips = tips.filter(tip => tip.priority === 'medium').slice(0, 2);

  return (
    <>
      {/* Actionable Tips */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-slate-50 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Personalized Tips</h3>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          
          {/* High Impact Tips */}
          {highImpactTips.map((tip, index) => {
            const IconComponent = iconMap[tip.category as keyof typeof iconMap] || Leaf;
            const borderColor = tip.priority === 'high' ? 'border-eco-primary' : 'border-eco-secondary';
            const bgColor = tip.priority === 'high' ? 'bg-eco-light' : 'bg-green-50';
            const iconColor = tip.priority === 'high' ? 'text-eco-primary' : 'text-eco-secondary';
            
            return (
              <div key={index} className={`border-l-4 ${borderColor} ${bgColor} rounded-r-lg p-4`}>
                <div className="flex items-start space-x-3">
                  <IconComponent className={`${iconColor} w-5 h-5 mt-1`} />
                  <div>
                    <h4 className="font-semibold text-eco-dark text-sm">{tip.title}</h4>
                    <p className="text-xs text-slate-600 mt-1">
                      {tip.description} Potential savings: <strong>{tip.potentialSavings} tons CO₂/year</strong>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Medium Impact Tips */}
          {mediumImpactTips.length > 0 && (
            <div className="space-y-3 pt-2">
              {mediumImpactTips.map((tip, index) => {
                const IconComponent = iconMap[tip.category as keyof typeof iconMap] || Thermometer;
                
                return (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                    <IconComponent className="text-slate-500 w-5 h-5" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-700">{tip.title}</div>
                      <div className="text-xs text-slate-500">Save {tip.potentialSavings} tons CO₂/year</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <Button className="w-full bg-eco-primary text-white font-semibold py-3 px-4 rounded-lg hover:bg-eco-secondary transition-colors mt-6">
            Get My Action Plan
          </Button>
        </CardContent>
      </Card>

      {/* Educational Info */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-slate-50 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Did You Know?</h3>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Info className="text-blue-500 w-5 h-5 mt-1" />
              <div className="text-sm text-blue-900">
                <strong>Transportation</strong> accounts for about 29% of U.S. greenhouse gas emissions, making it the largest contributor.
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Lightbulb className="text-amber-500 w-5 h-5 mt-1" />
              <div className="text-sm text-amber-900">
                <strong>Energy-efficient homes</strong> can reduce carbon emissions by up to 30% through better insulation and appliances.
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Sprout className="text-green-500 w-5 h-5 mt-1" />
              <div className="text-sm text-green-900">
                <strong>Plant-based meals</strong> typically generate 10-50x fewer emissions than meat-based meals.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
