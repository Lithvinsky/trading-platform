const Trade = require("../models/Trade");

module.exports = {
  async getUserTrades(req, res) {
    const trades = await Trade.find({ userId: req.user.id });
    res.json(trades);
  },
};
