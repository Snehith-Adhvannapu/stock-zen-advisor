import { Brain, TrendingUp, Settings } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AnalysisControlsProps {
  analysisWeight: number;
  onAnalysisWeightChange: (value: number) => void;
  stockCount: number;
  onStockCountChange: (value: number) => void;
  riskTolerance: string;
  onRiskToleranceChange: (value: string) => void;
}

export const AnalysisControls = ({
  analysisWeight,
  onAnalysisWeightChange,
  stockCount,
  onStockCountChange,
  riskTolerance,
  onRiskToleranceChange,
}: AnalysisControlsProps) => {
  return (
    <div className="space-y-6">
      {/* Analysis Balance */}
      <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Brain className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Analysis Balance</h3>
              <p className="text-sm text-muted-foreground">
                Adjust the weight between fundamental and sentiment analysis
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Fundamental</span>
              <span className="font-mono font-semibold text-primary">
                {analysisWeight}% Balance
              </span>
              <span className="text-muted-foreground">Sentiment</span>
            </div>
            
            <Slider
              value={[analysisWeight]}
              onValueChange={(values) => onAnalysisWeightChange(values[0])}
              min={0}
              max={100}
              step={5}
              className="[&_[role=slider]]:border-2 [&_[role=slider]]:border-primary [&_[role=slider]]:shadow-glow"
            />

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-3 bg-background/50 backdrop-blur-sm rounded-lg border border-border">
                <div className="text-2xl font-bold text-foreground">{100 - analysisWeight}%</div>
                <div className="text-xs text-muted-foreground">Fundamental Weight</div>
              </div>
              <div className="p-3 bg-background/50 backdrop-blur-sm rounded-lg border border-border">
                <div className="text-2xl font-bold text-foreground">{analysisWeight}%</div>
                <div className="text-xs text-muted-foreground">Sentiment Weight</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Advanced Options */}
      <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-success/10 rounded-lg">
              <Settings className="w-5 h-5 text-success" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Advanced Options</h3>
              <p className="text-sm text-muted-foreground">
                Fine-tune your analysis parameters
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Stock Count */}
            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                Number of Stocks
              </Label>
              <Select value={stockCount.toString()} onValueChange={(v) => onStockCountChange(parseInt(v))}>
                <SelectTrigger className="bg-background/50 backdrop-blur-sm border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover backdrop-blur-xl border-border">
                  {[3, 4, 5, 6, 7, 8, 9, 10].map((count) => (
                    <SelectItem key={count} value={count.toString()}>
                      {count} stocks
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Risk Tolerance */}
            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Brain className="w-4 h-4 text-success" />
                Risk Tolerance
              </Label>
              <Select value={riskTolerance} onValueChange={onRiskToleranceChange}>
                <SelectTrigger className="bg-background/50 backdrop-blur-sm border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover backdrop-blur-xl border-border">
                  <SelectItem value="conservative">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full" />
                      Conservative
                    </span>
                  </SelectItem>
                  <SelectItem value="moderate">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-warning rounded-full" />
                      Moderate
                    </span>
                  </SelectItem>
                  <SelectItem value="aggressive">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-destructive rounded-full" />
                      Aggressive
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
