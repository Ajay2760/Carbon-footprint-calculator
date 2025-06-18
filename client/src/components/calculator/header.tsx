import { Progress } from "@/components/ui/progress";
import { Leaf } from "lucide-react";

interface HeaderProps {
  totalEmissions: number;
}

export function Header({ totalEmissions }: HeaderProps) {
  const globalAverage = 4.8;
  const progressPercentage = Math.min((totalEmissions / (globalAverage * 2)) * 100, 100);
  
  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-eco-primary rounded-lg flex items-center justify-center">
              <Leaf className="text-white w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-900">EcoCalculator</h1>
              <p className="text-sm text-slate-500">Track your environmental impact</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-600">Your Progress</span>
            <div className="w-20">
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
