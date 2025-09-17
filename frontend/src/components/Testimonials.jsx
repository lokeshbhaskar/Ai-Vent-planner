import { motion } from "framer-motion";
import { useState } from "react";
import { User, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Bride",
    quote: "Planned my wedding in 10 minutes! The AI suggestions were amazing.",
  },
  {
    id: 2,
    name: "Rahul Verma",
    role: "Birthday Planner",
    quote:
      "Saved so much time organizing my kid’s birthday party. Highly recommend!",
  },
  {
    id: 3,
    name: "Anjali Mehta",
    role: "Corporate Event Manager",
    quote:
      "Our office annual meet was perfectly planned thanks to AI Event Planner.",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const nextTestimonial = () =>
    setCurrent((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () =>
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-16 px-8 ">
      <h2 className="text-3xl font-bold text-center mb-12">
        What Our Users Say
      </h2>

      <div className="relative max-w-xl mx-auto">
        {/* Left Button */}
        <button
          onClick={prevTestimonial}
          className="absolute -left-12 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-purple-100 transition"
        >
          <ChevronLeft className="w-6 h-6 text-purple-600" />
        </button>

        {/* Testimonial Card */}
        <motion.div
          key={testimonials[current].id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-4 rounded-3xl shadow-lg relative"
        >
          {/* Speech Bubble Pointer */}
          <div className="absolute -bottom-4 left-12 w-6 h-6 bg-pink-500 rotate-45 shadow-md"></div>

          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-3">
              <User className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h4 className="font-semibold text-lg text-purple-700">
                {testimonials[current].name}
              </h4>
              <p className="text-gray-500 text-sm">
                {testimonials[current].role}
              </p>
            </div>
          </div>
          <p className="text-gray-700 text-lg italic">
            “{testimonials[current].quote}”
          </p>
        </motion.div>

        {/* Right Button */}
        <button
          onClick={nextTestimonial}
          className="absolute -right-12 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-purple-100 transition"
        >
          <ChevronRight className="w-6 h-6 text-purple-600" />
        </button>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full cursor-pointer transition ${
                index === current ? "bg-purple-600" : "bg-purple-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
