const FINNHUB_BASE = "https://finnhub.io/api/v1";

/**
 * Fetch real-time quote (current price) from Finnhub for a symbol.
 * Uses FINNHUB_API_KEY from environment.
 * @param {string} symbol - Ticker symbol (e.g. AAPL, BINANCE:BTCUSDT)
 * @returns {Promise<{ c?: number, h?: number, l?: number, o?: number, pc?: number, t?: number } | null>}
 */
async function fetchQuote(symbol) {
  const apiKey = process.env.FINNHUB_API_KEY;
  if (!apiKey) {
    throw new Error("FINNHUB_API_KEY is not set");
  }
  const url = `${FINNHUB_BASE}/quote?symbol=${encodeURIComponent(symbol)}&token=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  return data;
}

module.exports = { fetchQuote };
