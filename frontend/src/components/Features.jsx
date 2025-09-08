import React from "react";
import FeatureCard from "./cards/FeatureCard";
import { Calendar, Palette, PartyPopper, Sparkles } from "lucide-react";

const featuresData = [
  {
    icon: <Sparkles className="h-8 w-8 text-purple-600" />,
    title: "Smart AI Suggestions",
    desc: "Get personalized venues, food, and themes.",
  },
  {
    icon: <Calendar className="h-8 w-8 text-purple-600" />,
    title: "Event Planning",
    desc: "Set your date, budget, and guest count easily.",
  },
  {
    icon: <Palette className="h-8 w-8 text-purple-600" />,
    title: "Custom Themes",
    desc: "Choose from elegant, modern, or fun styles.",
  },
  {
    icon: <PartyPopper className="h-8 w-8 text-purple-600" />,
    title: "Save & Share",
    desc: "Keep track of your events and share them.",
  },
];

const Features = () => {
  return (
    <section className="py-16 px-6 bg-gradient-to-b from-gray-100 via-purple-200 to-pink-200">
      <h3 className="text-3xl font-bold text-center mb-12">Features</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {featuresData.map((feature, idx) => (
          <FeatureCard
            key={idx}
            icon={feature.icon}
            title={feature.title}
            desc={feature.desc}
          />
        ))}
      </div>
    </section>
  );
};

export default Features;
