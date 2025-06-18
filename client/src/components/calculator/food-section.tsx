import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Utensils } from "lucide-react";
import { CarbonFootprintInputs } from "@/lib/calculations";

interface FoodSectionProps {
  data: CarbonFootprintInputs;
  onChange: (field: keyof CarbonFootprintInputs, value: any) => void;
}

export function FoodSection({ data, onChange }: FoodSectionProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-slate-50 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-eco-accent rounded-lg flex items-center justify-center">
            <Utensils className="text-white w-4 h-4" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">Food & Diet</h3>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div>
          <Label className="text-sm font-medium text-slate-700 mb-3 block">
            Primary diet type
          </Label>
          <RadioGroup 
            value={data.dietType} 
            onValueChange={(value) => onChange('dietType', value)}
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            <div className="flex items-center space-x-2 p-3 rounded-lg border border-slate-300 hover:border-eco-primary transition-colors">
              <RadioGroupItem value="omnivore" id="omnivore" />
              <Label htmlFor="omnivore" className="text-sm text-slate-700">Omnivore</Label>
            </div>
            <div className="flex items-center space-x-2 p-3 rounded-lg border border-slate-300 hover:border-eco-primary transition-colors">
              <RadioGroupItem value="pescatarian" id="pescatarian" />
              <Label htmlFor="pescatarian" className="text-sm text-slate-700">Pescatarian</Label>
            </div>
            <div className="flex items-center space-x-2 p-3 rounded-lg border border-slate-300 hover:border-eco-primary transition-colors">
              <RadioGroupItem value="vegetarian" id="vegetarian" />
              <Label htmlFor="vegetarian" className="text-sm text-slate-700">Vegetarian</Label>
            </div>
            <div className="flex items-center space-x-2 p-3 rounded-lg border border-slate-300 hover:border-eco-primary transition-colors">
              <RadioGroupItem value="vegan" id="vegan" />
              <Label htmlFor="vegan" className="text-sm text-slate-700">Vegan</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-slate-700">
              Red meat meals per week
            </Label>
            <div className="relative mt-2">
              <Input
                type="number"
                placeholder="4"
                value={data.redMeatMealsPerWeek || ""}
                onChange={(e) => onChange('redMeatMealsPerWeek', parseInt(e.target.value) || 0)}
                className="pr-14"
              />
              <span className="absolute right-3 top-3 text-slate-400 text-sm">meals</span>
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium text-slate-700">
              Local/organic food percentage
            </Label>
            <div className="relative mt-2">
              <Input
                type="number"
                placeholder="30"
                max="100"
                value={data.localFoodPercentage || ""}
                onChange={(e) => onChange('localFoodPercentage', parseInt(e.target.value) || 0)}
                className="pr-8"
              />
              <span className="absolute right-3 top-3 text-slate-400 text-sm">%</span>
            </div>
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium text-slate-700">
            How much food do you typically waste?
          </Label>
          <Select value={data.foodWasteLevel} onValueChange={(value) => onChange('foodWasteLevel', value)}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select amount" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="minimal">Minimal (less than 5%)</SelectItem>
              <SelectItem value="low">Low (5-15%)</SelectItem>
              <SelectItem value="average">Average (15-25%)</SelectItem>
              <SelectItem value="high">High (more than 25%)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
