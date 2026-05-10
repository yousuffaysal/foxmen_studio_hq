import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import redis from '@/lib/redis';
import { verifyAuth } from '@/lib/auth';

const prisma = new PrismaClient();
const CACHE_KEY = 'api:projects';
const CACHE_DURATION = 3600;

export async function GET() {
    try {
        if (redis) {
            try {
                const cached = await redis.get(CACHE_KEY);
                if (cached) return NextResponse.json(cached);
            } catch {}
        }

        const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });

        if (redis) {
            try { await redis.set(CACHE_KEY, projects, { ex: CACHE_DURATION }); } catch {}
        }

        return NextResponse.json(projects);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        verifyAuth(request);
    } catch {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const project = await prisma.project.create({
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

        if (redis) { try { await redis.del(CACHE_KEY); } catch {} }

        return NextResponse.json(project, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Failed to create project' }, { status: 500 });
    }
}
