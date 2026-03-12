const Order = require("../models/order");
const Asset = require("../models/asset");
const MatchingService = require("../services/orderMatching.service");

exports.createOrder = async (req, res) => {
  try {
    const { instrumentId, symbol, side, type, quantity, price } = req.body;
    let instrument = instrumentId;
    if (!instrument && symbol) {
      const asset = await Asset.findOne({ symbol: symbol.toUpperCase() });
      if (!asset) return res.status(400).json({ error: "Asset not found" });
      instrument = asset._id;
    }
    if (!instrument || !side || !type || !quantity)
      return res.status(400).json({ error: "instrument/symbol, side, type, quantity required" });

    const order = await Order.create({
      user: req.user.id,
      instrument,
      side,
      type,
      quantity,
      price: type === "limit" ? price : null,
    });
    if (order.status === "open") await MatchingService.match(order);
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id });
  res.json(orders);
};

exports.cancelOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order || order.user.toString() !== req.user.id)
    return res.status(404).json({ error: "Order not found" });
  if (order.status !== "open")
    return res.status(400).json({ error: "Order cannot be cancelled" });
  order.status = "cancelled";
  await order.save();
  res.json(order);
};
