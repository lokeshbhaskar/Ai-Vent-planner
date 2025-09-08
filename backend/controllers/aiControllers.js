import { GoogleGenerativeAI } from "@google/generative-ai";
import Venue from "../models/venue.js";
import Food from "../models/Food.js";
import Theme from "../models/Theme.js";
import Vendor from "../models/Vendor.js";

const genAI = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

export const generateEventPlan = async (req, res) => {
  try {
    const { eventType, guests, budget, date, venue, theme, food } = req.body;

    // Fetch all DB data
    const [venues, foods, themes, vendors] = await Promise.all([
      Venue.find(),
      Food.find(),
      Theme.find(),
      Vendor.find(),
    ]);

    // -----------------------------
    // VENUE FILTER
    // -----------------------------
    const viableVenues = venues.filter(
      (v) =>
        Number(v.capacity) >= Number(guests) && Number(v.cost) <= Number(budget)
    );
    if (!viableVenues.length) {
      return res
        .status(404)
        .json({ success: false, message: "No venues fit capacity/budget." });
    }

    // -----------------------------
    // FOOD FILTER
    // -----------------------------
    const pref = (food || "").toLowerCase();
    const foodsByEvent = foods.filter((f) => f.eventTypes.includes(eventType));
    const filteredFoods =
      pref === "veg" || pref === "vegetarian"
        ? foodsByEvent.filter((f) => /vegetarian|vegan/i.test(f.type))
        : pref === "non-veg" ||
          pref === "non vegetarian" ||
          pref === "non-vegetarian"
        ? foodsByEvent.filter((f) => /non-vegetarian/i.test(f.type))
        : pref === "vegan"
        ? foodsByEvent.filter((f) => /vegan/i.test(f.type))
        : foodsByEvent;

    // -----------------------------
    // THEME FILTER
    // -----------------------------
    const chosenTheme =
      themes.find(
        (t) => t.name.toLowerCase() === String(theme || "").toLowerCase()
      ) ||
      themes.find((t) => t.eventTypes?.includes(eventType)) ||
      themes[0];

    // -----------------------------
    // VENDOR FILTER
    // -----------------------------
    const eventVendors = vendors.filter((v) =>
      v.eventTypes.includes(eventType)
    );

    const entertainmentVendors = eventVendors.filter(
      (v) => v.serviceType === "Entertainment"
    );
    const photographyVendors = eventVendors.filter(
      (v) => v.serviceType === "Photography"
    );
    const decorationVendors = eventVendors.filter(
      (v) => v.serviceType === "Decoration"
    );
    const extraFoodVendors = eventVendors.filter(
      (v) => v.serviceType === "Food"
    );

    // -----------------------------
    // COST CALCULATION
    // -----------------------------
    const plans = viableVenues.map((v) => {
      const foodPlans = filteredFoods.map((f) => {
        const total = Number(f.costPerHead) * Number(guests);
        return {
          type: f.type,
          perHead: f.costPerHead,
          total,
        };
      });

      const themeCost = Number(chosenTheme?.cost || 0);

      // Pick cheapest vendors
      const chosenEntertainment =
        entertainmentVendors.sort((a, b) => a.cost - b.cost)[0] || null;
      const chosenPhotography =
        photographyVendors.sort((a, b) => a.cost - b.cost)[0] || null;
      const chosenDecoration =
        decorationVendors.sort((a, b) => a.cost - b.cost)[0] || null;
      const chosenExtraFood =
        extraFoodVendors.sort((a, b) => a.cost - b.cost)[0] || null;

      const vendorExtras = [
        chosenEntertainment,
        chosenPhotography,
        chosenDecoration,
        chosenExtraFood,
      ].filter(Boolean);

      const extrasTotal = vendorExtras.reduce((s, e) => s + e.cost, 0);

      const bestFood = foodPlans.sort((a, b) => a.total - b.total)[0] || null;
      const total =
        Number(v.cost) + (bestFood?.total || 0) + themeCost + extrasTotal;

      return {
        venue: v.name,
        venueCost: Number(v.cost),
        city: v.location,
        capacity: v.capacity,
        theme: { name: chosenTheme?.name, cost: themeCost },
        food: bestFood ? [bestFood.type] : [],
        vendors: vendorExtras.map((e) => ({
          name: e.name,
          serviceType: e.serviceType,
          cost: e.cost,
          contact: e.contact,
        })),
        total,
        underBudget: total <= Number(budget),
      };
    });

    // -----------------------------
    // PICK BEST PLAN
    // -----------------------------
    const under = plans.filter((p) => p.underBudget);
    const best = (under.length ? under : plans).sort(
      (a, b) => a.total - b.total
    )[0];

    // -----------------------------
    // PROMPT (AI SCHEMA)
    // -----------------------------
    const prompt = `
Return STRICT JSON only (no markdown). Use this schema exactly:
{
  "title": "string",
  "date": "string",
  "venue": "string",
  "guests":"string",
  "theme": { "name": "string", "colors": ["string"], "decor": ["string"], "lighting": ["string"] },
  "food": ["string"],
  "vendors": [{ "name": "string", "serviceType": "string", "cost": "string", "contact": "string" }],
  "entertainment": ["string"],
  "extras": ["string"],
  "budget": { "venue": "string", "food": "string", "theme": "string", "vendors": "string", "total": "string" },
  "nextSteps": ["string"],
  "availableOptions": {
    "venues": ["string"],
    "foods": ["string"],
    "themes": ["string"],
    "vendors": ["string"]
  }
}

User:
- Event Type: ${eventType}
- Guests: ${guests} (must return this value in "guests" field of the JSON)
- Budget: ${budget}
- Date: ${date}
- Preferred Venue: ${venue || "Any"}
- Preferred Theme: ${theme || "Any"}
- Preferred Food: ${food || "Any"}

Recommended (pre-calculated) best option:
${JSON.stringify(best)}

Available options:
- Venues: ${viableVenues.map((v) => v.name).join(", ")}
- Foods: ${filteredFoods.map((f) => f.type).join(", ")}
- Themes: ${themes.map((t) => t.name).join(", ")}
- Vendors: ${eventVendors.map((v) => v.name).join(", ")}
`;

    // -----------------------------
    // RESPONSE (AI or fallback)
    // -----------------------------
    let plan;
    if (genAI) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        let txt = result.response
          .text()
          .replace(/```json|```/g, "")
          .trim();
        plan = JSON.parse(txt);
      } catch (err) {
        console.error("AI failed, using fallback:", err);
      }
    }

    if (!plan) {
      // Fallback plan
      plan = {
        title: `${eventType} Plan`,
        date,
        venue: best.venue,
        guests: String(guests), 
        theme: {
          name: best.theme.name,
          colors: ["#FFFFFF", "#E2E8F0"],
          decor: ["Stage backdrop", "Table centerpieces", "Floral accents"],
          lighting: ["Warm ambient", "Spotlights"],
        },
        food: best.food,
        vendors: best.vendors,
        entertainment: best.vendors
          .filter((v) => v.serviceType === "Entertainment")
          .map((v) => v.name),
        extras: best.vendors
          .filter((v) => v.serviceType !== "Entertainment")
          .map((v) => v.name),
        budget: {
          venue: String(best.venueCost),
          food: String(
            filteredFoods.find((f) => f.type === best.food?.[0])?.costPerHead *
              guests || 0
          ),
          theme: String(best.theme.cost),
          vendors: String(best.vendors.reduce((s, e) => s + e.cost, 0)),
          total: String(best.total),
        },
        nextSteps: [
          `Confirm booking for ${best.venue}`,
          `Finalize food with caterer`,
          `Confirm theme decor details`,
          `Lock entertainment & vendor services`,
        ],
        availableOptions: {
          venues: viableVenues.map((v) => v.name),
          foods: filteredFoods.map((f) => f.type),
          themes: themes.map((t) => t.name),
          vendors: eventVendors.map((v) => v.name),
        },
      };
    }
    
    if (req.userData && !req.userData.isSubscribed) {
      req.userData.planCount += 1;
      console.log("count ",req.userData.planCount);
      await req.userData.save();
    }
    return res.status(200).json({ success: true, plan });
  } catch (error) {
    console.error("generateEventPlan error", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to generate plan" });
  }
};
