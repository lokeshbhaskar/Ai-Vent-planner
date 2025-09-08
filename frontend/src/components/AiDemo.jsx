import { useState } from "react";
import { Button } from "@/components/ui/button";

const samplePlan = {
  eventName: "Birthday Party",
  guests: 50,
  budget: "₹50,000",
  venue: "Sunset Garden Hall",
  food: "Buffet: Indian & Continental",
  theme: "Modern Celebration",
};


export default function AIDemo() {
  const [query, setQuery] = useState("");
  const [plan, setPlan] = useState(null);

  const handleGenerate = () => {
    
    setPlan(samplePlan);
  };

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-gray-100 via-purple-200 to-pink-200">
      <h2 className="text-3xl font-bold text-center mb-6">Try Our AI Planner</h2>
      <p className="text-center text-gray-600 mb-8">
        Type your event details and see a sample plan instantly!
      </p>

      {/* Input Form */}
      <div className="max-w-xl mx-auto flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Birthday Party, 50 guests, budget ₹50k"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <Button onClick={handleGenerate} className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl">
          Generate Plan
        </Button>
      </div>

      {/* Sample Plan Preview */}
      {plan && (
        <div className="max-w-xl mx-auto bg-gray-50 p-6 rounded-2xl shadow-md space-y-3">
          <h3 className="text-xl font-semibold">{plan.eventName}</h3>
          <p><strong>Guests:</strong> {plan.guests}</p>
          <p><strong>Budget:</strong> {plan.budget}</p>
          <p><strong>Venue:</strong> {plan.venue}</p>
          <p><strong>Food:</strong> {plan.food}</p>
          <p><strong>Theme:</strong> {plan.theme}</p>
        </div>
      )}
    </section>
  );
}
