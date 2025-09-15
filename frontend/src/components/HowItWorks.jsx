import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { UserCheck, Calendar, Settings, CheckCircle } from "lucide-react";

const steps = [
  { id: 1, title: "Enter Event Details", desc: "Provide event type, date, guests, and budget.", icon: Calendar },
  { id: 2, title: "AI Suggestions", desc: "Get smart venue, food, and theme recommendations.", icon: UserCheck },
  { id: 3, title: "Customize Preferences", desc: "Adjust themes, food options, and activities.", icon: Settings },
  { id: 4, title: "Get Full Plan", desc: "Receive a complete event plan instantly.", icon: CheckCircle },
];

export default function HowItWorks() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Animate vertical line height
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      className="py-16 px-6  "
    >
      <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

      <div className="relative max-w-3xl mx-auto">
        {/* Vertical Line */}
        <div className="absolute left-8 top-0 w-1 h-full bg-purple-200 rounded-full" />
        <motion.div
          style={{ height: progress }}
          className="absolute left-8 top-0 w-1 bg-purple-500 rounded-full origin-top"
        />

        {/* Steps */}
        <div className="space-y-16 pl-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                className="relative flex flex-col"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: false }}
              >
                {/* Icon */}
                <motion.div
                  className="absolute -left-12 w-10 h-10 rounded-full bg-white border-2 border-purple-400 shadow-lg flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Icon className="w-5 h-5 text-purple-600" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
