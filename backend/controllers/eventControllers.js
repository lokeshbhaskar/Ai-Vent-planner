import Event from "../models/Event.js";

export const eventDetailsController = async (req, res) => {
  try {
    const { eventType, guestsBudget, dateVenue, foodTheme } = req.body;
    const newEvent = await Event.create({
      user: req.user._id,
      eventType,
      guestsBudget,
      dateVenue,
      foodTheme,
    });
    return res.status(201).json({
      success: true,
      message: "Event details saved in database",
      event: newEvent,
    });
  } catch (error) {
    console.error("save  error", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error during saving details" });
  }
};
// get all event of loggedin user
export const getUserEvents = async (req, res) => {
  try {
    const events = await Event.find({ user: req.user._id });
    res.json({ success: true, events });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// delete saved event
export const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    await Event.findByIdAndDelete(eventId);
    res.json({ success: true, message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }   
}
