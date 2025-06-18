import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Recycle } from "lucide-react";
import { CarbonFootprintInputs } from "@/lib/calculations";

interface WasteSectionProps {
  data: CarbonFootprintInputs;
  onChange: (field: keyof CarbonFootprintInputs, value: any) => void;
}

export function WasteSection({ data, onChange }: WasteSectionProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-slate-50 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-slate-600 rounded-lg flex items-center justify-center">
            <Recycle className="text-white w-4 h-4" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">Waste & Recycling</h3>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <span className="text-sm font-medium text-slate-700">I recycle paper and cardboard</span>
            <Checkbox
              checked={data.recyclesPaper}
              onCheckedChange={(checked) => onChange('recyclesPaper', checked)}
            />
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <span className="text-sm font-medium text-slate-700">I recycle plastic and glass</span>
            <Checkbox
              checked={data.recyclesPlastic}
              onCheckedChange={(checked) => onChange('recyclesPlastic', checked)}
            />
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <span className="text-sm font-medium text-slate-700">I compost organic waste</span>
            <Checkbox
              checked={data.composts}
              onCheckedChange={(checked) => onChange('composts', checked)}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-slate-700">
              New clothing items per month
            </Label>
            <div className="relative mt-2">
              <Input
                type="number"
                placeholder="3"
                value={data.clothingItemsPerMonth || ""}
                onChange={(e) => onChange('clothingItemsPerMonth', parseInt(e.target.value) || 0)}
                className="pr-14"
              />
              <span className="absolute right-3 top-3 text-slate-400 text-sm">items</span>
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium text-slate-700">
              Digital device upgrades per year  
            </Label>
            <div className="relative mt-2">
              <Input
                type="number"
                placeholder="1"
                value={data.electronicUpgradesPerYear || ""}
                onChange={(e) => onChange('electronicUpgradesPerYear', parseInt(e.target.value) || 0)}
                className="pr-16"
              />
              <span className="absolute right-3 top-3 text-slate-400 text-sm">devices</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
