const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { testConnection } = require("./config/db");
const memberRoutes = require("./routes/memberRoutes");

dotenv.config();

const app = express();

// ✅ CORS Configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Test DB connection
testConnection();

// ✅ Routes
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 Gym Management API is running!",
    endpoints: {
      members: "/api/members",
      health: "/api/health"
    }
  });
});

// ✅ Health check route
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "✅ API is healthy!",
    timestamp: new Date().toISOString()
  });
});

app.use("/api/members", memberRoutes);

// ✅ Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Unhandled error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// ✅ 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌐 API available at http://localhost:${PORT}`);
  console.log(`📋 Members endpoint: http://localhost:${PORT}/api/members`);
});
