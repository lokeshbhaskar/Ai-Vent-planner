import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white">AI<span className="text-purple-500">vent</span></h2>
            <p className="mt-2 text-gray-400 text-sm">
              Plan smarter, celebrate better with AI-powered event planning.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-purple-400 transition">Home</a></li>
              <li><a href="#" className="hover:text-purple-400 transition">Features</a></li>
              <li><a href="#" className="hover:text-purple-400 transition">About</a></li>
              <li><a href="#" className="hover:text-purple-400 transition">Contact</a></li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="#" className="hover:text-purple-400 transition"><Facebook /></a>
              <a href="#" className="hover:text-purple-400 transition"><Twitter /></a>
              <a href="#" className="hover:text-purple-400 transition"><Instagram /></a>
              <a href="#" className="hover:text-purple-400 transition"><Linkedin /></a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} AIvent. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
