import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Car } from "lucide-react";
import { CarbonFootprintInputs } from "@/lib/calculations";

interface TransportationSectionProps {
  data: CarbonFootprintInputs;
  onChange: (field: keyof CarbonFootprintInputs, value: any) => void;
}

export function TransportationSection({ data, onChange }: TransportationSectionProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-slate-50 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-eco-primary rounded-lg flex items-center justify-center">
            <Car className="text-white w-4 h-4" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">Transportation</h3>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-slate-700">
              Miles driven per year
            </Label>
            <div className="relative mt-2">
              <Input
                type="number"
                placeholder="12,000"
                value={data.carMilesPerYear || ""}
                onChange={(e) => onChange('carMilesPerYear', parseInt(e.target.value) || 0)}
                className="pr-14"
              />
              <span className="absolute right-3 top-3 text-slate-400 text-sm">miles</span>
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium text-slate-700">
              Vehicle fuel efficiency
            </Label>
            <div className="relative mt-2">
              <Input
                type="number"
                placeholder="25"
                value={data.carMpg || ""}
                onChange={(e) => onChange('carMpg', parseInt(e.target.value) || 25)}
                className="pr-12"
              />
              <span className="absolute right-3 top-3 text-slate-400 text-sm">mpg</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-slate-700">
              Bus/Train miles per week
            </Label>
            <div className="relative mt-2">
              <Input
                type="number"
                placeholder="50"
                value={data.publicTransportMilesPerWeek || ""}
                onChange={(e) => onChange('publicTransportMilesPerWeek', parseInt(e.target.value) || 0)}
                className="pr-14"
              />
              <span className="absolute right-3 top-3 text-slate-400 text-sm">miles</span>
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium text-slate-700">
              Flights per year
            </Label>
            <div className="relative mt-2">
              <Input
                type="number"
                placeholder="2"
                value={data.flightsPerYear || ""}
                onChange={(e) => onChange('flightsPerYear', parseInt(e.target.value) || 0)}
                className="pr-16"
              />
              <span className="absolute right-3 top-3 text-slate-400 text-sm">flights</span>
            </div>
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium text-slate-700">
            Average flight distance
          </Label>
          <Select value={data.flightDistance} onValueChange={(value) => onChange('flightDistance', value)}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select distance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="short">Short haul (&lt;500 miles)</SelectItem>
              <SelectItem value="medium">Medium haul (500-2000 miles)</SelectItem>
              <SelectItem value="long">Long haul (&gt;2000 miles)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
