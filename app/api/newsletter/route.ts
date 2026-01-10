import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
        }

        // Check if already subscribed
        const existing = await prisma.subscriber.findUnique({
            where: { email }
        });

        if (existing) {
            if (!existing.isActive) {
                // Reactivate
                await prisma.subscriber.update({
                    where: { email },
                    data: { isActive: true }
                });
                return NextResponse.json({ message: 'Welcome back! You have been resubscribed.' });
            }
            return NextResponse.json({ message: 'You are already subscribed!' });
        }

        await prisma.subscriber.create({
            data: { email }
        });

        return NextResponse.json({ message: 'Welcome to the inner circle.' });

    } catch (error) {
        console.error("Subscription Error:", error);
        return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
    }
}
