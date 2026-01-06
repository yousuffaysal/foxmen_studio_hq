import { PrismaClient } from '@prisma/client';
import "dotenv/config"; // Ensure dotenv is loaded

const prisma = new PrismaClient({
    log: ['info', 'warn', 'error'],
});

async function main() {
    console.log("Connecting to database...");
    try {
        const count = await prisma.conversation.count();
        console.log(`Successfully connected. Conversation count: ${count}`);
    } catch (e) {
        console.error("Connection failed:", e);
        process.exit(1);
    }
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
