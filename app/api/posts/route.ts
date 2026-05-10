import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import redis from '@/lib/redis';
import { sendNewsletter } from '@/lib/email';
import { verifyAuth } from '@/lib/auth';

const CACHE_KEY = 'api:posts';
const CACHE_DURATION = 3600;

export async function GET() {
    try {
        if (redis) {
            try {
                const cached = await redis.get(CACHE_KEY);
                if (cached) return NextResponse.json(cached);
            } catch {}
        }

        const posts = await prisma.post.findMany({
            orderBy: { date: 'desc' },
            include: { comments: true },
        });

        if (redis) {
            try { await redis.set(CACHE_KEY, posts, { ex: CACHE_DURATION }); } catch {}
        }

        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
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
        const post = await prisma.post.create({
            data: {
                title: body.title,
                slug: body.slug,
                excerpt: body.excerpt || '',
                content: body.content,
                coverImage: body.coverImage,
                tags: body.tags ?? [],
                references: body.references ?? [],
                author: body.author,
                authorRole: body.authorRole,
                authorBio: body.authorBio,
                authorImage: body.authorImage,
                authorTwitter: body.authorTwitter,
                authorLinkedin: body.authorLinkedin,
                date: body.date ? new Date(body.date) : new Date(),
            },
        });

        if (redis) { try { await redis.del(CACHE_KEY); } catch {} }

        try {
            const subscribers = await prisma.subscriber.findMany({ where: { isActive: true } });
            const emails = subscribers.map(s => s.email);
            if (emails.length > 0) await sendNewsletter(post, emails);
        } catch {}

        return NextResponse.json(post, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
    }
}
