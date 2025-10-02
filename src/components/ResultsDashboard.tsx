import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Minus, BarChart2, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { StockAnalysisCard } from "@/components/StockAnalysisCard";
import { 
  getSectorStocks, 
  getStockQuote, 
  getStockOverview, 
  getStockNews,
  calculateSentimentScore,
  calculateFundamentalScore,
  generateRecommendation,
  type StockQuote,
  type StockOverview,
  type NewsArticle
} from "@/lib/stockApi";

interface ResultsDashboardProps {
  sector: string;
  stockCount: number;
  analysisWeight: number;
}

export interface StockAnalysis {
  symbol: string;
  name: string;
  price: number;
  change: number;
  recommendation: "BUY" | "HOLD" | "SELL";
  fundamentalScore: number;
  sentimentScore: number;
  overview: StockOverview | null;
  news: NewsArticle[];
}

export const ResultsDashboard = ({ sector, stockCount, analysisWeight }: ResultsDashboardProps) => {
  const [results, setResults] = useState<StockAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStockData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const stockSymbols = getSectorStocks(sector).slice(0, stockCount);
        const stockData: StockAnalysis[] = [];

        for (const symbol of stockSymbols) {
          const quote = await getStockQuote(symbol);
          await new Promise(resolve => setTimeout(resolve, 12000));
          
          const overview = await getStockOverview(symbol);
          await new Promise(resolve => setTimeout(resolve, 12000));
          
          const news = await getStockNews(symbol, overview?.name || symbol);
          
          if (quote) {
            const fundamentalScore = calculateFundamentalScore(overview);
            const sentimentScore = calculateSentimentScore(news);
            const recommendation = generateRecommendation(fundamentalScore, sentimentScore, analysisWeight);
            
            stockData.push({
              symbol: symbol.replace('.BSE', ''),
              name: overview?.name || symbol.replace('.BSE', ''),
              price: quote.price,
              change: quote.changePercent,
              recommendation,
              fundamentalScore,
              sentimentScore,
              overview,
              news
            });
          }
          
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        setResults(stockData);
      } catch (err) {
        console.error('Error fetching stock data:', err);
        setError('Failed to fetch stock data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, [sector, stockCount, analysisWeight]);
  
  const buyCount = results.filter(r => r.recommendation === "BUY").length;
  const holdCount = results.filter(r => r.recommendation === "HOLD").length;
  const sellCount = results.filter(r => r.recommendation === "SELL").length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" data-testid="loader-stocks" />
          <div>
            <p className="text-lg font-semibold" data-testid="text-loading">Analyzing stocks...</p>
            <p className="text-sm text-muted-foreground">Fetching real-time market data</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-6 bg-destructive/10 border-destructive/30">
        <p className="text-destructive" data-testid="text-error">{error}</p>
      </Card>
    );
  }

  if (results.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-muted-foreground" data-testid="text-no-results">No stock data available for this sector.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div>
        <h2 className="text-3xl font-bold mb-6">Analysis Results</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 bg-gradient-success backdrop-blur-sm border-success/30" data-testid="card-buy-signals">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-success-foreground" data-testid="text-buy-count">{buyCount}</div>
                <div className="text-sm text-success-foreground/80">BUY Signals</div>
              </div>
              <div className="p-3 bg-success-foreground/10 rounded-lg">
                <TrendingUp className="w-8 h-8 text-success-foreground" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-warning/20 to-warning/5 backdrop-blur-sm border-warning/30" data-testid="card-hold-signals">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-foreground" data-testid="text-hold-count">{holdCount}</div>
                <div className="text-sm text-muted-foreground">HOLD Signals</div>
              </div>
              <div className="p-3 bg-warning/10 rounded-lg">
                <Minus className="w-8 h-8 text-warning" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-destructive/20 to-destructive/5 backdrop-blur-sm border-destructive/30" data-testid="card-sell-signals">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-foreground" data-testid="text-sell-count">{sellCount}</div>
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
