const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

// ==========================================
// CONNECT MONGODB
// ==========================================

connectDB();

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://data-vista-nine.vercel.app",
    ],
    methods: [
      "GET",
      "POST",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

app.use(express.json());

// ==========================================
// HOME ROUTE
// ==========================================

app.get("/", (req, res) => {
  res.json({
    message: "DataVista Backend API is running 🚀",
  });
});

// ==========================================
// ROUTES
// ==========================================

const adminRoutes = require("./routes/admin");
const notesRoutes = require("./routes/notes");
const serviceRequestRoutes = require("./routes/serviceRequests");

// Admin routes
app.use("/api/admin", adminRoutes);

// Learning notes routes
app.use("/api/notes", notesRoutes);

// Customer service request routes
app.use(
  "/api/service-requests",
  serviceRequestRoutes
);

// ==========================================
// LOCAL UPLOADS
// ==========================================

app.use(
  "/uploads",
  express.static("uploads")
);

// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {
  console.log(
    `DataVista Backend running on http://localhost:${PORT}`
  );
});