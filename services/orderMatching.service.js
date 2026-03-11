const Order = require("../models/order");
const Trade = require("../models/Trade");
const Wallet = require("../models/wallet");

module.exports = {
  async match(order) {
    const oppositeSide = order.side === "buy" ? "sell" : "buy";

    const match = await Order.findOne({
      symbol: order.symbol,
      side: oppositeSide,
      status: "open",
      price: order.type === "market" ? { $exists: true } : order.price,
    });

    if (!match) return;

    const trade = await Trade.create({
      orderId: order._id,
      userId: order.userId,
      symbol: order.symbol,
      amount: order.amount,
      price: match.price,
    });

    order.status = "filled";
    match.status = "filled";

    await order.save();
    await match.save();

    const buyer = await Wallet.findOne({ userId: order.userId });
    const seller = await Wallet.findOne({ userId: match.userId });

    buyer.balance -= trade.amount * trade.price;
    seller.balance += trade.amount * trade.price;

    await buyer.save();
    await seller.save();
  },
};
