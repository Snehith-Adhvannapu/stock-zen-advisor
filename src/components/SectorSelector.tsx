import { Laptop, Building2, Car, Pill, Leaf, Factory } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const sectors = [
  {
    id: "it",
    name: "IT & Tech",
    icon: Laptop,
    stocks: ["TCS", "INFY", "HCLTECH", "WIPRO", "TECHM"],
    color: "from-primary/20 to-primary/5",
    borderColor: "border-primary/30",
    iconColor: "text-primary",
  },
  {
    id: "banking",
    name: "Banking",
    icon: Building2,
    stocks: ["HDFCBANK", "ICICIBANK", "SBI", "KOTAKBANK", "AXISBANK"],
    color: "from-blue-500/20 to-blue-500/5",
    borderColor: "border-blue-500/30",
    iconColor: "text-blue-400",
  },
  {
    id: "auto",
    name: "Auto",
    icon: Car,
    stocks: ["MARUTI", "TATAMOTORS", "M&M", "BAJAJ-AUTO", "EICHERMOT"],
    color: "from-purple-500/20 to-purple-500/5",
    borderColor: "border-purple-500/30",
    iconColor: "text-purple-400",
  },
  {
    id: "pharma",
    name: "Pharma",
    icon: Pill,
    stocks: ["SUNPHARMA", "DRREDDY", "CIPLA", "DIVISLAB", "BIOCON"],
    color: "from-success/20 to-success/5",
    borderColor: "border-success/30",
    iconColor: "text-success",
  },
  {
    id: "green",
    name: "Green Energy",
    icon: Leaf,
    stocks: ["ADANIGREEN", "SUZLON", "TATAPOWER", "NTPC", "POWERGRID"],
    color: "from-emerald-500/20 to-emerald-500/5",
    borderColor: "border-emerald-500/30",
    iconColor: "text-emerald-400",
  },
  {
    id: "diversified",
    name: "Diversified",
    icon: Factory,
    stocks: ["RELIANCE", "ITC", "HINDUNILVR", "LT", "ASIANPAINT"],
    color: "from-warning/20 to-warning/5",
    borderColor: "border-warning/30",
    iconColor: "text-warning",
  },
];

interface SectorSelectorProps {
  selectedSector: string | null;
  onSelectSector: (sector: string) => void;
}

export const SectorSelector = ({ selectedSector, onSelectSector }: SectorSelectorProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {sectors.map((sector) => {
        const Icon = sector.icon;
        const isSelected = selectedSector === sector.id;
        
        return (
          <Card
            key={sector.id}
            className={cn(
              "relative p-6 cursor-pointer transition-all duration-300 hover:scale-105",
              "bg-gradient-card backdrop-blur-sm border-2",
              isSelected 
                ? `${sector.borderColor} shadow-glow` 
                : "border-border hover:border-muted-foreground/30",
              "group"
            )}
            onClick={() => onSelectSector(sector.id)}
          >
            <div className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 rounded-lg",
              sector.color,
              isSelected && "opacity-100"
            )} />
            
            <div className="relative space-y-4">
              <div className="flex items-start justify-between">
                <div className={cn(
                  "p-3 rounded-xl bg-background/50 backdrop-blur-sm transition-all duration-300",
                  isSelected && "shadow-glow"
                )}>
                  <Icon className={cn("w-6 h-6", sector.iconColor)} />
                </div>
                
                {isSelected && (
                  <div className="animate-scale-in">
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse-glow" />
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {sector.name}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {sector.stocks.map((stock) => (
                    <span
                      key={stock}
                      className="px-2 py-1 text-xs bg-background/70 backdrop-blur-sm rounded border border-border text-muted-foreground"
                    >
                      {stock}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
