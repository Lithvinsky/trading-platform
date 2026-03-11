const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
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
    side: {
      type: String,
      required: true,
      enum: ["buy", "sell"],
    },
    type: {
      type: String,
      required: true,
      enum: ["market", "limit"],
    },
    quantity: {
      type: Number,
      required: true,
      min: 0.000001,
    },
    price: {
      type: Number,
      default: null,
      min: 0,
    },
    status: {
      type: String,
      required: true,
      enum: ["open", "filled", "cancelled", "partial"],
      default: "open",
    },
  },
  { timestamps: true },
);

orderSchema.pre("validate", function (next) {
  if (this.type === "limit" && (this.price == null || this.price <= 0)) {
    next(new Error("Price is required for limit orders"));
  } else {
    next();
  }
});

module.exports = mongoose.model("Order", orderSchema);
