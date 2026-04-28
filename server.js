import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend is working ✅");
});

app.get("/test", (req, res) => {
  res.send("Test route works ✅");
});

const PORT = process.env.PORT || 3000;
const ADSB_KEY = process.env.ADSB_KEY;

app.get("/api/flight/:flight", async (req, res) => {
  try {
    const flight = req.params.flight;

    const url = `http://api.aviationstack.com/v1/flights?access_key=${process.env.AVIATION_KEY}&flight_iata=${flight}`;

    const response = await fetch(url);
    const data = await response.json();

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
