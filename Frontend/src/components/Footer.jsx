import React from "react";
import { Link } from "react-router-dom";
import { Globe, Facebook, Twitter, Instagram, Youtube, Heart, Leaf } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-b from-green-900 to-green-950 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-colors">
                <Leaf className="text-green-400 h-6 w-6" />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-200 to-emerald-400">
                Ayurved AI
              </span>
            </Link>
            <p className="text-green-200/80 leading-relaxed text-sm">
              Bridging ancient Ayurvedic wisdom with modern artificial intelligence to guide you on your path to holistic wellness and balanced living.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className="bg-green-800/50 p-2 rounded-full hover:bg-green-600 transition-all duration-300 hover:scale-110"
                >
                  <Icon size={18} className="text-green-100" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-green-500"></span>
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Chat with AI", path: "/chat" },
                { name: "Remedies", path: "/remedies" },
                { name: "Practitioners", path: "/practitioners" },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-green-200/80 hover:text-white hover:translate-x-1 transition-all duration-300 inline-flex items-center"
                  >
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 opacity-0 group-hover:opacity-100"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 relative inline-block">
              Legal
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-green-500"></span>
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Privacy Policy", path: "/privacy" },
                { name: "Terms of Service", path: "/terms" },
                { name: "Medical Disclaimer", path: "/disclaimer" },
                { name: "Cookie Policy", path: "/cookies" },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-green-200/80 hover:text-white hover:translate-x-1 transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 relative inline-block">
              Newsletter
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-green-500"></span>
            </h3>
            <p className="text-green-200/80 text-sm mb-4">
              Get weekly Ayurvedic tips, healthy recipes, and wellness advice directly to your inbox.
            </p>
            <form className="space-y-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full px-4 py-2.5 bg-green-800/50 border border-green-700 rounded-lg focus:outline-none focus:border-green-500 text-green-100 placeholder-green-400/50 text-sm"
              />
              <button className="w-full bg-green-600 hover:bg-green-500 text-white font-medium py-2.5 rounded-lg transition-colors duration-300 shadow-lg shadow-green-900/20">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-green-800/50 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-green-300/60 text-sm mb-4 md:mb-0">
            © {currentYear} Ayurved AI. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 text-sm text-green-300/60">
            <span>Made with</span>
            <Heart size={14} className="text-red-400 fill-red-400" />
            <span>for holistic health</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
