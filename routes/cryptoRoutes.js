import express from "express";
import { getLatestCryptoData } from "../controllers/cryptoController.js";

const router = express.Router();

router.get("/stats", getLatestCryptoData);

export default router;
