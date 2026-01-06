import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        // Fetch conversations with their latest message and escalation status
        // Prisma 7 logic might differ slightly, but standard Prisma Client usage:
        const conversations = await prisma.conversation.findMany({
            include: {
                messages: {
                    orderBy: { createdAt: "desc" },
                    take: 1,
                },
                escalations: true,
            },
            orderBy: {
                startedAt: "desc",
            },
        });

        const formatted = conversations.map((c: any) => ({
            id: c.id,
            startedAt: c.startedAt,
            lastMessage: c.messages[0]?.content || "No messages",
            escalated: c.escalations.length > 0,
            escalationStatus: c.escalations[0]?.status || "NONE",
        }));

        return NextResponse.json(formatted);
    } catch (error) {
        console.error("Admin API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
