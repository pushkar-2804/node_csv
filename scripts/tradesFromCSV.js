const TradeModel = require("../models/TradeModel.js");
const fs = require("fs");
const csvParser = require("csv-parser");
const path = require("path");

const tradesFromCSV = async () => {
  const result = [];
  const csvFilePath = path.join(__dirname, "../data/sample.csv");
  try {
    fs.createReadStream(csvFilePath)
      .pipe(csvParser())
      .on("data", (row) => {
        result.push({
          User_ID: parseInt(row["User_ID"], 10),
          UTC_Time: new Date(row["UTC_Time"]),
          Operation: row["Operation"],
          Market: row["Market"],
          BuyOrSell: parseFloat(row["Buy/Sell Amount"]),
          Price: parseFloat(row["Price"]),
        });
      })
      .on("end", async () => {
        try {
          await TradeModel.insertMany(result);
          console.log("Data inserted successfully");
        } catch (error) {
          console.log("Error inserting data:", error);
        }
      });
  } catch (error) {
    console.error("Error reading CSV file:", error);
  }
};

module.exports = tradesFromCSV;
