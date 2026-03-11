const router = require("express").Router();
const AssetController = require("../controllers/asset.controller");

router.get("/", AssetController.getAll);
router.get("/:symbol", AssetController.getOne);

module.exports = router;
