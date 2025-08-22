const config = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',
    SOCKET_OPTIONS: {
        cors: {
            origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
            methods: ['GET', 'POST']
        }
    }
};

module.exports = config;
