const router = require("express").Router();
const { getBulkStockQuotes } = require("../services/stockService");

const stockPriceHistory = {};

// Get current stock price
router.get("/:symbol", async (req, res) => {
  const { symbol } = req.params;

  try {
    const stockData = await getBulkStockQuotes(symbol);
    if (stockData.length === 0) {
      return res
        .status(404)
        .json({ message: `No data found for symbol: ${symbol}` });
    }

    const currentPrice = stockData[0].close; 

    // Save price to history
    if (!stockPriceHistory[symbol]) stockPriceHistory[symbol] = [];
    stockPriceHistory[symbol].push({
      date: new Date(),
      price: currentPrice,
    });

    res.json({ stockSymbol: symbol, currentPrice });
  } catch (error) {
    console.error("Error fetching stock data:", error.message);
    res.status(500).json({ message: "Failed to fetch stock price" });
  }
});

// Get stock price history
router.get("/history/:symbol", (req, res) => {
  const { symbol } = req.params;

  if (!stockPriceHistory[symbol]) {
    return res.status(404).json({ message: "No price history found" });
  }

  res.json({ stockSymbol: symbol, priceHistory: stockPriceHistory[symbol] });
});

module.exports = router;

