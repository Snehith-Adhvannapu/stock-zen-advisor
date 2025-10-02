const ALPHA_VANTAGE_API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;
const NEWS_API_KEY = import.meta.env.VITE_NEWSAPI_KEY;

export interface StockQuote {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume: number;
}

export interface StockOverview {
  symbol: string;
  name: string;
  description: string;
  marketCap: string;
  peRatio: string;
  week52High: string;
  week52Low: string;
  dividendYield: string;
  eps: string;
}

export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
}

const SECTOR_STOCKS: Record<string, string[]> = {
  'Technology': ['INFY.BSE', 'TCS.BSE', 'WIPRO.BSE', 'HCLTECH.BSE', 'TECHM.BSE'],
  'Banking': ['HDFCBANK.BSE', 'ICICIBANK.BSE', 'SBIN.BSE', 'AXISBANK.BSE', 'KOTAKBANK.BSE'],
  'Energy': ['RELIANCE.BSE', 'ONGC.BSE', 'NTPC.BSE', 'POWERGRID.BSE', 'BPCL.BSE'],
  'Healthcare': ['SUNPHARMA.BSE', 'DRREDDY.BSE', 'CIPLA.BSE', 'DIVISLAB.BSE', 'BIOCON.BSE'],
  'Consumer': ['HINDUNILVR.BSE', 'ITC.BSE', 'NESTLEIND.BSE', 'BRITANNIA.BSE', 'DABUR.BSE'],
  'Automotive': ['MARUTI.BSE', 'TATAMOTORS.BSE', 'M&M.BSE', 'BAJAJ-AUTO.BSE', 'HEROMOTOCO.BSE']
};

export async function getStockQuote(symbol: string): Promise<StockQuote | null> {
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
    );
    const data = await response.json();
    
    if (data['Global Quote'] && Object.keys(data['Global Quote']).length > 0) {
      const quote = data['Global Quote'];
      return {
        symbol: quote['01. symbol'],
        price: parseFloat(quote['05. price']),
        change: parseFloat(quote['09. change']),
        changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
        high: parseFloat(quote['03. high']),
        low: parseFloat(quote['04. low']),
        volume: parseInt(quote['06. volume'])
      };
    }
    return null;
  } catch (error) {
    console.error(`Error fetching quote for ${symbol}:`, error);
    return null;
  }
}

export async function getStockOverview(symbol: string): Promise<StockOverview | null> {
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
    );
    const data = await response.json();
    
    if (data.Symbol) {
      return {
        symbol: data.Symbol,
        name: data.Name || symbol,
        description: data.Description || '',
        marketCap: data.MarketCapitalization || 'N/A',
        peRatio: data.PERatio || 'N/A',
        week52High: data['52WeekHigh'] || 'N/A',
        week52Low: data['52WeekLow'] || 'N/A',
        dividendYield: data.DividendYield || 'N/A',
        eps: data.EPS || 'N/A'
      };
    }
    return null;
  } catch (error) {
    console.error(`Error fetching overview for ${symbol}:`, error);
    return null;
  }
}

export async function getStockNews(symbol: string, companyName: string): Promise<NewsArticle[]> {
  try {
    const searchQuery = companyName || symbol.replace('.BSE', '').replace('.NSE', '');
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchQuery)}&language=en&sortBy=publishedAt&pageSize=5&apikey=${NEWS_API_KEY}`
    );
    const data = await response.json();
    
    if (data.articles && data.articles.length > 0) {
      return data.articles.map((article: any) => ({
        title: article.title,
        description: article.description,
        url: article.url,
        publishedAt: article.publishedAt,
        source: article.source.name,
        sentiment: analyzeSentiment(article.title + ' ' + (article.description || ''))
      }));
    }
    return [];
  } catch (error) {
    console.error(`Error fetching news for ${symbol}:`, error);
    return [];
  }
}

function analyzeSentiment(text: string): 'positive' | 'negative' | 'neutral' {
  const lowerText = text.toLowerCase();
  const positiveWords = ['growth', 'profit', 'gain', 'rise', 'surge', 'success', 'strong', 'beat', 'high', 'boost', 'up', 'bullish', 'record'];
  const negativeWords = ['loss', 'fall', 'drop', 'decline', 'down', 'weak', 'miss', 'low', 'cut', 'bearish', 'crash', 'slump'];
  
  const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
  const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;
  
  if (positiveCount > negativeCount) return 'positive';
  if (negativeCount > positiveCount) return 'negative';
  return 'neutral';
}

export function getSectorStocks(sector: string): string[] {
  return SECTOR_STOCKS[sector] || [];
}

export function calculateSentimentScore(articles: NewsArticle[]): number {
  if (articles.length === 0) return 50;
  
  const sentimentScores = articles.map(article => {
    if (article.sentiment === 'positive') return 100;
    if (article.sentiment === 'negative') return 0;
    return 50;
  });
  
  const avgScore = sentimentScores.reduce((a, b) => a + b, 0) / sentimentScores.length;
  return Math.round(avgScore);
}

export function calculateFundamentalScore(overview: StockOverview | null): number {
  if (!overview) return 50;
  
  let score = 50;
  
  const pe = parseFloat(overview.peRatio);
  if (!isNaN(pe)) {
    if (pe > 0 && pe < 15) score += 20;
    else if (pe >= 15 && pe < 25) score += 10;
    else if (pe >= 25 && pe < 35) score += 5;
  }
  
  const eps = parseFloat(overview.eps);
  if (!isNaN(eps) && eps > 0) {
    score += 15;
  }
  
  const dividendYield = parseFloat(overview.dividendYield);
  if (!isNaN(dividendYield) && dividendYield > 0) {
    score += 15;
  }
  
  return Math.min(Math.max(score, 0), 100);
}

export function generateRecommendation(
  fundamentalScore: number,
  sentimentScore: number,
  analysisWeight: number
): 'BUY' | 'HOLD' | 'SELL' {
  const weightedScore = (fundamentalScore * (analysisWeight / 100)) + (sentimentScore * ((100 - analysisWeight) / 100));
  
  if (weightedScore >= 70) return 'BUY';
  if (weightedScore >= 50) return 'HOLD';
  return 'SELL';
}
