const express = require("express");
const app = express();
const mongoose = require("mongoose");

const routes = require("./routes/routes");

const MONGO_URI =
  "mongodb+srv://trading_user:8Wk0zmMwnLX1Zi9w@cluster0.hwycxmk.mongodb.net/?appName=Cluster0";

app.use(express.json());

app.use(routes);

app.use("/api", routes);

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
