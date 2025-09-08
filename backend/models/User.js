import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    // Subscription info
    isSubscribed: { type: Boolean, default: false },
    subscriptionPlan: { type: String, default: null },
    subscriptionExpiry: { type: Date, default: null },
    // track plan
    planCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
