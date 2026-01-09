
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Testing Post model access...");
    try {
        // Check if 'post' property exists
        if (!prisma.post) {
            console.error("❌ prisma.post is UNDEFINED!");
            console.log("Available models:", Object.keys(prisma).filter(k => !k.startsWith('_') && !k.startsWith('$')));
            return;
        }

        const posts = await prisma.post.findMany();
        console.log(`✅ Success! Found ${posts.length} posts.`);

        // Create a dummy post to verify write
        if (posts.length === 0) {
            console.log("Creating test post...");
            await prisma.post.create({
                data: {
                    title: "Test Post",
                    slug: "test-post-" + Date.now(),
                    content: "This is a test post",
                    excerpt: "Test excerpt",
                    author: "Test Bot",
                    tags: ["Test"],
                    references: [],
                    date: new Date()
                }
            });
            console.log("✅ Created test post.");
        }

    } catch (e) {
        console.error("❌ Error accessing Post model:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
