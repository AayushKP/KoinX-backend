import Crypto from "../models/Crypto.js";

export async function getDeviation(req, res) {
  try {
    const { coin } = req.query;
    if (!coin || !["bitcoin", "matic-network", "ethereum"].includes(coin)) {
      return res.status(400).json({ error: "Invalid coin specified" });
    }

    const cryptoData = await Crypto.find({ coin })
      .sort({ timestamp: -1 })
      .limit(100);
    if (cryptoData.length === 0) {
      return res
        .status(404)
        .json({ error: "No data found for the specified coin" });
    }

    const prices = cryptoData.map((data) => data.price);
    const mean = prices.reduce((acc, price) => acc + price, 0) / prices.length;
    const squaredDiffs = prices.map((price) => Math.pow(price - mean, 2));
    const variance =
      squaredDiffs.reduce((acc, diff) => acc + diff, 0) / prices.length;
    const standardDeviation = Math.sqrt(variance);

    return res.json({ deviation: standardDeviation });
  } catch (error) {
    console.error("Error calculating deviation:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
