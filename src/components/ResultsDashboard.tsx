import { TrendingUp, TrendingDown, Minus, BarChart2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { StockAnalysisCard } from "@/components/StockAnalysisCard";

interface ResultsDashboardProps {
  sector: string;
  stockCount: number;
  analysisWeight: number;
}

// Mock data for demonstration
const generateMockResults = (sector: string, count: number) => {
  const recommendations: ("BUY" | "HOLD" | "SELL")[] = ["BUY", "HOLD", "SELL"];
  const stocks = [
    { symbol: "TCS", name: "Tata Consultancy Services", price: 3654.50, change: 2.34 },
    { symbol: "INFY", name: "Infosys Limited", price: 1456.80, change: -1.12 },
    { symbol: "HDFCBANK", name: "HDFC Bank", price: 1628.90, change: 0.89 },
    { symbol: "RELIANCE", name: "Reliance Industries", price: 2456.75, change: 1.45 },
    { symbol: "ICICIBANK", name: "ICICI Bank", price: 986.30, change: 3.21 },
  ];

  return stocks.slice(0, count).map((stock, index) => ({
    ...stock,
    recommendation: recommendations[Math.floor(Math.random() * recommendations.length)] as "BUY" | "HOLD" | "SELL",
    fundamentalScore: Math.floor(Math.random() * 30) + 70,
    sentimentScore: Math.floor(Math.random() * 30) + 70,
  }));
};

export const ResultsDashboard = ({ sector, stockCount, analysisWeight }: ResultsDashboardProps) => {
  const results = generateMockResults(sector, stockCount);
  
  const buyCount = results.filter(r => r.recommendation === "BUY").length;
  const holdCount = results.filter(r => r.recommendation === "HOLD").length;
  const sellCount = results.filter(r => r.recommendation === "SELL").length;

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div>
        <h2 className="text-3xl font-bold mb-6">Analysis Results</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 bg-gradient-success backdrop-blur-sm border-success/30">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-success-foreground">{buyCount}</div>
                <div className="text-sm text-success-foreground/80">BUY Signals</div>
              </div>
              <div className="p-3 bg-success-foreground/10 rounded-lg">
                <TrendingUp className="w-8 h-8 text-success-foreground" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-warning/20 to-warning/5 backdrop-blur-sm border-warning/30">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-foreground">{holdCount}</div>
                <div className="text-sm text-muted-foreground">HOLD Signals</div>
              </div>
              <div className="p-3 bg-warning/10 rounded-lg">
                <Minus className="w-8 h-8 text-warning" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-destructive/20 to-destructive/5 backdrop-blur-sm border-destructive/30">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-foreground">{sellCount}</div>
                <div className="text-sm text-muted-foreground">SELL Signals</div>
              </div>
              <div className="p-3 bg-destructive/10 rounded-lg">
                <TrendingDown className="w-8 h-8 text-destructive" />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Performance Chart Placeholder */}
      <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <BarChart2 className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Performance Comparison</h3>
        </div>
        <div className="h-64 flex items-center justify-center bg-background/30 rounded-lg border border-border">
          <div className="text-center space-y-2">
            <BarChart2 className="w-12 h-12 text-muted-foreground mx-auto" />
            <p className="text-muted-foreground">Interactive chart coming soon</p>
            <p className="text-xs text-muted-foreground">Powered by Plotly</p>
          </div>
        </div>
      </Card>

      {/* Detailed Stock Cards */}
      <div>
        <h3 className="text-2xl font-bold mb-6">Detailed Analysis</h3>
        <div className="space-y-4">
          {results.map((stock, index) => (
            <StockAnalysisCard
              key={stock.symbol}
              {...stock}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
