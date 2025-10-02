import { useState } from "react";
import { TrendingUp, TrendingDown, ChevronDown, ChevronUp, Activity, Brain, Newspaper } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface StockAnalysisCardProps {
  symbol: string;
  name: string;
  price: number;
  change: number;
  recommendation: "BUY" | "HOLD" | "SELL";
  fundamentalScore: number;
  sentimentScore: number;
  index: number;
}

export const StockAnalysisCard = ({
  symbol,
  name,
  price,
  change,
  recommendation,
  fundamentalScore,
  sentimentScore,
  index,
}: StockAnalysisCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isPositive = change > 0;

  const recommendationColors = {
    BUY: "from-success/20 to-success/5 border-success/30",
    HOLD: "from-warning/20 to-warning/5 border-warning/30",
    SELL: "from-destructive/20 to-destructive/5 border-destructive/30",
  };

  const recommendationBadgeColors = {
    BUY: "bg-success/20 text-success border-success/30",
    HOLD: "bg-warning/20 text-warning border-warning/30",
    SELL: "bg-destructive/20 text-destructive border-destructive/30",
  };

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300 bg-gradient-card backdrop-blur-sm border-2",
        recommendationColors[recommendation],
        "animate-fade-in"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Main Content */}
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h4 className="text-xl font-bold">{symbol}</h4>
              <span className={cn(
                "px-3 py-1 text-xs font-semibold rounded-full border",
                recommendationBadgeColors[recommendation]
              )}>
                {recommendation}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{name}</p>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold">₹{price.toFixed(2)}</span>
              <span className={cn(
                "flex items-center gap-1 text-sm font-semibold",
                isPositive ? "text-success" : "text-destructive"
              )}>
                {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {Math.abs(change).toFixed(2)}%
              </span>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="hover:bg-background/50"
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Quick Scores */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1 text-muted-foreground">
                <Brain className="w-3 h-3" />
                Fundamental
              </span>
              <span className="font-semibold">{fundamentalScore}/100</span>
            </div>
            <Progress value={fundamentalScore} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1 text-muted-foreground">
                <Newspaper className="w-3 h-3" />
                Sentiment
              </span>
              <span className="font-semibold">{sentimentScore}/100</span>
            </div>
            <Progress value={sentimentScore} className="h-2" />
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="border-t border-border bg-background/30 backdrop-blur-sm p-6 animate-accordion-down">
          <div className="space-y-6">
            {/* Detailed Metrics */}
            <div>
              <h5 className="text-sm font-semibold mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" />
                Detailed Analysis
              </h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">P/E Ratio</div>
                  <div className="text-lg font-semibold">24.5</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Market Cap</div>
                  <div className="text-lg font-semibold">₹2.4T</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">52W High</div>
                  <div className="text-lg font-semibold">₹3,895</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">52W Low</div>
                  <div className="text-lg font-semibold">₹3,110</div>
                </div>
              </div>
            </div>

            {/* AI Reasoning */}
            <div>
              <h5 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Brain className="w-4 h-4 text-success" />
                AI Reasoning
              </h5>
              <div className="p-4 bg-background/50 rounded-lg border border-border space-y-2 text-sm">
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">Fundamental Analysis:</span> Strong quarterly earnings with 
                  consistent revenue growth. PE ratio indicates fair valuation compared to sector average.
                </p>
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">Sentiment Analysis:</span> Recent news coverage is 
                  predominantly positive, with institutional investors showing increased interest.
                </p>
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">Recommendation:</span> {recommendation} - Based on combined 
                  analysis, this stock presents {recommendation === "BUY" ? "a strong opportunity" : recommendation === "HOLD" ? "moderate potential" : "elevated risks"}.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
