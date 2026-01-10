import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const comments = await prisma.comment.findMany({
            where: { postId: params.id },
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(comments);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
    }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
    try {
        const body = await request.json();
        const { name, email, content } = body;

        if (!name || !email || !content) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const comment = await prisma.comment.create({
            data: {
                name,
                email,
                content,
                postId: params.id
            }
        });
        return NextResponse.json(comment);
    } catch (error) {
        console.error("Error creating comment:", error);
        return NextResponse.json({ error: "Failed to create comment" }, { status: 500 });
    }
}
