import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyAuth } from '@/lib/auth';

const prisma = new PrismaClient();

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        verifyAuth(request);
    } catch {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id } = await params;
        await prisma.contactMessage.delete({ where: { id } });
        return NextResponse.json({ message: 'Deleted' });
    } catch {
        return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }
}
