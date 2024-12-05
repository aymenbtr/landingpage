const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5001; // Change the port to 5001

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Configuration
const mongoURL = "mongodb://localhost:27017";
const dbName = "persone";

let db;
MongoClient.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to Database");
    db = client.db(dbName);
  })
  .catch((error) => console.error(error));

// API Routes
app.post("/add-payment", async (req, res) => {
  const { cardNumber, cardName, expiryDate, cvv } = req.body;

  if (!cardNumber || !cardName || !expiryDate || !cvv) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const collection = db.collection("people");
    const result = await collection.insertOne({ cardNumber, cardName, expiryDate, cvv });
    res.status(201).json({ message: "Payment saved successfully!", id: result.insertedId });
  } catch (error) {
    console.error("Error saving payment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
