const mongoose = require("mongoose");

const tradeSchema = new mongoose.Schema({
  User_ID: {
    type: BigInt,
    required: true,
  },
  UTC_Time: {
    type: Date,
    default: Date.now(),
  },
  Operation: {
    type: String,
    enum: ["Buy", "Sell"],
    required: true,
  },
  Market: {
    type: String,
    required: true,
  },
  BuyOrSell: {
    type: Number,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
});

const TradeModel = mongoose.model("trade", tradeSchema);

module.exports = TradeModel;
