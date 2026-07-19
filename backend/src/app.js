const employeeRoutes = require("./routes/employee.routes");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(morgan("dev"));

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Employee Salary Management API is running..."
  });
});

app.use("/api/v1/employees", employeeRoutes);

// TODO: API Routes
// app.use("/api/employees", employeeRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

module.exports = app;