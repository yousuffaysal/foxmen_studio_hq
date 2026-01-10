import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendNewsletter } from '@/lib/email';

export async function POST(request: Request) {
    try {
        const { email } = await request.json(); // Admin test trigger

        // 1. Get all subscribers
        const subscribers = await prisma.subscriber.findMany({
            where: { isActive: true },
            select: { email: true }
        });

        const emailList = subscribers.map(s => s.email);

        if (emailList.length === 0) {
            return NextResponse.json({ message: 'No active subscribers found.' });
        }

        // 2. Get Latest Post Data
        const latestPost = await prisma.post.findFirst({
            orderBy: { date: 'desc' }
        });

        const postToSend = latestPost || {
            title: "System Test: Broadcast Protocols",
            slug: "test-broadcast",
            excerpt: "This is a test transmission. No blog posts found in database, sending system test message."
        };

        // 3. Send Emails
        await sendNewsletter(postToSend, emailList);

        return NextResponse.json({
            message: `Test broadcast initiated to ${emailList.length} subscribers.`,
            emails: emailList
        });

    } catch (error) {
        console.error("Test Broadcast Error:", error);
        return NextResponse.json({ error: 'Failed to broadcast' }, { status: 500 });
    }
}
