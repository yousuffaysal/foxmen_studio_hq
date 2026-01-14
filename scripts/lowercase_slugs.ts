
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const targetSlug = "lesonpaw-Online-Learning-Platform";
    // Also try to find it blindly if the case is slightly different
    const projects = await prisma.project.findMany();
    const project = projects.find(p => p.slug && p.slug.toLowerCase() === "lesonpaw-online-learning-platform");

    if (project) {
        console.log(`Found project: ${project.title} with slug: ${project.slug}`);
        const newSlug = project.slug.toLowerCase();

        if (project.slug !== newSlug) {
            await prisma.project.update({
                where: { id: project.id },
                data: { slug: newSlug }
            });
            console.log(`Updated slug to proper lowercase: ${newSlug}`);
        } else {
            console.log("Slug is already lowercase.");
        }
    } else {
        console.log("Could not find the project.");
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
