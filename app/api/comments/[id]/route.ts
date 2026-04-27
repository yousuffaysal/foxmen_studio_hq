
import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const comment = await prisma.comment.update({
            where: { id },
            data: { content: body.content }
        });
        return NextResponse.json(comment);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update comment" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await prisma.comment.delete({
            where: { id }
        });
        return NextResponse.json({ message: "Deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete comment" }, { status: 500 });
    }
}
