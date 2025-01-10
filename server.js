import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cron from "node-cron";
import cryptoRoutes from "./routes/cryptoRoutes.js";
import deviationRoutes from "./routes/deviationRoutes.js";
import { fetchAndSaveCryptoData } from "./controllers/cryptoController.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", cryptoRoutes);
app.use("/api", deviationRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

fetchAndSaveCryptoData();

cron.schedule("0 */2 * * *", fetchAndSaveCryptoData);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
