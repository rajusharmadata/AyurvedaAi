import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Loader, ArrowRight } from 'lucide-react';
import axios from 'axios';

const VerifyEmail = () => {
  const { token } = useParams();
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Use the standardized API endpoint
        const response = await axios.get(`http://localhost:5000/api/v1/auth/verify-email/${token}`);
        setStatus('success');
        setMessage(response.data.message || 'Email verified successfully!');
      } catch (error) {
        setStatus('error');
        setMessage(
          error.response?.data?.message || 
          'Verification failed. The link may be invalid or expired.'
        );
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center transform transition-all hover:scale-[1.01]">
        
        {status === 'verifying' && (
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-green-200 rounded-full animate-ping opacity-25"></div>
              <Loader className="h-16 w-16 text-green-600 animate-spin relative z-10" />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-gray-800">Verifying your email...</h2>
            <p className="mt-2 text-gray-600">Please wait while we confirm your identity.</p>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center animate-fadeIn">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Email Verified!</h2>
            <p className="text-gray-600 mb-8">{message}</p>
            
            <Link 
              to="/login" 
              className="group flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300 w-full"
            >
              <span>Continue to Login</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center animate-fadeIn">
            <div className="rounded-full bg-red-100 p-3 mb-4">
              <XCircle className="h-16 w-16 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Verification Failed</h2>
            <p className="text-red-500 mb-8">{message}</p>
            
            <Link 
              to="/login" 
              className="text-green-600 font-medium hover:text-green-700 underline underline-offset-4"
            >
              Back to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
