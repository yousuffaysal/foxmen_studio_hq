
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const projects = await prisma.project.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(projects);
    } catch (error) {
        console.error('Failed to fetch projects:', error);
        return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        // Validate body if needed, or just pass to Prisma
        // Extract fields to ensure type safety if preferred, or rely on body matching schema
        const project = await prisma.project.create({
            data: {
                title: body.title,
                slug: body.slug,
                description: body.description,
                image: body.image,
                video: body.video,
                gallery: body.gallery,
                tags: body.tags,
                techStack: body.techStack,
                features: body.features,
                link: body.link,
                // github removed
                goal: body.goal,
                category: body.category,
                role: body.role,
                duration: body.duration,
                challenge: body.challenge,
                solution: body.solution,
                outcome: body.outcome,
                // JSON fields need typically explicit handling if they are strictly typed, 
                // but Prisma 'Json' type accepts any object.
                process: body.process,
                results: body.results,
                testimonial: body.testimonial,
                content: body.content,
            },
        });
        return NextResponse.json(project, { status: 201 });
    } catch (error: any) {
        console.error('Failed to create project:', error);
        return NextResponse.json({ error: error.message || 'Failed to create project' }, { status: 500 });
    }
}
