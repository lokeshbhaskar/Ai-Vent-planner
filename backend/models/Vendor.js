import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
  name: String,
  serviceType: String,
  cost: Number,
  eventTypes: [String],
  contact: String
});

export default mongoose.model("Vendor", vendorSchema);
