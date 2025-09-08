import { UserCheck, Calendar, Settings, CheckCircle } from "lucide-react";

const steps = [
  { id: 1, title: "Enter Event Details", desc: "Provide event type, date, guests, and budget.", icon: Calendar },
  { id: 2, title: "AI Suggestions", desc: "Get smart venue, food, and theme recommendations.", icon: UserCheck },
  { id: 3, title: "Customize Preferences", desc: "Adjust themes, food options, and activities.", icon: Settings },
  { id: 4, title: "Get Full Plan", desc: "Receive a complete event plan instantly.", icon: CheckCircle },
];

export default function HowItWorks() {
  return (
    <section className="py-12 px-6 bg-gradient-to-b from-gray-100 via-purple-200 to-pink-200">
      <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.id}
              className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-lg transition"
            >
              <div className="flex justify-center mb-4">
                <Icon className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
