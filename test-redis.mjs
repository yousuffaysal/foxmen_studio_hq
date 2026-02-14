
import { Redis } from '@upstash/redis'
import dotenv from 'dotenv'

dotenv.config()

async function testConnection() {
    console.log("Testing Redis Connection...")
    try {
        const redis = Redis.fromEnv()
        await redis.set('test_key', 'test_value')
        const value = await redis.get('test_key')
        console.log("Redis Connection Successful! Value:", value)
        await redis.del('test_key')
    } catch (error) {
        console.error("Redis Connection Failed:", error)
    }
}

testConnection()
