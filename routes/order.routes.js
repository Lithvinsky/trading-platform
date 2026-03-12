const router = require("express").Router();
const OrderController = require("../controllers/order.controller");
const { auth } = require("../middleware/auth");

router.use(auth);
router.post("/", OrderController.createOrder);
router.get("/", OrderController.getUserOrders);
router.post("/:id/cancel", OrderController.cancelOrder);

module.exports = router;
