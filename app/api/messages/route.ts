import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyAuth } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    try {
        verifyAuth(request);
    } catch {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } });
        return NextResponse.json(messages);
    } catch (error: any) {
        return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        if (!body.email || !body.message) {
            return NextResponse.json({ error: 'Email and message are required' }, { status: 400 });
        }

        const newMessage = await prisma.contactMessage.create({
            data: {
                name: body.name,
                email: body.email,
                phone: body.phone,
                company: body.company,
                projectType: body.projectType,
                country: body.country,
                subject: body.subject,
                message: body.message,
            },
        });

        return NextResponse.json(newMessage, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
