import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { CarbonFootprintResult } from "@/lib/calculations";

interface ResultsChartProps {
  results: CarbonFootprintResult;
}

const COLORS = ['#22C55E', '#059669', '#F59E0B', '#64748B'];

export function ResultsChart({ results }: ResultsChartProps) {
  const globalAverage = 4.8;
  const comparisonPercentage = Math.round(((results.total - globalAverage) / globalAverage) * 100);
  const progressPercentage = Math.min((results.total / (globalAverage * 2)) * 100, 100);
  
  const chartData = [
    { name: 'Transportation', value: results.transportation, color: '#22C55E' },
    { name: 'Home Energy', value: results.homeEnergy, color: '#059669' },
    { name: 'Food', value: results.food, color: '#F59E0B' },
    { name: 'Waste', value: results.waste, color: '#64748B' },
  ].filter(item => item.value > 0);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-slate-50 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900">Your Carbon Breakdown</h3>
      </CardHeader>
      <CardContent className="p-6">
        <div className="w-full h-64 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`${value.toFixed(1)} tons`, '']} />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value) => <span className="text-xs text-slate-600">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-slate-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">vs. Global Average</span>
            <span className={`text-sm font-semibold ${comparisonPercentage > 0 ? 'text-eco-accent' : 'text-eco-primary'}`}>
              {comparisonPercentage > 0 ? '+' : ''}{comparisonPercentage}% {comparisonPercentage > 0 ? 'higher' : 'lower'}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2 mb-1" />
          <div className="text-xs text-slate-500">Goal: Reduce to 2.3 tons/year by 2030</div>
        </div>
      </CardContent>
    </Card>
  );
}
