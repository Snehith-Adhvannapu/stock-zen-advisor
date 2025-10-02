import { useState } from "react";
import { TrendingUp, BarChart3, Shield, Sparkles } from "lucide-react";
import { SectorSelector } from "@/components/SectorSelector";
import { AnalysisControls } from "@/components/AnalysisControls";
import { ResultsDashboard } from "@/components/ResultsDashboard";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [analysisWeight, setAnalysisWeight] = useState(50);
  const [stockCount, setStockCount] = useState(5);
  const [riskTolerance, setRiskTolerance] = useState("moderate");
  const [showResults, setShowResults] = useState(false);

  const handleAnalyze = () => {
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-gradient-bg text-foreground overflow-x-hidden">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-success/10 pointer-events-none" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-sm border border-border rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">AI-Powered Stock Analysis</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              Indian Market Intelligence
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Multi-agent AI system combining fundamental analysis with real-time sentiment data 
              to deliver actionable investment insights for the Indian stock market.
            </p>

            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-sm rounded-lg border border-border">
                <TrendingUp className="w-5 h-5 text-success" />
                <span className="text-sm">Real-Time Data</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-sm rounded-lg border border-border">
                <BarChart3 className="w-5 h-5 text-primary" />
                <span className="text-sm">Multi-Agent Analysis</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-sm rounded-lg border border-border">
                <Shield className="w-5 h-5 text-warning" />
                <span className="text-sm">Smart Caching</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-24">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Sector Selection */}
          <section className="animate-slide-in">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-3">Choose Your Sector</h2>
              <p className="text-muted-foreground">
                Select a sector to analyze top-performing stocks from the Indian market
              </p>
            </div>
            <SectorSelector 
              selectedSector={selectedSector}
              onSelectSector={setSelectedSector}
            />
          </section>

          {/* Analysis Controls */}
          {selectedSector && (
            <section className="animate-scale-in">
              <AnalysisControls
                analysisWeight={analysisWeight}
                onAnalysisWeightChange={setAnalysisWeight}
                stockCount={stockCount}
                onStockCountChange={setStockCount}
                riskTolerance={riskTolerance}
                onRiskToleranceChange={setRiskTolerance}
              />

              <div className="flex justify-center mt-8">
                <Button 
                  onClick={handleAnalyze}
                  size="lg"
                  className="bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold px-8 py-6 text-lg shadow-glow transition-all hover:scale-105"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Analyze Stocks
                </Button>
              </div>
            </section>
          )}

          {/* Results Dashboard */}
          {showResults && selectedSector && (
            <section className="animate-fade-in">
              <ResultsDashboard 
                sector={selectedSector}
                stockCount={stockCount}
                analysisWeight={analysisWeight}
              />
            </section>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 backdrop-blur-sm mt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>Built for hackathons and demonstrations • Data provided by yfinance & NewsAPI</p>
            <p className="mt-2">⚠️ For educational purposes only • Not financial advice</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
