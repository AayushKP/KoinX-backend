import cron from "node-cron";
import { fetchAndSaveCryptoData } from "./controllers/cryptoController.js";

cron.schedule("0 */2 * * *", () => {
  console.log("Running cron job...");
  fetchAndSaveCryptoData();
});
