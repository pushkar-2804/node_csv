const TradeModel = require("../models/TradeModel");

exports.getBalance = async (req, res) => {
  const { timestamp } = req.body;
  try {
    const trades = await TradeModel.find({
      UTC_Time: { $lte: new Date(timestamp) },
    });
    const balance = {};
    trades.forEach((trade) => {
      const [baseCoin, quoteCoin] = trade.Market.split("/");
      if (!balance[baseCoin]) balance[baseCoin] = 0;

      if (trade.Operation === "Buy") {
        balance[baseCoin] += trade.BuyOrSell;
      } else {
        balance[baseCoin] -= trade.BuyOrSell;
      }
    });
    res.status(200).json(balance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
