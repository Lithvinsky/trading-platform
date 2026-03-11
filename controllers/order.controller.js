const Order = require("../models/order");
const Wallet = require("../models/wallet");
const MatchingService = require("../services/orderMatching.service");

exports.createOrder = async (req, res) => {
  const { symbol, side, type, amount, price } = req.body;

  const order = await Order.create({
    userId: req.user.id,
    symbol,
    side,
    type,
    amount,
    price,
  });
};

exports.getUserOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user.id });
  res.json(orders);
};

exports.cancelOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order || order.userId.toString() !== req.user.id)
    return res.status(404).json({ error: "Order not found" });

  order.status = "cancelled";
  await order.save();

  res.json(order);
};
