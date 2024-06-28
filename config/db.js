const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to database 1"))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};

module.exports = connectDB;
