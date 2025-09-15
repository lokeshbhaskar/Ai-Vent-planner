import React from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const images = ["/img_1.jpg", "/img_2.jpg", "/img_3.jpg"];

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col items-center justify-center text-center py-6 px-6 text-gray-800 overflow-hidden  ">
      {/* Heading */}
      <motion.h2
        className="text-3xl md:text-4xl font-extrabold mb-10 leading-tight"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.05, delay: 0.3, color: "#6d28d9" }}
      >
        Plan Smart.{" "}
        <motion.span
          className="text-purple-600 inline-block"
          whileHover={{ rotate: 3, scale: 1.1 }} // fun effect on 🎉
        >
          Celebrate Better 🎉
        </motion.span>
      </motion.h2>
      <div className="flex justify-center mb-0 ">
        <div className="relative w-[500px] h-[350px] flex justify-center">
          {images.map((src, index) => (
            <motion.img
              key={index}
              src={src}
              alt={`card-${index}`}
              className="absolute w-[250px] h-[300px] object-cover rounded-xl shadow-xl"
              initial={{
                rotate: index === 0 ? -15 : index === 1 ? 0 : 15,
                x: index === 0 ? -100 : index === 1 ? 0 : 100,
                zIndex: index,
              }}
              whileHover={{ scale: 1.1, zIndex: 10 }}
              transition={{ type: "spring", stiffness: 200 }}
            />
          ))}
        </div>
      </div>
      {/* Paragraph */}
      <motion.p
        className="text-lg md:text-xl max-w-2xl mb-6 text-gray-600"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        whileHover={{ scale: 1.02, color: "#374151" }}
      >
        Your AI-powered event planner for weddings, birthdays, and everything in
        between. Simple, efficient, and stress-free.
      </motion.p>

      {/* Buttons */}
      <motion.div
        className="flex gap-4 flex-col md:flex-row"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1 },
          }}
          transition={{ duration: 0.4 }}
          whileHover={{
            scale: 1.1,
          }}
          whileTap={{ scale: 0.95 }}
          className="rounded-full"
        >
          <button
            className="bg-purple-600 text-white hover:bg-purple-700 rounded-full px-6 py-2 text-lg shadow-md cursor-pointer"
            onClick={() => navigate("/ai-planner-page")}
          >
            Start Planning
          </button>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1 },
          }}
          transition={{ duration: 0.4 }}
          whileHover={{ scale: 1.1, boxShadow: "0px 8px 20px rgba(0,0,0,0.2)" }}
          whileTap={{ scale: 0.95 }}
          className="rounded-full"
        >
          <button className="border-pink-300 text-gray-700 bg-pink-300 hover:bg-pink-400 rounded-full px-6 py-2 text-lg cursor-pointer">
            Learn More
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
