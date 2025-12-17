import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-800">404</h1>
          <p className="mt-4 text-2xl text-gray-600">Page Not Found</p>
        </div>
        <div className="space-y-4">
          <p className="text-gray-500 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <FiArrowLeft className="mr-2" />
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;