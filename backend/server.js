const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const Samsara = require("./src/samsara");

// Load environment variables from .env file
dotenv.config();

const samsara = new Samsara(process.env.API_KEY);

// Initialize Express
const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/asset-location", (req, res) => {
  samsara
    .getAssetLocation()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ error: error });
    });
});

app.get("/hos", (req, res) => {
  const rest = Number(req.query.rest) || -1;
  const drive = Number(req.query.drive) || -1;
  const shift = Number(req.query.shift) || -1;
  const cycle = Number(req.query.cycle) || -1;

  samsara
    .getHOSClocksBelow(rest, drive, shift, cycle)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ error: error });
    });
});

app.get("/driver/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  samsara
    .getDriverById(id)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ error: error });
    });
});

app.get("/fuel/:percentage", (req, res) => {
  const level = req.params.percentage;
  samsara
    .fetchFuelBelow(level)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ error: error });
    });
});

// 404 Route for Not Found
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

// Port Configuration from .env or default to 3000
const PORT = process.env.PORT || 3000;

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
