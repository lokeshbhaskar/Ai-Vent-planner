export default function EventThemes() {
  const eventThemes = [
    { id: 1, name: "Rustic", color: "bg-yellow-200", icon: "🌾" },
    { id: 2, name: "Modern", color: "bg-gray-300", icon: "🏢" },
    { id: 3, name: "Royal", color: "bg-purple-200", icon: "👑" },
    { id: 4, name: "Minimalist", color: "bg-white", icon: "🪞" },
    { id: 5, name: "Beach", color: "bg-blue-200", icon: "🏖️" },
    { id: 6, name: "Garden", color: "bg-green-200", icon: "🌿" },
  ];

  return (
    <section className="py-12 px-6 bg-gradient-to-b from-gray-100 via-purple-200 to-pink-200">
      <h2 className="text-3xl font-bold text-center mb-12">
        Popular Event Themes
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {eventThemes.map((theme) => (
          <div
            key={theme.id}
            className={`flex flex-col items-center justify-center p-6 rounded-2xl shadow-md cursor-pointer hover:shadow-lg transition ${theme.color}`}
          >
            <span className="text-4xl mb-2">{theme.icon}</span>
            <h3 className="text-lg font-semibold">{theme.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
