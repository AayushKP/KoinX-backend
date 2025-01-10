import axios from "axios";
import Crypto from "../models/Crypto.js";

const API_URL = "https://api.coingecko.com/api/v3/simple/price";
const API_KEY = process.env.COINGECKO_API_KEY;

export async function fetchAndSaveCryptoData() {
  try {
    const response = await axios.get(API_URL, {
      params: {
        ids: "bitcoin,matic-network,ethereum",
        vs_currencies: "usd",
        include_market_cap: "true",
        include_24hr_change: "true",
        api_key: API_KEY,
      },
    });

    const data = response.data;
    console.log("Fetched data:", data); 

    const now = new Date();

    for (const coinId of ["bitcoin", "matic-network", "ethereum"]) {
      const cryptoData = {
        coin: coinId,
        price: data[coinId].usd,
        marketCap: data[coinId].usd_market_cap,
        change24h: data[coinId].usd_24h_change,
        timestamp: now,
      };

      console.log(`Saving data for ${coinId}:`, cryptoData); 
      await Crypto.create(cryptoData);     }
    console.log("Crypto data fetched and saved");
  } catch (error) {
    console.error("Error fetching crypto data:", error);
  }
}

export async function getLatestCryptoData(req, res) {
  try {
    const { coin } = req.query;
    console.log("Requested coin:", coin); 

    if (!coin || !["bitcoin", "matic-network", "ethereum"].includes(coin)) {
      return res.status(400).json({ error: "Invalid coin specified" });
    }

    const crypto = await Crypto.find({ coin }).sort({ timestamp: -1 }).limit(1);
    console.log("Crypto data found:", crypto);

    if (crypto.length === 0) {
      return res
        .status(404)
        .json({ error: "No data found for the specified coin" });
    }

    return res.json(crypto[0]);
  } catch (error) {
    console.error("Error getting crypto data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
