const send500Error = (res, error) => {
    const response = {
        success: false,
        message: 'Internal Server Error',
        error: {
            name: error.name,
            message: error.message,
            stack: process.env.NODE_ENV === 'production' ? 'Stack trace not available in production' : error.stack,
        },
    };

    res.status(500).json(response);
};

module.exports = send500Error;