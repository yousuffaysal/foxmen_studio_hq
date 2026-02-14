import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import redis from '@/lib/redis';

const prisma = new PrismaClient();
const CACHE_DURATION = 3600; // 1 hour

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const CACHE_KEY = `api:projects:${slug}`;

        // Check cache
        if (redis) {
            try {
                const cachedProject = await redis.get(CACHE_KEY);
                if (cachedProject) {
                    console.log(`Cache HIT: outputting cached project ${slug}`);
                    return NextResponse.json(cachedProject);
                }
            } catch (redisError) {
                console.error('Redis GET Error:', redisError);
            }
        }

        console.log(`Cache MISS: fetching project ${slug} from DB`);
        const project = await prisma.project.findFirst({
            where: {
                slug: {
                    equals: slug,
                    mode: 'insensitive', // Handle case differences gracefully
                },
            },
        });

        // Set cache if found
        if (project && redis) {
            try {
                await redis.set(CACHE_KEY, project, { ex: CACHE_DURATION });
            } catch (redisError) {
                console.error('Redis SET Error:', redisError);
            }
        }

        if (!project) {
            return NextResponse.json(
                { error: 'Project not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(project);
    } catch (error) {
        console.error('Failed to fetch project:', error);
        return NextResponse.json(
            { error: 'Failed to fetch project' },
            { status: 500 }
        );
    }
}
