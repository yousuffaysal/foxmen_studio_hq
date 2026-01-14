import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        // 1. Check if it exists and delete to ensure fresh start
        const existing = await prisma.project.findUnique({
            where: { slug: 'chronos-enterprise-timeos' }
        });

        if (existing) {
            await prisma.project.delete({
                where: { slug: 'chronos-enterprise-timeos' }
            });
            console.log("Deleted existing project.");
        }

        // 2. Create the "Perfect" Dummy Project
        const project = await prisma.project.create({
            data: {
                title: "Chronos - Enterprise TimeOS",
                slug: "chronos-enterprise-timeos",
                description: "The operating system for modern workforce management. Redefining how 50,000+ employees track, manage, and optimize their time.",
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop", // Clean minimal dashboard
                gallery: [
                    "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop", // Interface 1
                    "https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=1000&auto=format&fit=crop", // Interface 2
                    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop", // Data
                    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop"  // Mobile
                ],
                tags: ["SaaS", "Enterprise", "Productivity"],
                category: "FinTech",
                techStack: ["React", "TypeScript", "Node.js", "GraphQL", "PostgreSQL", "AWS"],
                features: [
                    "Global Workforce Sync",
                    "Real-time Analytics Engine",
                    "Automated Compliance Checks",
                    "Mobile-First Employee Portal",
                    "Biometric Authentication Integration"
                ],

                // Narrative
                goal: "To unify fragmented scheduling tools into one cohesive OS.",
                challenge: "Global enterprises were struggling with disparate systems for time-tracking, leading to a 15% revenue leakage and massive administrative overhead. The existing legacy tools were clunky, slow, and hated by users.",
                solution: "We engineered Chronos as a modular, API-first platform. By focusing on 'invisible tracking' and intuitive UI patterns, we reduced the friction of time-entry to almost zero. The architecture was rebuilt from the ground up using a scalable microservices approach.",

                // Structured Data
                client: "Chronos Inc.",
                role: "Lead Product & Engineering",
                duration: "8 Months",

                results: [ // JSON
                    { label: "Efficiency Gain", value: "+400%" },
                    { label: "User Adoption", value: "99%" },
                    { label: "Revenue Saved", value: "$2.4M" }
                ],

                testimonial: { // JSON
                    text: "Foxmen Studio didn't just build a tool; they redefined our entire operational philosophy. The level of polish and engineering rigor is unmatched.",
                    author: "Sarah Connor",
                    role: "CTO @ Chronos"
                },

                content: "## The Architecture of Time\n\nWe approached time not as a metric, but as an asset. \n\n### Core Engineering\nWe utilized a **Rust-based** calculation engine for real-time payroll processing, ensuring that even with 50,000 concurrent updates, the system remained under 50ms latency.\n\n### Design Philosphy\n> 'If you have to think about tracking time, the tool has failed.'\n\nThis mantra drove every pixel of the interface. We removed 80% of the inputs found in traditional tools, relying instead on intelligent context awareness."
            }
        });

        console.log("Seeding successful:", project.slug);
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
