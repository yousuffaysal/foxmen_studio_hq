const redis = require('../config/redis');

/**
 * Invalidates cache keys matching a pattern
 * @param {string} pattern - Pattern to match (e.g., 'api:/api/projects*')
 */
const invalidateCache = async (pattern) => {
    try {
        // Use scan to find keys matching the pattern
        // Note: verify scanning behavior with global upstash endpoints or large datasets
        // For simpler patterns, we might just iterate known keys or use sets if needed.
        // But for now, let's use keys() from upstash/redis which is supported

        const keys = await redis.keys(pattern);

        if (keys.length > 0) {
            await redis.del(...keys);
            console.log(` invalidated ${keys.length} cache keys matching ${pattern}`);
        }
    } catch (error) {
        console.error('Cache Invalidation Error:', error);
    }
};

module.exports = invalidateCache;
