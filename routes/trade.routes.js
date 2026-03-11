const router = require("express").Router();
const TradeController = require("../controllers/trade.controller");

router.get("/", TradeController.getUserTrades);

module.exports = router;
