import { useNavigate } from "react-router-dom";
import { ArrowLeft, Zap, TrendingUp, Activity, DollarSign, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";

const AutoTrading = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-bg text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Mode Selection
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <LineChart className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold">Auto Trading</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-warning/10 border border-warning/20 rounded-full mb-4">
            <Activity className="w-4 h-4 text-warning" />
            <span className="text-sm text-warning">Coming Soon</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold">
            Auto Trading Mode
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Fully automated trading powered by advanced AI algorithms. 
            This feature is currently under development and will be available soon.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Automated Execution</h3>
              <p className="text-sm text-muted-foreground">
                AI executes trades automatically based on market conditions
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
              <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
              <h3 className="font-semibold mb-2">24/7 Monitoring</h3>
              <p className="text-sm text-muted-foreground">
                Continuous market surveillance and instant opportunity detection
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
              <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-6 h-6 text-warning" />
              </div>
              <h3 className="font-semibold mb-2">Risk Management</h3>
              <p className="text-sm text-muted-foreground">
                Advanced algorithms to protect your capital and maximize returns
              </p>
            </div>
          </div>

          <div className="pt-8">
            <Button
              onClick={() => navigate("/stock-advisor")}
              size="lg"
              className="bg-gradient-to-r from-success to-success-dark hover:opacity-90 text-white"
            >
              Try AI Stock Advisor Instead
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AutoTrading;
