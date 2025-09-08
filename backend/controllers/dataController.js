import Venue from "../models/venue.js";
import Food from "../models/Food.js";
import Theme from "../models/Theme.js";
import Vendor from "../models/Vendor.js";
import fs from "fs";
import path from "path";

const loadJSON = (filename) => {
  const filePath = path.join(process.cwd(), "data", filename);
  return JSON.parse(fs.readFileSync(filePath));
};

export const loadInitialData = async (req, res) => {
  try {
    // Clear old data
    await Venue.deleteMany();
    await Food.deleteMany();
    await Theme.deleteMany();
    await Vendor.deleteMany();

    // Insert new data
    await Venue.insertMany(loadJSON("venues.json"));
    await Food.insertMany(loadJSON("foods.json"));
    await Theme.insertMany(loadJSON("themes.json"));
    await Vendor.insertMany(loadJSON("vendors.json"));
    console.log("✅ Data Imported Successfully!");
    // return res.status(200).json({ success: true, message: "Data loaded!" });
    if (res) {
      return res.status(200).json({ success: true, message: "Data loaded!" });
    }

    return true;
  } catch (error) {
    console.error("Load data error:", error);
    // return res
    //     .status(500)
    //     .json({ success: false, message: "Failed to load data" });
    console.error("Load data error:", error);
    if (res) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to load data" });
    }
    throw error;
  }
};
