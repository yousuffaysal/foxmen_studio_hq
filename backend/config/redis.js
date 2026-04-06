const { Redis } = require('@upstash/redis');
const dotenv = require('dotenv');

dotenv.config();

// Create a new Redis client instance
// Redis.fromEnv() automatically uses UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN
let redis;

try {
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
        redis = Redis.fromEnv();
        console.log('Redis Client initialized from environment variables');
    } else {
        console.warn('Warning: Redis environment variables are missing. Caching will be disabled.');
        // Provide a mock or handle it gracefully in the middleware
        redis = {
            get: async () => null,
            set: async () => null,
            del: async () => null
        };
    }
} catch (error) {
    console.error('Error initializing Redis:', error.message);
    redis = {
        get: async () => null,
        set: async () => null,
        del: async () => null
    };
}

module.exports = redis;
