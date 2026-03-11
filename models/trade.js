const mongoose = require("mongoose");

const tradeSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    instrument: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["buy", "sell"],
    },
    quantity: {
      type: Number,
      required: true,
      min: 0.000001,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    executedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trade", tradeSchema);
