import mongoose from "mongoose";

const themeSchema = new mongoose.Schema({
  name: String,
  colors: [String],
  cost: Number,
  eventTypes: [String]
});

export default mongoose.model("Theme", themeSchema);
