import React, { useState } from "react";
import { FiPhone, FiMapPin, FiStar, FiSearch, FiFilter, FiUser, FiCalendar } from "react-icons/fi";

const practitioners = [
  {
    id: 1,
    name: "Dr. Ananya Sharma",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2",
    specialization: "Panchakarma Therapy",
    experience: 15,
    rating: 4.9,
    reviews: 127,
    location: "Mumbai, Maharashtra",
    phone: "+91 9XXXXXXXXX",
    about: "Specialist in traditional Panchakarma therapies with advanced training in detoxification and rejuvenation treatments."
  },
  {
    id: 2,
    name: "Dr. Rajesh Patel",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7",
    specialization: "Herbal Medicine",
    experience: 12,
    rating: 4.7,
    reviews: 98,
    location: "Pune, Maharashtra",
    phone: "+91 9XXXXXXXXX",
    about: "Expert in herbal formulations for chronic illnesses and preventive Ayurvedic healthcare."
  },
  {
    id: 3,
    name: "Dr. Meena Gupta",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54",
    specialization: "Yoga Therapy",
    experience: 10,
    rating: 4.8,
    reviews: 114,
    location: "Bangalore, Karnataka",
    phone: "+91 9XXXXXXXXX",
    about: "Integrates Ayurveda with therapeutic yoga practices for mental and physical well-being."
  },
  {
    id: 4,
    name: "Dr. Vivek Malhotra",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d",
    specialization: "Diet Consultation",
    experience: 8,
    rating: 4.6,
    reviews: 87,
    location: "Delhi, NCR",
    phone: "+91 9XXXXXXXXX",
    about: "Ayurvedic nutritionist focusing on personalized diet plans based on Dosha balance."
  },
  {
    id: 5,
    name: "Dr. Sunita Reddy",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f",
    specialization: "Panchakarma Therapy",
    experience: 20,
    rating: 4.9,
    reviews: 156,
    location: "Kochi, Kerala",
    phone: "+91 9XXXXXXXXX",
    about: "Renowned for authentic Kerala Panchakarma treatments and long-term wellness care."
  },
  {
    id: 6,
    name: "Dr. Karthik Iyer",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d",
    specialization: "Herbal Medicine",
    experience: 14,
    rating: 4.7,
    reviews: 103,
    location: "Chennai, Tamil Nadu",
    phone: "+91 9XXXXXXXXX",
    about: "Specializes in classical Ayurvedic herbs and chronic disease management."
  }
];


const PractitionerCard = ({ practitioner }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-green-100">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 p-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-green-50">
            <img 
              src={practitioner.image} 
              alt={practitioner.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="md:w-2/3 p-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold text-green-800">{practitioner.name}</h3>
              <div className="flex items-center bg-green-50 px-2 py-1 rounded-md">
                <FiStar className="text-yellow-500 mr-1" />
                <span className="font-medium text-green-800">{practitioner.rating}</span>
                <span className="text-sm text-green-600 ml-1">({practitioner.reviews})</span>
              </div>
            </div>
            
            <p className="text-green-700 font-medium mt-1">{practitioner.specialization}</p>
            
            <div className="flex items-center mt-2 text-green-600">
              <FiCalendar className="mr-1" />
              <span>{practitioner.experience} years experience</span>
            </div>
            
            <div className="flex items-center mt-2 text-green-600">
              <FiMapPin className="mr-1" />
              <span>{practitioner.location}</span>
            </div>
          </div>
          
          <div className="mt-4">
            {expanded && (
              <p className="text-green-700 mb-4">{practitioner.about}</p>
            )}
            <div className="flex flex-wrap gap-2 mt-3">
              <button 
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
              >
                <FiPhone className="mr-2" />
                Contact
              </button>
              <button 
                className="px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-50 transition-colors"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? "Show Less" : "Learn More"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StepCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-green-100 hover:shadow-lg transition-all">
      <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center text-green-600">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-center text-green-800 mb-3">{title}</h3>
      <p className="text-center text-green-600">{description}</p>
    </div>
  );
};

export default function Practitioners() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter practitioners
  const filteredPractitioners = practitioners.filter(practitioner => {
    const matchesSearch = practitioner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         practitioner.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !selectedLocation || practitioner.location.toLowerCase().includes(selectedLocation.toLowerCase());
    const matchesSpecialization = !selectedSpecialization || practitioner.specialization.toLowerCase().includes(selectedSpecialization.toLowerCase());
    const matchesExperience = !selectedExperience || parseInt(practitioner.experience) >= parseInt(selectedExperience);
    
    return matchesSearch && matchesLocation && matchesSpecialization && matchesExperience;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-700 to-green-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Ayurvedic Practitioners
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Connect with experienced Ayurvedic practitioners for personalized holistic healthcare
            </p>
            <div className="bg-white rounded-full shadow-lg p-2 flex items-center max-w-2xl mx-auto">
              <FiSearch className="ml-4 text-green-500 text-xl" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or specialization..."
                className="w-full px-4 py-3 rounded-full focus:outline-none text-green-800"
              />
              <button 
                className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6 py-3 font-medium transition-colors"
                onClick={() => setShowFilters(!showFilters)}
              >
                <span className="hidden md:inline">Filter</span>
                <FiFilter className="md:ml-2 inline-block" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="container mx-auto px-4 -mt-6 mb-8 relative z-10">
          <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in-down">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Location Search */}
              <div>
                <label className="block text-sm font-medium text-green-700 mb-2">Location</label>
                <input
                  type="text"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  placeholder="Enter city or area"
                  className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-green-800"
                />
              </div>
              {/* Specialization */}
              <div>
                <label className="block text-sm font-medium text-green-700 mb-2">Specialization</label>
                <select
                  value={selectedSpecialization}
                  onChange={(e) => setSelectedSpecialization(e.target.value)}
                  className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-green-800"
                >
                  <option value="">All Specializations</option>
                  <option value="panchakarma">Panchakarma Therapy</option>
                  <option value="herbal">Herbal Medicine</option>
                  <option value="yoga">Yoga Therapy</option>
                  <option value="diet">Diet Consultation</option>
                </select>
              </div>
              {/* Experience */}
              <div>
                <label className="block text-sm font-medium text-green-700 mb-2">Experience</label>
                <select
                  value={selectedExperience}
                  onChange={(e) => setSelectedExperience(e.target.value)}
                  className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-green-800"
                >
                  <option value="">Any Experience</option>
                  <option value="5">5+ years</option>
                  <option value="10">10+ years</option>
                  <option value="15">15+ years</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Featured Practitioners */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-green-800 mb-8">Featured Practitioners</h2>
        <div className="grid grid-cols-1 gap-6">
          {filteredPractitioners.map((practitioner) => (
            <PractitionerCard key={practitioner.id} practitioner={practitioner} />
          ))}

          {/* Empty State */}
          {filteredPractitioners.length === 0 && (
            <div className="text-center py-16 bg-white rounded-xl shadow-md">
              <div className="mx-auto w-20 h-20 mb-4 bg-green-50 rounded-full flex items-center justify-center">
                <FiSearch className="w-10 h-10 text-green-300" />
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                No Practitioners Found
              </h3>
              <p className="text-green-600 max-w-md mx-auto">
                Try adjusting your search filters to find practitioners that match your requirements.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-green-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-green-800 mb-12 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard 
              icon={FiSearch} 
              title="Search" 
              description="Find practitioners based on specialization, location, and experience" 
            />
            <StepCard 
              icon={FiUser} 
              title="Connect" 
              description="Contact practitioners directly through our platform" 
            />
            <StepCard 
              icon={FiStar} 
              title="Review" 
              description="Share your experience to help others find quality care" 
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-green-800 mb-6">Ready to Start Your Ayurvedic Journey?</h2>
        <p className="text-green-600 max-w-2xl mx-auto mb-8">
          Connect with experienced practitioners who can guide you on your path to holistic wellness through ancient Ayurvedic practices.
        </p>
        <button className="bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all">
          Find Your Practitioner Today
        </button>
      </div>
    </div>
  );
}