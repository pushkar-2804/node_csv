const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const router = require("./routes/balanceRoute.js");
const tradesFromCSV = require("./scripts/tradesFromCSV.js");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use("/api/v1", router);

const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectDB();
  app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await tradesFromCSV();
  });
}

startServer();
