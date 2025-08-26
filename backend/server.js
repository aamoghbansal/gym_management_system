const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { testConnection } = require("./config/db");
const memberRoutes = require("./routes/memberRoutes");

dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Test DB connection
testConnection();

// ✅ Routes
app.get("/", (req, res) => {
  res.send("🚀 Server is running with MySQL backend!");
});

// ✅ New /api health-check route
app.get("/api", (req, res) => {
  res.send("✅ API is running! Use /api/members to manage members.");
});

app.use("/api/members", memberRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
