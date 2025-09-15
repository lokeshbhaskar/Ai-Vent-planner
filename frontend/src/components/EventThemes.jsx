// import { useState } from "react";

// export default function EventThemes() {
//   const eventThemes = [
//     {
//       id: 1,
//       name: "Rustic",
//       color: "bg-yellow-200",
//       icon: "🌾",
//       textcolor: "text-yellow-600",
//       imglink:
//         "https://image.wedmegood.com/resized/1000X/uploads/images/af3bd23d237241538538f20541d056f6realwedding/052_JOV04606.jpg",
//     },
//     {
//       id: 2,
//       name: "Modern",
//       color: "bg-gray-300",
//       icon: "🏢",
//       textcolor: "text-gray-900",
//       imglink:
//         "https://tse1.mm.bing.net/th/id/OIP.N9fktpsxkbKqcSKRnZVewgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
//     },
//     {
//       id: 3,
//       name: "Royal",
//       color: "bg-purple-200",
//       icon: "👑",
//       textcolor: "text-purple-700",
//       imglink:
//         "https://www.indianweddingplanners.in/content/images/portfolio/portfolio123.jpg",
//     },
//     {
//       id: 4,
//       name: "Minimalist",
//       color: "bg-white",
//       icon: "🪞",
//       textcolor: "text-gray-700",
//       imglink:
//         "https://i.pinimg.com/originals/b2/0c/91/b20c91a0f721a805de4787810bd547fb.jpg",
//     },
//     {
//       id: 5,
//       name: "Beach",
//       color: "bg-blue-200",
//       icon: "🏖️",
//       textcolor: "text-blue-500",
//       imglink:
//         "https://www.shaadidukaan.com/vogue/wp-content/uploads/2020/03/the-palayana-destination-wedding-mandap-decor.jpg",
//     },
//     {
//       id: 6,
//       name: "Garden",
//       color: "bg-green-200",
//       icon: "🌿",
//       textcolor: "text-green-700",
//       imglink:
//         "https://www.travelandleisure.com/thmb/lpd2PAlvju9ymCV6lE40VNxN27E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/thailand-beach-wedding-DESTIWEDS0321-069ba8dbb0664beca062a4848aa1fbbc.jpg",
//     },
//   ];

//   const [selectedTheme, setSelectedTheme] = useState({
//     id: 0,
//     name: "",
//     textcolor: "text-gray-800",
//     imglink: "https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg",
//   });
//   const { name, textcolor, imglink, id } = selectedTheme;

//   return (
//     <section className="py-6 px-6  ">
//       <h2 className="text-3xl font-bold text-center mb-6">
//         🎨 Try Event Themes
//       </h2>
//       {/* Preview Section */}
//       <div className="max-w-3xl mx-auto mb-10 relative">
//         <div className="relative  rounded-3xl shadow-xl border overflow-hidden">
//
//         </div>
//         <div
//           className={`absolute -bottom-8 w-full  text-center text-xl font-bold drop-shadow-md ${
//             textcolor || "text-gray-800"
//           }`}
//         >
//           {name ? `${name} Theme Applied` : "Select a Theme to Preview"}
//         </div>
//       </div>

//       {/* Theme Selector */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 max-w-6xl mx-auto">
//         {eventThemes.map((theme) => (
//           <button
//             key={theme.id}
//             onClick={() => setSelectedTheme(theme)}
//             className={`flex flex-col items-center p-3 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer ${
//               theme.color
//             } ${id === theme.id ? "ring-4 ring-purple-400 scale-105" : ""}`}
//           >
//             <span className="text-4xl mb-1">{theme.icon}</span>
//             <h3 className="text-lg font-semibold">{theme.name}</h3>
//           </button>
//         ))}
//       </div>
//     </section>
//   );
// }

import { useState } from "react";
import { useTheme } from "../context/themeContext";

export default function EventThemes() {
  const { changeTheme } = useTheme();

  const eventThemes = [
    {
      id: 1,
      key: "rustic",
      name: "Rustic",
      color: "bg-gradient-to-b from-yellow-50 to-yellow-200",
      textcolor: "text-yellow-600",
      icon: "🌾",
      imglink:
        "https://image.wedmegood.com/resized/1000X/uploads/images/af3bd23d237241538538f20541d056f6realwedding/052_JOV04606.jpg",
    },
    {
      id: 2,
      key: "modern",
      name: "Modern",
      color: "bg-gradient-to-b from-gray-50 to-gray-200",
      textcolor: "text-gray-900",
      icon: "🏢",
      imglink:
        "https://tse1.mm.bing.net/th/id/OIP.N9fktpsxkbKqcSKRnZVewgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      id: 3,
      key: "royal",
      name: "Royal",
      color: "bg-gradient-to-b from-purple-50 via-purple-100 to-yellow-50",
      textcolor: "text-purple-700",
      icon: "👑",
      imglink:
        "https://www.indianweddingplanners.in/content/images/portfolio/portfolio123.jpg",
    },
    {
      id: 4,
      key: "minimalist",
      name: "Minimalist",
      color: "bg-white",
      textcolor: "text-gray-700",
      icon: "🪞",
      imglink:
        "https://i.pinimg.com/originals/b2/0c/91/b20c91a0f721a805de4787810bd547fb.jpg",
    },
    {
      id: 5,
      key: "beach",
      name: "Beach",
      color: "bg-gradient-to-b from-sky-50 via-sky-100 to-blue-100",
      textcolor: "text-blue-500",
      icon: "🏖️",
      imglink:
        "https://www.shaadidukaan.com/vogue/wp-content/uploads/2020/03/the-palayana-destination-wedding-mandap-decor.jpg",
    },
    {
      id: 6,
      key: "garden",
      name: "Garden",
      color: "bg-gradient-to-b from-green-50 to-green-200",
      textcolor: "text-green-700",
      icon: "🌿",
      imglink:
        "https://www.travelandleisure.com/thmb/lpd2PAlvju9ymCV6lE40VNxN27E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/thailand-beach-wedding-DESTIWEDS0321-069ba8dbb0664beca062a4848aa1fbbc.jpg",
    },
  ];

  // Store selected theme locally for preview
  const [selectedTheme, setSelectedTheme] = useState(eventThemes[0]);

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
    changeTheme(theme.key);
  };

  return (
    <section className="py-6 px-6">
      <h2 className="text-3xl font-bold text-center mb-6">
        🎨 Choose Your Theme
      </h2>

      {/* Theme Preview */}
      <div className="max-w-3xl mx-auto mb-10 relative">
        <div className="relative rounded-3xl shadow-xl border overflow-hidden">
          <img
            src={selectedTheme.imglink}
            srcSet={`${selectedTheme.imglink}?w=600 600w, ${selectedTheme.imglink}?w=1200 1200w`}
            sizes="(max-width: 768px) 600px, 1200px"
            alt={selectedTheme.name}
            className="object-contain w-full h-auto"
          />
        </div>
        <div
          className={`absolute -bottom-8 w-full text-center text-xl font-bold drop-shadow-md ${selectedTheme.textcolor}`}
        >
          {selectedTheme.name
            ? `${selectedTheme.name} Theme Applied`
            : "Select a Theme to Preview"}
        </div>
      </div>

      {/* Theme Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 max-w-6xl mx-auto">
        {eventThemes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => handleThemeSelect(theme)}
            className={`flex flex-col items-center p-3 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer ${
              theme.color
            } ${
              selectedTheme.id === theme.id
                ? "ring-4 ring-purple-400 scale-105"
                : ""
            }`}
          >
            <span className="text-4xl mb-1">{theme.icon}</span>
            <h3 className="text-lg font-semibold">{theme.name}</h3>
          </button>
        ))}
      </div>
    </section>
  );
}
