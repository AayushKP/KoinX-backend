// After (default export)
import mongoose from "mongoose";

const cryptoSchema = new mongoose.Schema({
  coin: { type: String, required: true },
  price: { type: Number, required: true },
  marketCap: { type: Number, required: true },
  change24h: { type: Number, required: true },
  timestamp: { type: Date, required: true },
});

const Crypto = mongoose.model("Crypto", cryptoSchema);

export default Crypto;
