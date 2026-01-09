
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
    try {
        const params = await props.params;
        const post = await prisma.post.findUnique({
            where: { id: params.id },
            include: { comments: true }
        });
        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }
        return NextResponse.json(post);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
    }
}

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
    try {
        const params = await props.params;
        const body = await request.json();
        console.log(`[PUT] Updating post ${params.id}`, body);

        const updatedPost = await prisma.post.update({
            where: { id: params.id },
            data: {
                title: body.title,
                slug: body.slug,
                excerpt: body.excerpt,
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
                date: body.date ? new Date(body.date) : undefined,
            },
        });
        console.log(`[PUT] Update success`, updatedPost);
        return NextResponse.json(updatedPost);
    } catch (error: any) {
        console.error("Failed to update post:", error);
        return NextResponse.json({ error: error.message || 'Failed to update post' }, { status: 500 });
    }
}

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
    try {
        const params = await props.params;
        await prisma.post.delete({
            where: { id: params.id },
        });
        return NextResponse.json({ message: 'Post deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
    }
}
