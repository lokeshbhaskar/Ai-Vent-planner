import React from "react";
import { motion } from "framer-motion";
import { Calendar, Palette, PartyPopper, Sparkles } from "lucide-react";

const featuresData = [
  {
    icon: <Sparkles className="h-10 w-10 text-purple-600" />,
    title: "Smart AI Suggestions",
    desc: "Get personalized venues, food, and themes.",
  },
  {
    icon: <Calendar className="h-10 w-10 text-purple-600" />,
    title: "Event Planning",
    desc: "Set your date, budget, and guest count easily.",
  },
  {
    icon: <Palette className="h-10 w-10 text-purple-600" />,
    title: "Custom Themes",
    desc: "Choose from elegant, modern, or fun styles.",
  },
  {
    icon: <PartyPopper className="h-10 w-10 text-purple-600" />,
    title: "Save & Share",
    desc: "Keep track of your events and share them.",
  },
];

export default function Features() {
  return (
    <section className="py-20 px-6  ">
      <h3 className="text-4xl font-extrabold text-center mb-16 text-gray-800">
        ✨ Features
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
        {featuresData.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            viewport={{ once: true }}
            className="group bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-2 transition transform duration-300 flex flex-col items-center text-center"
          >
            <div className="mb-4 p-4 bg-purple-100 rounded-full group-hover:bg-purple-200 transition">
              {feature.icon}
            </div>
            <h4 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-purple-600">
              {feature.title}
            </h4>
            <p className="text-gray-600 text-base">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
