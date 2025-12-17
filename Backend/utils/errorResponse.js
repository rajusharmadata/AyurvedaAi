class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        // Capture stack trace, excluding constructor call from it
        Error.captureStackTrace(this, this.constructor);
    }

    // Static method to create common error responses
    static badRequest(message = 'Bad Request') {
        return new ErrorResponse(message, 400);
    }

    static unauthorized(message = 'Unauthorized') {
        return new ErrorResponse(message, 401);
    }

    static forbidden(message = 'Forbidden') {
        return new ErrorResponse(message, 403);
    }

    static notFound(message = 'Resource not found') {
        return new ErrorResponse(message, 404);
    }

    static conflict(message = 'Resource already exists') {
        return new ErrorResponse(message, 409);
    }

    static internalError(message = 'Internal Server Error') {
        return new ErrorResponse(message, 500);
    }

    static validationError(errors) {
        const message = 'Validation failed';
        const error = new ErrorResponse(message, 400);
        error.errors = errors;
        return error;
    }
}

export default ErrorResponse;
