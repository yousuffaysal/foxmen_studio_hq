const redis = require('./config/redis');

async function testRedis() {
    console.log('Testing Redis Connection...');
    try {
        // Test Set
        await redis.set('test-key', 'Hello Upstash!');
        console.log('✅ Set operation successful');

        // Test Get
        const value = await redis.get('test-key');
        console.log(`✅ Get operation successful. Value: ${value}`);

        if (value === 'Hello Upstash!') {
            console.log('🎉 Redis is working correctly!');
        } else {
            console.log('❌ Value mismatch');
        }

        // Clean up
        await redis.del('test-key');
    } catch (error) {
        console.error('❌ Redis Connection Failed:', error);
    }
}

testRedis();
