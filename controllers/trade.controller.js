const Trade = require("../models/trade");

exports.getUserTrades = async (req, res) => {
  const trades = await Trade.find({ user: req.user.id });
  res.json(trades);
};
