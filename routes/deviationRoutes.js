import express from "express";
import { getDeviation } from "../controllers/deviationController.js";

const router = express.Router();

router.get("/deviation", getDeviation);

export default router;
