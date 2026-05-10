import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyAuth } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const project = await prisma.project.findUnique({ where: { id } });
        if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        return NextResponse.json(project);
    } catch {
        return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        verifyAuth(request);
    } catch {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id } = await params;
        const body = await request.json();
        const updated = await prisma.project.update({
            where: { id },
            data: {
                title: body.title,
                slug: body.slug,
                description: body.description,
                image: body.image,
                video: body.video,
                gallery: body.gallery ?? [],
                tags: body.tags ?? [],
                techStack: body.techStack ?? [],
                features: body.features ?? [],
                link: body.link,
                goal: body.goal,
                category: body.category,
                client: body.client,
                role: body.role,
                duration: body.duration,
                challenge: body.challenge,
                solution: body.solution,
                outcome: body.outcome,
                process: body.process,
                results: body.results,
                testimonial: body.testimonial,
                content: body.content,
            },
        });
        return NextResponse.json(updated);
    } catch (error: any) {
        if (error.code === 'P2025') return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        verifyAuth(request);
    } catch {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id } = await params;
        await prisma.project.delete({ where: { id } });
        return NextResponse.json({ message: 'Project deleted' });
    } catch (error: any) {
        if (error.code === 'P2025') return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }
}
