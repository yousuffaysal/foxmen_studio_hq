import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import redis from '@/lib/redis';

const prisma = new PrismaClient();
const CACHE_KEY = 'api:projects';
const CACHE_DURATION = 3600; // 1 hour

export async function GET() {
    try {
        // Check cache
        if (redis) {
            try {
                const cachedProjects = await redis.get(CACHE_KEY);
                if (cachedProjects) {
                    console.log('Cache HIT: outputting cached projects');
                    return NextResponse.json(cachedProjects);
                }
            } catch (redisError) {
                console.error('Redis GET Error:', redisError);
            }
        }

        console.log('Cache MISS: fetching projects from DB');
        const projects = await prisma.project.findMany({
            orderBy: { createdAt: 'desc' },
        });

        // Set cache
        if (redis) {
            try {
                await redis.set(CACHE_KEY, projects, { ex: CACHE_DURATION });
            } catch (redisError) {
                console.error('Redis SET Error:', redisError);
            }
        }

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

        // Invalidate list cache
        if (redis) {
            try {
                await redis.del(CACHE_KEY);
                console.log('Cache INVALIDATED: new project created');
            } catch (redisError) {
                console.error('Redis DEL Error:', redisError);
            }
        }

        return NextResponse.json(project, { status: 201 });
    } catch (error: any) {
        console.error('Failed to create project:', error);
        return NextResponse.json({ error: error.message || 'Failed to create project' }, { status: 500 });
    }
}
