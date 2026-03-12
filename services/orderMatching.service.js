const Order = require("../models/order");
const Trade = require("../models/trade");
const Wallet = require("../models/wallet");

module.exports = {
  async match(order) {
    const oppositeSide = order.side === "buy" ? "sell" : "buy";
    const priceFilter =
      order.type === "market"
        ? { $exists: true }
        : order.side === "buy"
          ? { $lte: order.price }
          : { $gte: order.price };

    const match = await Order.findOne({
      instrument: order.instrument,
      side: oppositeSide,
      status: "open",
      price: priceFilter,
    }).sort(order.side === "buy" ? "price" : "-price");

    if (!match) return;

    const fillPrice = order.type === "market" ? match.price : order.price;
    const fillQty = Math.min(order.quantity, match.quantity);

    const trade = await Trade.create({
      order: order._id,
      user: order.user,
      instrument: order.instrument,
      type: order.side,
      quantity: fillQty,
      price: fillPrice,
    });

    order.quantity -= fillQty;
    order.status = order.quantity <= 0 ? "filled" : "partial";
    match.quantity -= fillQty;
    match.status = match.quantity <= 0 ? "filled" : "partial";

    await order.save();
    await match.save();

    const buyerWallet = await Wallet.findOne({
      user: order.side === "buy" ? order.user : match.user,
    });
    const sellerWallet = await Wallet.findOne({
      user: order.side === "sell" ? order.user : match.user,
    });
    if (buyerWallet && sellerWallet) {
      buyerWallet.balance -= fillQty * fillPrice;
      sellerWallet.balance += fillQty * fillPrice;
      await buyerWallet.save();
      await sellerWallet.save();
    }
  },
};
