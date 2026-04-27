export {}

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // 1. Find the corrupted project
    const badSlug = "lesonpaw-–-online-learning-platformlesonpaw-online-learning-platform";
    const project = await prisma.project.findUnique({
        where: { slug: badSlug }
    });

    if (project) {
        console.log("Found corrupted project:", project.title);
        // 2. Update to clean slug
        const newSlug = "lesonpaw-online-learning-platform";
        await prisma.project.update({
            where: { id: project.id },
            data: { slug: newSlug }
        });
        console.log(`\nFixed! Slug updated to: ${newSlug}`);
    } else {
        console.log("Project with bad slug not found (maybe already fixed?)");
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
