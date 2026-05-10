import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import redis from '@/lib/redis';
import { verifyAuth } from '@/lib/auth';

const CACHE_KEY = 'api:posts';

export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await props.params;
        const post = await prisma.post.findUnique({ where: { id }, include: { comments: true } });
        if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        return NextResponse.json(post);
    } catch {
        return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
    try {
        verifyAuth(request);
    } catch {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id } = await props.params;
        const body = await request.json();
        const updated = await prisma.post.update({
            where: { id },
            data: {
                title: body.title,
                slug: body.slug,
                excerpt: body.excerpt,
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
                date: body.date ? new Date(body.date) : undefined,
            },
        });

        if (redis) { try { await redis.del(CACHE_KEY); } catch {} }

        return NextResponse.json(updated);
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Failed to update post' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }> }) {
    try {
        verifyAuth(request);
    } catch {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id } = await props.params;
        await prisma.post.delete({ where: { id } });

        if (redis) { try { await redis.del(CACHE_KEY); } catch {} }

        return NextResponse.json({ message: 'Post deleted' });
    } catch {
        return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
    }
}
