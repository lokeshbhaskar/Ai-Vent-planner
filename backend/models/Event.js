import mongoose, { model } from "mongoose";

const eventSchema = new mongoose.Schema({
  user: {   
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  eventType: {
    type: String,
    required: true,
  },
  guestsBudget: {
    guests: { type: Number, required: true },
    budget: { type: Number, require: true },
  },
  dateVenue: {
    date: { type: Date, required: true },
    venue: { type: String, required: true },
  },
  foodTheme: {
    food: { type: String, required: true },
    theme: { type: String, required: true },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Event = mongoose.model("Event",eventSchema)
export default Event;