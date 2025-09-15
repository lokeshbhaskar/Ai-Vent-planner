import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function FeatureDetails() {
  const features = [
    {
      title: "Smart Event Planning",
      description:
        "Leverage AI to generate personalized event plans based on budget, theme, and preferences.",
    },
    {
      title: "Real-Time Collaboration",
      description:
        "Collaborate with your team or clients in real time, make changes, and finalize details instantly.",
    },
    {
      title: "Vendor Recommendations",
      description:
        "Get curated vendor suggestions for venues, catering, and entertainment with reviews and ratings.",
    },
    {
      title: "Budget Optimization",
      description:
        "AI helps allocate your budget efficiently and provides cost-saving suggestions.",
    },
    {
      title: "Interactive Calendar",
      description:
        "Easily manage event timelines, deadlines, and reminders all in one place.",
    },
    {
      title: "AI Chat Assistant",
      description:
        "Ask questions or get instant recommendations with our integrated AI chat feature.",
    },
  ];

  return (
    <section className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h1
          className="text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Powerful Features for Effortless Event Planning
        </motion.h1>
        <p className="text-lg text-gray-600 mb-12">
          Our AI Event Planner is designed to simplify every step of your event
          journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="shadow-md rounded-2xl hover:shadow-lg transition duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <CheckCircle className="text-green-500 w-10 h-10 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
