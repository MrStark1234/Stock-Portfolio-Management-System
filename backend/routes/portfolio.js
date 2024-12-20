const router = require("express").Router();
const StockHolding = require("../models/StockHolding");
const auth = require("../middleware/auth");

// Add stock to portfolio
router.post("/add", auth, async (req, res) => {
  const { stockSymbol, quantity, averagePrice } = req.body;

  const holding = new StockHolding({
    userId: req.user.userId,
    stockSymbol,
    quantity,
    averagePrice,
  });

  await holding.save();
  res.json({ message: "Stock added to portfolio", holding });
});

// Remove stock from portfolio
router.delete("/remove/:id", auth, async (req, res) => {
  await StockHolding.findByIdAndDelete(req.params.id);
  res.json({ message: "Stock removed from portfolio" });
});

// Get current portfolio value
router.get("/value", auth, async (req, res) => {
  try {
    // Fetch user's holdings
    const holdings = await StockHolding.find({ userId: req.user.userId });

    if (!holdings || holdings.length === 0) {
      return res
        .status(404)
        .json({ message: "No holdings found for the user" });
    }

    let totalValue = 0;

    // Calculate total portfolio value
    holdings.forEach((holding) => {
      totalValue += holding.averagePrice * holding.quantity;
    });

    res.json({
      totalPortfolioValue: totalValue,
      detailedHoldings: holdings.map((holding) => ({
        stockSymbol: holding.stockSymbol,
        quantity: holding.quantity,
        currentPrice: holding.averagePrice || 0,
        totalValue: holding.averagePrice * holding.quantity,
      })),
    });
  } catch (error) {
    console.error("Error calculating portfolio value:", error.message);
    res.status(500).json({ message: "Failed to calculate portfolio value" });
  }
});

// List all holdings
router.get("/holdings", auth, async (req, res) => {
  const holdings = await StockHolding.find({ userId: req.user.userId });
  res.json(holdings);
});

module.exports = router;
