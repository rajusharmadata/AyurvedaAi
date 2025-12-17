import { Link } from "react-router-dom";
import { FiArrowRight, FiHeart, FiClock } from "react-icons/fi";

export default function RemedyCard({ 
  id, 
  name, 
  description, 
  imageUrl, 
  doshas, 
  likes = 0,
  duration = "15 mins",
  difficulty = "Easy"
}) {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-white opacity-90 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 filter sepia-10 saturate-125">
      {/* Image with overlay */}
      <div className="relative h-48 w-full">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          className="absolute inset-0 object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4">
            <div className="flex items-center space-x-2 text-white">
              <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-amber-500/20">
                <FiClock className="w-4 h-4 mr-1" />
                {duration}
              </span>
              <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-amber-500/20">
                {difficulty}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-amber-800 group-hover:text-amber-600 transition-colors duration-200 font-heading">
            {name}
          </h3>
          <div className="flex space-x-2">
            {doshas.map((dosha) => (
              <span
                key={dosha}
                className={`inline-flex items-center px-2 py-1 text-xs rounded-full ${
                  dosha === 'Vata' ? 'bg-green-100 text-green-700' :
                  dosha === 'Pitta' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-blue-100 text-blue-700'
                }`}
              >
                {dosha}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 font-body">{description}</p>

        {/* Actions */}
        <div className="flex justify-between items-center">
          {/* Likes */}
          <button className="flex items-center text-gray-500 hover:text-amber-600 transition-colors duration-200">
            <FiHeart className="w-5 h-5 mr-1" />
            <span>{likes}</span>
          </button>

          {/* Try Button */}
          <Link 
            to={`/remedies/${id}`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
          >
            Try Now
            <FiArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
