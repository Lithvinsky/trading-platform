const router = require("express").Router();
const TradeController = require("../controllers/trade.controller");
const { auth } = require("../middleware/auth");

router.use(auth);
router.get("/", TradeController.getUserTrades);

module.exports = router;
