import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import redis from '@/lib/redis';
import { sendNewsletter } from '@/lib/email';

const CACHE_KEY = 'api:posts';
const CACHE_DURATION = 3600; // 1 hour

export async function GET() {
    try {
        // Check cache
        if (redis) {
            try {
                const cachedPosts = await redis.get(CACHE_KEY);
                if (cachedPosts) {
                    console.log('Cache HIT: outputting cached posts');
                    return NextResponse.json(cachedPosts);
                }
            } catch (redisError) {
                console.error('Redis GET Error:', redisError);
            }
        }

        console.log('Cache MISS: fetching from DB');
        const posts = await prisma.post.findMany({
            orderBy: { date: 'desc' },
            include: { comments: true }
        });

        // Set cache
        if (redis) {
            try {
                await redis.set(CACHE_KEY, posts, { ex: CACHE_DURATION });
            } catch (redisError) {
                console.error('Redis SET Error:', redisError);
            }
        }

        return NextResponse.json(posts);
    } catch (error) {
        console.error('Failed to fetch posts:', error);
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const post = await prisma.post.create({
            data: {
                title: body.title,
                slug: body.slug,
                excerpt: body.excerpt || '',
                content: body.content,
                coverImage: body.coverImage,
                tags: body.tags,
                references: body.references,
                author: body.author,
                authorRole: body.authorRole,
                authorBio: body.authorBio,
                authorImage: body.authorImage,
                authorTwitter: body.authorTwitter,
                authorLinkedin: body.authorLinkedin,
                date: body.date ? new Date(body.date) : new Date(),
            },
        });

        // Invalidate cache
        if (redis) {
            try {
                await redis.del(CACHE_KEY);
                console.log('Cache INVALIDATED: new post created');
            } catch (redisError) {
                console.error('Redis DEL Error:', redisError);
            }
        }

        // Broadcast to subscribers
        try {
            const subscribers = await prisma.subscriber.findMany({ where: { isActive: true } });
            const emails = subscribers.map(s => s.email);
            if (emails.length > 0) {
                await sendNewsletter(post, emails);
            }
        } catch (emailError) {
            console.error("Broadcast failed:", emailError);
            // We do not fail the request if email fails, but we log it
        }

        return NextResponse.json(post, { status: 201 });
    } catch (error) {
        console.error('Failed to create post:', error);
        return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
    }
}
