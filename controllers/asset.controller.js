const Asset = require("../models/Asset");

exports.getAll = async (req, res) => {
  const assets = await Asset.find();
  res.json(assets);
};
exports.getOne = async (req, res) => {
  const asset = await Asset.findOne({ symbol: req.params.symbol });
  res.json(asset);
};
