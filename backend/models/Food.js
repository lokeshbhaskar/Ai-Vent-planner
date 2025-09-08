import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  type: String,
  costPerHead: Number,
  eventTypes: [String],
  cuisine: [String]
});

export default mongoose.model("Food", foodSchema);
