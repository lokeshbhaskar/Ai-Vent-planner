import { User } from "lucide-react";

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
    quote: "Saved so much time organizing my kid’s birthday party. Highly recommend!",
  },
  {
    id: 3,
    name: "Anjali Mehta",
    role: "Corporate Event Manager",
    quote: "Our office annual meet was perfectly planned thanks to AI Event Planner.",
  },
];


export default function Testimonials() {
  return (
    <section className="py-16 px-6 bg-gradient-to-b from-gray-100 via-purple-200 to-pink-200">
      <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((test) => (
          <div
            key={test.id}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
          >
            <div className="flex items-center mb-4">
              <User className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <h4 className="font-semibold">{test.name}</h4>
                <p className="text-gray-500 text-sm">{test.role}</p>
              </div>
            </div>
            <p className="text-gray-600">"{test.quote}"</p>
          </div>
        ))}
      </div>
    </section>
  );
}
