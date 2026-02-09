const { Redis } = require('@upstash/redis');
const dotenv = require('dotenv');

dotenv.config();

// Create a new Redis client instance
// Redis.fromEnv() automatically uses UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN
const redis = Redis.fromEnv();

console.log('Redis Client initialized from environment variables');

module.exports = redis;
