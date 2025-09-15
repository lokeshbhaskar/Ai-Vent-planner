import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const plans = [
  {
    id: 1,
    name: "Free Trial",
    price: "₹0",
    features: ["Basic AI suggestions", "Limited themes", "Save 1 event"],
    highlight: false,
  },
  {
    id: 2,
    name: "Standard",
    price: "₹499 / month",
    features: ["Full AI suggestions", "All themes", "Save up to 5 events"],
    highlight: true,
  },
  {
    id: 3,
    name: "Premium",
    price: "₹999 / month",
    features: ["Unlimited events", "Priority AI support", "Custom theme suggestions"],
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section className="py-20 px-6  ">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-16">
        💎 Our Plans
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className={`relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition flex flex-col border ${
              plan.highlight ? "border-purple-500 scale-105" : "border-gray-200"
            }`}
          >
            {plan.highlight && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs font-bold py-1 px-3 rounded-full shadow-md">
                Most Popular
              </span>
            )}

            <h3 className="text-2xl font-bold mb-4 text-gray-800 text-center">
              {plan.name}
            </h3>
            <p className="text-4xl font-extrabold mb-6 text-center text-purple-600">
              {plan.price}
            </p>

            <ul className="flex-1 mb-6 space-y-3">
              {plan.features.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-center text-gray-700 text-lg"
                >
                  <span className="text-green-500 mr-2">✔</span>
                  {feature}
                </li>
              ))}
            </ul>

            <Button
              className={`rounded-xl text-lg font-semibold py-6 w-full shadow-md hover:shadow-lg transition ${
                plan.highlight
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800"
              }`}
            >
              {plan.highlight ? "Get Started" : "Choose Plan"}
            </Button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}