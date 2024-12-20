const router = require("express").Router();
const Transaction = require("../models/Transaction");
const auth = require("../middleware/auth");

// Record stock purchase
router.post("/buy", auth, async (req, res) => {
  const { stockSymbol, quantity, price } = req.body;

  const transaction = new Transaction({
    userId: req.user.userId,
    stockSymbol,
    quantity,
    price,
    type: "BUY",
  });

  await transaction.save();
  res.json({ message: "Stock purchase recorded", transaction });
});

// Record stock sale
router.post("/sell", auth, async (req, res) => {
  const { stockSymbol, quantity, price } = req.body;

  const transaction = new Transaction({
    userId: req.user.userId,
    stockSymbol,
    quantity,
    price,
    type: "SELL",
  });

  await transaction.save();
  res.json({ message: "Stock sale recorded", transaction });
});

// Retrieve transaction history
router.get("/history", auth, async (req, res) => {
  const transactions = await Transaction.find({ userId: req.user.userId }).sort(
    {
      date: -1,
    }
  );
  res.json(transactions);
});

module.exports = router;
