import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;
const ADSB_KEY = process.env.ADSB_KEY;

app.get("/api/flight/:callsign", async (req, res) => {
  try {
    const callsign = req.params.callsign;

    const response = await fetch(
      `https://api.adsbexchange.com/v2/callsign/${callsign}`,
      {
        headers: {
          "api-auth": ADSB_KEY
        }
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});