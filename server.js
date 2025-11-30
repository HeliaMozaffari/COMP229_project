// server.js  (in C:\Users\Helia\OneDrive\Desktop\booknest-library)
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const bookRoutes = require("./src/routes/bookRoutes");
const authRoutes = require('./src/routes/authRoutes'); 

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(morgan("dev"));
app.use(bodyParser.json());

// API routes
app.use("/api/books", bookRoutes);

// Simple health check
app.get("/", (req, res) => {
  res.json({ message: "BookNest backend is running " });
});

app.listen(PORT, () => {
  console.log(` Backend server running on http://localhost:${PORT}`);
});
