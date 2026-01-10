
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const posts = await prisma.post.findMany({
            orderBy: { date: 'desc' },
            include: { comments: true }
        });
        return NextResponse.json(posts);
    } catch (error) {
        console.error('Failed to fetch posts:', error);
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }
}

import { sendNewsletter } from '@/lib/email';
// ... (start of file)

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
