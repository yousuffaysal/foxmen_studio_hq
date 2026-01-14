
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const project = await prisma.project.findUnique({
            where: { id: id },
        });
        if (!project) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }
        return NextResponse.json(project);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const updatedProject = await prisma.project.update({
            where: { id: id },
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
                process: body.process,
                results: body.results,
                testimonial: body.testimonial,
                content: body.content,
            }
        });
        return NextResponse.json(updatedProject);
    } catch (error) {
        console.error("Update failed", error);
        return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await prisma.project.delete({
            where: { id: id },
        });
        return NextResponse.json({ message: 'Project deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }
}
