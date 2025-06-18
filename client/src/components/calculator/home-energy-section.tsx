import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Home } from "lucide-react";
import { CarbonFootprintInputs } from "@/lib/calculations";

interface HomeEnergySectionProps {
  data: CarbonFootprintInputs;
  onChange: (field: keyof CarbonFootprintInputs, value: any) => void;
}

export function HomeEnergySection({ data, onChange }: HomeEnergySectionProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-slate-50 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-eco-secondary rounded-lg flex items-center justify-center">
            <Home className="text-white w-4 h-4" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">Home Energy</h3>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-slate-700">
              Monthly electricity bill
            </Label>
            <div className="relative mt-2">
              <span className="absolute left-3 top-3 text-slate-400">₹</span>
              <Input
                type="number"
                placeholder="10000"
                value={data.monthlyElectricityBill || ""}
                onChange={(e) => onChange('monthlyElectricityBill', parseFloat(e.target.value) || 0)}
                className="pl-8"
              />
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium text-slate-700">
              Home size
            </Label>
            <Select value={data.homeSize} onValueChange={(value) => onChange('homeSize', value)}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small (&lt;1000 sq ft)</SelectItem>
                <SelectItem value="medium">Medium (1000-2000 sq ft)</SelectItem>
                <SelectItem value="large">Large (&gt;2000 sq ft)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-slate-700">
              Primary heating source
            </Label>
            <Select value={data.heatingSource} onValueChange={(value) => onChange('heatingSource', value)}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="electric">Electric</SelectItem>
                <SelectItem value="gas">Natural Gas</SelectItem>
                <SelectItem value="oil">Oil</SelectItem>
                <SelectItem value="renewable">Renewable</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-sm font-medium text-slate-700">
              Monthly gas bill
            </Label>
            <div className="relative mt-2">
              <span className="absolute left-3 top-3 text-slate-400">₹</span>
              <Input
                type="number"
                placeholder="6500"
                value={data.monthlyGasBill || ""}
                onChange={(e) => onChange('monthlyGasBill', parseFloat(e.target.value) || 0)}
                className="pl-8"
              />
            </div>
          </div>
        </div>

        <div className="bg-eco-light rounded-lg p-4 border border-green-200">
          <div className="flex items-center space-x-3 mb-3">
            <Checkbox
              id="green-energy"
              checked={data.usesGreenEnergy}
              onCheckedChange={(checked) => onChange('usesGreenEnergy', checked)}
            />
            <Label htmlFor="green-energy" className="text-sm font-medium text-slate-700">
              I use renewable energy sources (solar, wind, etc.)
            </Label>
          </div>
          <p className="text-xs text-slate-600">
            Check this if you have solar panels, use a green energy provider, or other renewable sources.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
