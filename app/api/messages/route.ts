
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const messages = await prisma.contactMessage.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(messages);
    } catch (error: any) {
        console.error("Failed to fetch messages:", error);
        return NextResponse.json({ error: "Failed to fetch messages", details: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Basic validation
        if (!body.email || !body.message) {
            return NextResponse.json(
                { error: "Email and Message are required" },
                { status: 400 }
            );
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
        console.error("Message API Error:", error);
        return NextResponse.json({
            error: "Internal Server Error",
            details: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}
