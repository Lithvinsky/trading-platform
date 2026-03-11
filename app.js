const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");
const assetRoutes = require("./routes/asset.routes");
const orderRoutes = require("./routes/order.routes");
const tradeRoutes = require("./routes/trade.routes");

const MONGO_URI =
  "mongodb+srv://trading_user:8Wk0zmMwnLX1Zi9w@cluster0.hwycxmk.mongodb.net/?appName=Cluster0";
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/assets", assetRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/trades", tradeRoutes);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
