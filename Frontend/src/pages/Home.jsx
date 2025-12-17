import { Link } from "react-router-dom";
import HomeImage from "../assets/Home.jpeg";
import { FaLeaf, FaHeartbeat, FaBookMedical } from "react-icons/fa";

export default function Home() {
  return (
    <div className="container mx-auto px-4 ">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-amber-800 mb-4">
              Your Personal Ayurvedic Health Assistant
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Ayurved AI combines ancient Ayurvedic wisdom with modern AI technology to provide personalized health
              recommendations based on your symptoms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-green-600 hover:bg-green-700 text-white rounded-md px-4 py-2">
                <Link to="/chat">Try the Chatbot</Link>
              </button>
              <button className="border-green-600 text-green-600 hover:bg-green-50 rounded-md px-4 py-2 border">
                <Link to="/remedies">Explore Remedies</Link>
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <img 
              src={HomeImage} 
              alt="Ayurvedic health illustration" 
              className="rounded-lg shadow-lg object-cover max-h-96" 
            />
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-green-100 rounded-xl my-20 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="px-4 py-1 bg-green-200 text-green-800 rounded-full text-sm font-medium">Our Process</span>
            <h2 className="text-4xl font-bold text-amber-800 mt-4">How Ayurved AI Works</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto my-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <FaLeaf className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-semibold text-amber-800 mb-4 text-center">Share Your Symptoms</h3>
              <p className="text-gray-600 text-center">
                Tell our AI chatbot about your health concerns and symptoms in simple language. We make it easy to describe how you're feeling.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <FaHeartbeat className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-semibold text-amber-800 mb-4 text-center">Get Ayurvedic Analysis</h3>
              <p className="text-gray-600 text-center">
                Our AI analyzes your symptoms according to Ayurvedic principles and identifies your unique dosha imbalances.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <FaBookMedical className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-semibold text-amber-800 mb-4 text-center">Receive Recommendations</h3>
              <p className="text-gray-600 text-center">
                Get personalized remedy suggestions, lifestyle modifications, and dietary advice tailored to your specific needs.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="px-4 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">Testimonials</span>
            <h2 className="text-4xl font-bold text-amber-800 mt-4">What Our Users Say</h2>
            <div className="w-24 h-1 bg-green-500 mx-auto my-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-8 rounded-2xl shadow-lg relative">
              <div className="absolute -top-5 -left-5 w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center text-amber-800 font-bold text-xl">"</div>
              <p className="italic text-gray-700 mb-6 text-lg">
                "Ayurved AI helped me understand my digestive issues from an Ayurvedic perspective and suggested simple
                remedies that actually worked! I've been following the dietary recommendations for a month now and feel much more balanced."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center text-amber-800 font-bold">PS</div>
                <div className="ml-4">
                  <p className="font-semibold text-amber-800 text-lg">Priya S.</p>
                  <p className="text-gray-600">Vata-Pitta Type</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-8 rounded-2xl shadow-lg relative">
              <div className="absolute -top-5 -left-5 w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center text-amber-800 font-bold text-xl">"</div>
              <p className="italic text-gray-700 mb-6 text-lg">
                "I've been struggling with sleep issues for years. The personalized recommendations from AyushAI have made
                a significant difference in my sleep quality. The herbal remedies and bedtime routine suggestions were game-changers."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center text-amber-800 font-bold">RM</div>
                <div className="ml-4">
                  <p className="font-semibold text-amber-800 text-lg">Rahul M.</p>
                  <p className="text-gray-600">Kapha Type</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl my-20 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-32 -mt-32 opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full -ml-24 -mb-24 opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full opacity-5"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Ayurvedic Journey?</h2>
          <div className="w-24 h-1 bg-white mx-auto my-8 opacity-50"></div>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Create an account to save your consultations, track your progress, and receive personalized Ayurvedic recommendations tailored to your unique constitution.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-green-700 hover:bg-green-50 rounded-lg px-8 py-4 font-medium text-lg shadow-lg transform transition hover:scale-105">
              <Link to="/signup">Sign Up Now</Link>
            </button>
            <button className="border-2 border-white text-white hover:bg-green-500 rounded-lg px-8 py-4 font-medium text-lg transform transition hover:scale-105">
              <Link to="/login">Login</Link>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}