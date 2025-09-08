import User from "../models/User.js";
export const checkSubscription = async (req, res, next) => {
  if (!req.user || !req.user.id) {
    return res
      .status(401)
      .json({ error: "Unauthorized: user not found in request" });
  }
  const userId = req.user.id;
  console.log("user id", userId);
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const today = new Date();
  if (user.subscriptionExpiry && user.subscriptionExpiry < today) {
    return res.status(403).json({
      error: "Free limit reached. Subscribe to create more plans.",
    });
  }
  if (!user.isSubscribed && user.planCount >= 5) {
    return res.status(403).json({
      error: "Free limit reached. Please subscribe to continue.",
    });
  }
  req.userData = user;
  next();
};
