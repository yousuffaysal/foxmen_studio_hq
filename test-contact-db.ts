
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Testing ContactMessage creation...");
    try {
        const msg = await prisma.contactMessage.create({
            data: {
                name: "Test Script",
                email: "test@example.com",
                message: "This is a test from the script",
                subject: "Test Subject"
            },
        });
        console.log("✅ Success! Created message:", msg);
    } catch (e) {
        console.error("❌ Error creating message:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
