const router = require("express").Router();
const WalletController = require("../controllers/wallet.controller");

router.get("/", WalletController.getWallet);
router.post("/deposit", WalletController.deposit);
router.post("/withdraw", WalletController.withdraw);

module.exports = router;
