import { Button } from "@/components/ui/button";

const plans = [
  {
    id: 1,
    name: "Free Trial",
    price: "₹0",
    features: ["Basic AI suggestions", "Limited themes", "Save 1 event"],
  },
  {
    id: 2,
    name: "Standard",
    price: "₹499 / month",
    features: ["Full AI suggestions", "All themes", "Save up to 5 events"],
  },
  {
    id: 3,
    name: "Premium",
    price: "₹999 / month",
    features: ["Unlimited events", "Priority AI support", "Custom theme suggestions"],
  },
];

export default function Pricing() {
  return (
    <section className="py-10 px-6 bg-gradient-to-b from-gray-100 via-purple-200 to-pink-200">
      <h2 className="text-3xl font-bold text-center mb-12">Our Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col"
          >
            <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
            <p className="text-3xl font-bold mb-6">{plan.price}</p>
            <ul className="flex-1 mb-6 space-y-2">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="text-gray-600 before:content-['✓'] before:text-green-500 before:mr-2">
                  {feature}
                </li>
              ))}
            </ul>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl">
              Choose Plan
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
