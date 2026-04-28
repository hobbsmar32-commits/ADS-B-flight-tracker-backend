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

app.get("/api/flight/:callsign", async (req, res) => {
  try {
    const callsign = req.params.callsign;

    const response = await fetch(
      `https://api.adsbexchange.com/v2/callsign/${callsign}`,
      {
        headers: {
          "api-auth": process.env.ADSB_KEY
        }
      }
    );

    const text = await response.text();

    // 👇 send raw response so we can debug
    res.send(text);

  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
