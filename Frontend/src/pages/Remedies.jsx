/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import RemedyCard from "../components/RemedyCard";
import { FiSearch, FiHeart, FiFilter, FiClock, FiArrowRight } from "react-icons/fi";
import { BiLeaf, BiShield, BiDish, BiWind, BiBrain } from "react-icons/bi";
import { motion } from "framer-motion";
import TumericMilk from "../assets/TumericMilk.jpg";
import GingerTea from "../assets/GingerTea.jpg";
import GingerAndHoney from "../assets/GingerAndHoney.jpg";
import TulsiTea from "../assets/TulsiTea.jpg";
import CuminAndCorianderTea from "../assets/CuminAndCorianderTea.jpg";
import GuduchiKadha from "../assets/GuduchiKadha.jpg";

// Enhanced sample data with more details
const remedies = [
  {
    id: "1",
    name: "Turmeric Milk (Golden Milk)",
    description: "A soothing drink that helps reduce inflammation and supports the immune system.",
    ingredients: ["Turmeric powder", "Milk", "Black pepper", "Honey", "Cinnamon"],
    instructions: "Heat milk, add turmeric, black pepper, and cinnamon. Simmer for 5 minutes. Add honey to taste.",
    imageUrl: TumericMilk,
    doshas: ["vata", "kapha"],
    likes: 124,
    duration: "10 mins",
    difficulty: "Easy",
    category: "Digestion"
  },
  {
    id: "2",
    name: "Ginger Tea",
    description: "Helps with digestion, nausea, and cold symptoms. A warming remedy for Vata and Kapha imbalances.",
    ingredients: ["Fresh ginger", "Water", "Lemon", "Honey", "Cinnamon stick"],
    instructions: "Boil water with sliced ginger for 10 minutes. Add lemon juice and honey to taste.",
    imageUrl: GingerTea,
    doshas: ["vata", "kapha"],
    likes: 98,
    duration: "15 mins",
    difficulty: "Easy",
    category: "Immunity"
  },
  {
    id: "3",
    name: "Ginger and Honey",
    description: "Relieves cough and sore throat. A natural expectorant.",
    ingredients: ["Fresh ginger", "Honey"],
    instructions: "Make a paste of ginger and honey. Take 1 tsp thrice a day.",
    imageUrl: GingerAndHoney,
    doshas: ["kapha"],
    likes: 75,
    duration: "5 mins",
    difficulty: "Easy",
    category: "Respiratory"
  },
  {
    id: "4",
    name: "Tulsi Tea",
    description: "Supports the immune system and reduces stress.",
    ingredients: ["Tulsi leaves", "Water", "Lemon", "Honey"],
    instructions: "Boil water with tulsi leaves for 5 minutes. Add lemon juice and honey to taste.",
    imageUrl: TulsiTea,
    doshas: ["vata", "pitta"],
    likes: 124,
    duration: "10 mins",
    difficulty: "Easy",
    category: "Stress relief"
  },
  {
    id: "5",
    name: "Cumin and Coriander Tea",
    description: "Soother for digestive issues and stress.",
    ingredients: ["Cumin seeds", "Coriander seeds", "Water", "Honey"],
    instructions: "Boil water with cumin and coriander seeds for 10 minutes. ",
    imageUrl: CuminAndCorianderTea,
    doshas: ["pitta", "vata"],
    likes: 75,
    duration: "15 mins",
    difficulty: "Easy",
    category: "Stress relief"
  },
  {
    id: "6",
    name: "Guduchi Kadha",
    description: "A natural immune booster that helps reduce fever and inflammation.",
    ingredients: ["Guduchi", "Water", "Honey"],
    instructions: "Boil water with guduchi powder for 10 minutes.",
    imageUrl: GuduchiKadha,
    doshas: ["vata", "kapha"],
    likes: 98,
    duration: "15 mins",
    difficulty: "Easy",
    category: "Immunity"
  },
];

const categoryIcons = {
  "Digestion": <BiDish className="w-6 h-6" />,
  "Immunity": <BiShield className="w-6 h-6" />,
  "Respiratory": <BiWind className="w-6 h-6" />,
  "Stress relief": <BiBrain className="w-6 h-6" />
};

export default function Remedies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeDosha, setActiveDosha] = useState("all");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Extract unique categories
  const categories = [...new Set(remedies.map(remedy => remedy.category))];

  // Filter remedies based on search term, dosha and category
  const filteredRemedies = remedies.filter(remedy => {
    const matchesSearch = remedy.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         remedy.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDosha = activeDosha === "all" || remedy.doshas.includes(activeDosha);
    const matchesCategory = activeCategory === "all" || remedy.category === activeCategory;
    
    return matchesSearch && matchesDosha && matchesCategory;
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  // Scroll to top when filters change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeDosha, activeCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-green-50 to-green-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-green-700 overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-white rounded-full -mr-32 -mt-32 opacity-10"></div>
        <div className="absolute left-0 bottom-0 w-64 h-64 bg-white rounded-full -ml-32 -mb-32 opacity-10"></div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">Ancient Wisdom</span>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-md">
                Discover Natural Ayurvedic Remedies
              </h1>
              <p className="text-xl text-green-100 mb-8 leading-relaxed max-w-2xl mx-auto">
                Explore our curated collection of authentic Ayurvedic remedies passed down through generations
              </p>
            </motion.div>
            
            {/* Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-2xl mx-auto relative"
            >
              <div className="relative">
                <FiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-green-600 text-xl" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for remedies, ingredients, or health concerns..."
                  className="w-full pl-12 pr-4 py-4 border-none rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 shadow-lg text-gray-700"
                />
                <button 
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-all"
                >
                  <FiFilter className="text-lg" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Filter Section - Conditionally Rendered */}
        {isFilterOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="container mx-auto px-4 pb-6"
          >
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Filter by Dosha</h3>
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => setActiveDosha("all")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeDosha === "all" 
                        ? "bg-green-600 text-white" 
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    All Doshas
                  </button>
                  <button 
                    onClick={() => setActiveDosha("vata")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeDosha === "vata" 
                        ? "bg-blue-600 text-white" 
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Vata
                  </button>
                  <button 
                    onClick={() => setActiveDosha("pitta")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeDosha === "pitta" 
                        ? "bg-red-600 text-white" 
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Pitta
                  </button>
                  <button 
                    onClick={() => setActiveDosha("kapha")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeDosha === "kapha" 
                        ? "bg-green-600 text-white" 
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Kapha
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Filter by Category</h3>
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => setActiveCategory("all")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeCategory === "all" 
                        ? "bg-amber-600 text-white" 
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map(category => (
                    <button 
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        activeCategory === category 
                          ? "bg-amber-600 text-white" 
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Categories */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-amber-800">Popular Categories</h2>
            <button className="flex items-center text-green-600 hover:text-green-700 font-medium">
              View All <FiArrowRight className="ml-2" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setActiveCategory(category === activeCategory ? "all" : category)}
                className={`bg-white rounded-xl shadow-md p-6 text-center cursor-pointer hover:shadow-lg transition-all duration-300 border-2 ${
                  category === activeCategory ? "border-green-600" : "border-transparent"
                }`}
              >
                <div className="w-14 h-14 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                  {categoryIcons[category] || <BiLeaf className="w-6 h-6" />}
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{category}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {remedies.filter(r => r.category === category).length} remedies
                </p>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Results Count */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-amber-800">
            {activeCategory !== "all" ? activeCategory : "All Remedies"}
            {activeDosha !== "all" && ` for ${activeDosha.charAt(0).toUpperCase() + activeDosha.slice(1)}`}
          </h2>
          <p className="text-gray-600">{filteredRemedies.length} results found</p>
        </div>
        
        {/* Remedies Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredRemedies.map((remedy) => (
            <motion.div
              key={remedy.id}
              variants={itemVariants}
              className="group h-auto"
            >
              <RemedyCard
                {...remedy}
                duration={remedy.duration}
                difficulty={remedy.difficulty}
              />
            </motion.div>
          ))}
        </motion.div>
        
        {/* Empty State */}
        {filteredRemedies.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white rounded-xl shadow-md"
          >
            <div className="mx-auto w-20 h-20 mb-4 text-green-200">
              <FiSearch className="w-20 h-20 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No Remedies Found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              We couldn't find any remedies matching your current filters. Try adjusting your search term or filters.
            </p>
            <button 
              onClick={() => {
                setSearchTerm("");
                setActiveDosha("all");
                setActiveCategory("all");
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
            >
              Reset Filters
            </button>
          </motion.div>
        )}
      </div>
      
      {/* Subscription Banner */}
      <section className="bg-gradient-to-r from-amber-500 to-amber-600 py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between">
            <div className="text-white mb-6 md:mb-0 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">Stay Updated with New Remedies</h3>
              <p>Get weekly Ayurvedic tips and remedies delivered to your inbox</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-4 py-3 rounded-l-lg w-full md:w-64 focus:outline-none"
              />
              <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-r-lg font-medium transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}