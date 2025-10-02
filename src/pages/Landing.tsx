import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bot, TrendingUp, Zap, Shield, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Landing = () => {
  const navigate = useNavigate();
  const [hoveredMode, setHoveredMode] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-bg text-foreground overflow-hidden relative">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-success/5 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      
      {/* Header */}
      <header className="container mx-auto px-4 py-8 relative">
        <div className="flex items-center justify-center gap-3 animate-fade-in">
          <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
            <Sparkles className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
            Algora
          </h1>
        </div>
        <p className="text-center text-muted-foreground mt-2 animate-fade-in">
          Next-Generation AI Trading Platform
        </p>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-slide-in">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Choose Your Trading Mode
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select the mode that best fits your trading style and experience level
            </p>
          </div>

          {/* Mode Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Auto Trading Mode */}
            <div
              className={`relative group cursor-pointer transition-all duration-500 animate-scale-in ${
                hoveredMode === "auto" ? "scale-105" : hoveredMode ? "scale-95 opacity-50" : ""
              }`}
              onMouseEnter={() => setHoveredMode("auto")}
              onMouseLeave={() => setHoveredMode(null)}
              onClick={() => navigate("/auto-trading")}
            >
              <div className="relative h-full bg-card/50 backdrop-blur-sm border-2 border-border rounded-2xl p-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-xl bg-gradient-primary flex items-center justify-center mb-6 shadow-glow">
                    <Zap className="w-8 h-8 text-primary-foreground" />
                  </div>

                  <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                    Auto Trading
                    <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full">AI</span>
                  </h3>

                  <p className="text-muted-foreground mb-6">
                    Fully automated trading powered by advanced AI algorithms. 
                    Sit back while our AI executes trades 24/7 based on market conditions.
                  </p>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-success" />
                      </div>
                      <span className="text-sm">Automated execution & risk management</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-success" />
                      </div>
                      <span className="text-sm">24/7 market monitoring</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-success" />
                      </div>
                      <span className="text-sm">Real-time portfolio optimization</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground group-hover:shadow-glow transition-all"
                  >
                    Start Auto Trading
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>

            {/* AI Stock Advisor Mode */}
            <div
              className={`relative group cursor-pointer transition-all duration-500 animate-scale-in ${
                hoveredMode === "advisor" ? "scale-105" : hoveredMode ? "scale-95 opacity-50" : ""
              }`}
              onMouseEnter={() => setHoveredMode("advisor")}
              onMouseLeave={() => setHoveredMode(null)}
              onClick={() => navigate("/stock-advisor")}
            >
              <div className="relative h-full bg-card/50 backdrop-blur-sm border-2 border-border rounded-2xl p-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-success/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-success to-success-dark flex items-center justify-center mb-6 shadow-lg shadow-success/20">
                    <Bot className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                    AI Stock Advisor
                    <span className="text-xs px-2 py-1 bg-success/20 text-success rounded-full">Recommended</span>
                  </h3>

                  <p className="text-muted-foreground mb-6">
                    Get intelligent stock recommendations with detailed analysis. 
                    Perfect for informed decision-making with full control.
                  </p>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-success" />
                      </div>
                      <span className="text-sm">Multi-agent AI analysis</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-success" />
                      </div>
                      <span className="text-sm">Fundamental + sentiment analysis</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-success" />
                      </div>
                      <span className="text-sm">Detailed recommendations & insights</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-success to-success-dark hover:opacity-90 text-white group-hover:shadow-lg group-hover:shadow-success/20 transition-all"
                  >
                    Get Stock Insights
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-20 text-center">
            <div className="flex flex-wrap gap-6 justify-center">
              <div className="flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-sm rounded-lg border border-border">
                <TrendingUp className="w-5 h-5 text-success" />
                <span className="text-sm">Real-Time Data</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-sm rounded-lg border border-border">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm">Secure & Reliable</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-sm rounded-lg border border-border">
                <Bot className="w-5 h-5 text-warning" />
                <span className="text-sm">AI-Powered</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full py-6 text-center text-sm text-muted-foreground">
        <p>⚠️ For educational purposes only • Not financial advice</p>
      </footer>
    </div>
  );
};

export default Landing;
