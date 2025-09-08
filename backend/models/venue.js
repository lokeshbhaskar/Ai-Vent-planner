import mongoose from "mongoose";

const venueSchema = new mongoose.Schema({
  name: String,
  capacity: Number,
  cost: Number,
  location: String,
  eventTypes: [String],
  amenities: [String]
});

export default mongoose.model("Venue", venueSchema);
