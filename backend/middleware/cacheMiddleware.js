const redis = require('../config/redis');

/**
 * Middleware to cache GET requests
 * @param {number} duration - Cache duration in seconds
 */
const cacheMiddleware = (duration = 3600) => {
    return async (req, res, next) => {
        // Only cache GET requests
        if (req.method !== 'GET') {
            return next();
        }

        // Create a unique key based on the request URL
        // We use the full URL including query parameters
        const key = `api:${req.originalUrl}`;

        try {
            // Check if data exists in cache
            const cachedData = await redis.get(key);

            if (cachedData) {
                // If found, return cached data
                return res.json(cachedData);
            }

            // If not found, override res.send/res.json to cache the response
            const originalJson = res.json;

            res.json = async function (body) {
                // Restore original json function
                res.json = originalJson;

                // Cache the response asynchronously
                try {
                    await redis.set(key, body, { ex: duration });
                } catch (err) {
                    console.error('Redis Caching Error:', err);
                }

                // Send the response
                return res.json(body);
            };

            next();
        } catch (error) {
            console.error('Redis Error:', error);
            next();
        }
    };
};

module.exports = cacheMiddleware;
