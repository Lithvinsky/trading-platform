const Wallet = require("../models/wallet");

((exports.getWallet = async (req, res) => {
  const wallet = await Wallet.findOne({ userId: req.user.id });
  res.json(wallet);
}),
  (exports.deposit = async (req, res) => {
    try {
      const { amount } = req.body;
      const wallet = await Wallet.findOne({ userId: req.user.id });

      wallet.balance += amount;
      await wallet.save();

      res.json(wallet);
    } catch (error) {
      res.status(500).json({ error: "Failed to deposit funds" });
      console.error(error);
    }
  }),
  (exports.withdraw = async (req, res) => {
    try {
      const { amount } = req.body;
      if (!amount || amount <= 0) {
        return res.status(400).json({ error: "Invalid amount" });
      }
      const wallet = await Wallet.findOne({ userId: req.user.id });

      if (wallet.balance < amount)
        return res.status(400).json({ error: "Insufficient funds" });

      wallet.balance -= amount;
      await wallet.save();

      res.json(wallet);
    } catch (error) {
      return res.status(500).json({ error: "Failed to withdraw funds" });
    }
  }));
