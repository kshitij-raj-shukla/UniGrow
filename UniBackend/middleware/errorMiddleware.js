const errorHandler = (err, req, res, next) => {
    console.error(`❌ Error: ${err.message}`.red.bold); // Logs error message

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Show stack trace only in development
    });
};

module.exports = errorHandler;
