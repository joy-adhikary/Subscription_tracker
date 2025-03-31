const errorMiddleware = (err, req, res, next) => {
    try {
        let error = { ... err };
        error.message = err.message;
        console.error("oh no", error.message);

        // Mongoose bad ObjectId
        if (err.name === 'CastError') {
            const message = `Resource not found. Invalid path: ${err.path}`;
            error = new Error(message);
            error.statusCode = 404;
        }

        // Mongoose duplicate key
        if (err.code === 11000) {
            const message = 'Ops, Duplicate field value entered';
            error = new Error(message);
            error.statusCode = 400;
        }

        // Mongoose validation error
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(val => val.message);
            error = new Error(message.join(', '));
            error.statusCode = 400;
        }

        // Mongoose expired token error
        if (err.name === 'TokenExpiredError') {
            const message = `Token expired`;
            error = new Error(message);
            error.statusCode = 400;
        }

        // Mongoose json web token error
        if (err.name === 'JsonWebTokenError') {
            const message = `Token invalid`;
            error = new Error(message);
            error.statusCode = 400;
        }

        // Mongoose not before error
        if (err.name === 'NotBeforeError') {
            const message = `Token not active`;
            error = new Error(message);
            error.statusCode = 404;
        }

        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Server Error',
            stack: process.env.NODE_ENV === 'production' ? null : error.stack
        });

    } catch (error) {
        next(error);
    }
}

export default errorMiddleware;
