import jwt from 'jsonwebtoken';
import User from '../module/User.js';
import ErrorResponse from '../utils/errorResponse.js';

// Middleware to protect routes - requires authentication
export const protect = async (req, res, next) => {
    try {
        let token;
        
        // Get token from header or cookie
        if (req.headers.authorization?.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies?.token) {
            token = req.cookies.token;
        }

        if (!token) {
            return next(new ErrorResponse('Not authorized to access this route', 401));
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Get user from token
        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
            return next(new ErrorResponse('User not found', 404));
        }

        // Check if user is verified
        if (!user.isEmailVerified) {
            return next(new ErrorResponse('Please verify your email to access this route', 401));
        }

        // Add user to request object
        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }
};

// Role-based authorization middleware
export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(new ErrorResponse('User not authenticated', 401));
        }
        
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorResponse(
                    `User role ${req.user.role} is not authorized to access this route`,
                    403
                )
            );
        }
        
        next();
    };
};

// Check if user is the owner of the resource
export const checkOwnership = (model, paramName = 'id') => {
    return async (req, res, next) => {
        try {
            const resource = await model.findById(req.params[paramName]);
            
            if (!resource) {
                return next(new ErrorResponse('Resource not found', 404));
            }
            
            // Check if user is the owner or an admin
            if (resource.user.toString() !== req.user.id && req.user.role !== 'admin') {
                return next(
                    new ErrorResponse('Not authorized to update this resource', 403)
                );
            }
            
            next();
        } catch (error) {
            next(error);
        }
    };
};

// Check if user is verified
export const requireVerification = (req, res, next) => {
    if (!req.user.isEmailVerified) {
        return next(new ErrorResponse('Please verify your email to access this route', 403));
    }
    next();
};