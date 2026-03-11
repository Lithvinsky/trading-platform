const mongoose = require("mongoose");
const { fetchQuote } = require("../services/finnhub");

const assetSchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["stock", "crypto", "forex", "etf"],
    },
    actualPrice: {
      type: Number,
      default: null,
    },
    lastPriceUpdatedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Fetch current price from Finnhub and update this asset
assetSchema.methods.updatePriceFromFinnhub = async function () {
  const quote = await fetchQuote(this.symbol);
  if (quote && quote.c != null) {
    this.actualPrice = quote.c;
    this.lastPriceUpdatedAt = new Date();
    await this.save();
    return this.actualPrice;
  }
  return null;
};

// Static: refresh price for an asset by symbol
assetSchema.statics.refreshPrice = async function (symbol) {
  const asset = await this.findOne({ symbol: symbol.toUpperCase() });
  if (!asset) return null;
  return asset.updatePriceFromFinnhub();
};

module.exports = mongoose.model("Asset", assetSchema);
