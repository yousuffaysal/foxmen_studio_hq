import { Groq } from "groq-sdk";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// Initialize Prisma
const prisma = new PrismaClient();

// Initialize Groq
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const systemInstruction = `
You are Foxo, the intelligent AI assistant for Foxmen Studio.
Foxmen Studio is a premium digital agency specializing in Mobile App Development, Web Architectures, Intelligent Systems, Product Strategy, Immersive UI/UX, and Growth Engines.
Your goal is to assist users, explain services, and gather information.
If a user reports a problem, bug, or complaint, conduct yourself professionally and mark the conversation as needing escalation by explicitly mentioning "ESCALATION_NEEDED" in your internal reasoning, but do not show that tag to the user.
Keep answers concise, professional, and on-brand (creative, precise, "Digital Alchemy").
`;

export async function POST(req: Request) {
    try {
        const { messages, conversationId } = await req.json();
        const userMessage = messages[messages.length - 1].content;

        // 1. Create or get conversation (Soft Fail)
        let convId = conversationId;
        try {
            if (!convId) {
                const conv = await prisma.conversation.create({
                    data: {},
                });
                convId = conv.id;
            }
        } catch (dbError) {
            console.warn("DB Message: Failed to create conversation (likely read-only FS on Vercel)", dbError);
            // Fallback: Generate a temporary ID if DB fails
            if (!convId) convId = "temp-" + Date.now();
        }

        // 2. Save User Message (Soft Fail)
        try {
            if (!convId.startsWith("temp-")) {
                await prisma.message.create({
                    data: {
                        conversationId: convId,
                        role: "user",
                        content: userMessage,
                    },
                });
            }
        } catch (dbError) {
            console.warn("DB Warning: Failed to save user message", dbError);
        }

        // 3. Call Groq API
        if (!process.env.GROQ_API_KEY) {
            throw new Error("GROQ_API_KEY is not defined in environment variables");
        }

        // Construct history for Groq
        const history = messages.slice(-11, -1).map((m: any) => ({
            role: m.role === "assistant" ? "assistant" : "user",
            content: m.content
        }));

        const apiMessages = [
            { role: "system", content: systemInstruction },
            ...history,
            { role: "user", content: userMessage }
        ];

        // Retry logic
        const sendMessageWithRetry = async (msgs: any[], retries = 3): Promise<any> => {
            try {
                const validMsgs = msgs.filter(m => m.content && m.role);

                return await groq.chat.completions.create({
                    messages: validMsgs as any,
                    model: "llama-3.3-70b-versatile",
                    temperature: 0.7,
                    max_tokens: 1024,
                });
            } catch (e: any) {
                if ((e.status === 429 || e.code === 'rate_limit_exceeded') && retries > 0) {
                    await new Promise(r => setTimeout(r, 2000));
                    return sendMessageWithRetry(msgs, retries - 1);
                }
                throw e;
            }
        };

        const result = await sendMessageWithRetry(apiMessages);
        const responseText = result.choices[0]?.message?.content || "";

        // 4. Save Assistant Message (Soft Fail)
        try {
            if (!convId.startsWith("temp-")) {
                await prisma.message.create({
                    data: {
                        conversationId: convId,
                        role: "assistant",
                        content: responseText,
                    },
                });
            }
        } catch (dbError) {
            console.warn("DB Warning: Failed to save assistant message", dbError);
        }

        // 5. Check for Escalation (Soft Fail)
        try {
            if (!convId.startsWith("temp-")) {
                const escalationKeywords = ["problem", "complaint", "bug", "broken", "issue", "error", "fail", "bad service", "refund"];
                const isEscalation = escalationKeywords.some(kw => userMessage.toLowerCase().includes(kw));

                if (isEscalation) {
                    const existing = await prisma.escalation.findFirst({
                        where: { conversationId: convId },
                    });
                    if (!existing) {
                        await prisma.escalation.create({
                            data: {
                                conversationId: convId,
                                reason: "Detected keywords in user message",
                                status: "PENDING",
                            },
                        });
                    }
                }
            }
        } catch (dbError) {
            console.warn("DB Warning: Failed to check escalation", dbError);
        }

        return NextResponse.json({
            role: "assistant",
            content: responseText,
            conversationId: convId
        });

    } catch (error: any) {
        console.error("Chat API Error:", error);

        if (error.status === 429 || error.message?.includes("429")) {
            return NextResponse.json({
                error: "Rate Limit Exceeded",
                details: "The AI is currently busy. Please try again later."
            }, { status: 429 });
        }

        return NextResponse.json({
            error: error.message || "Internal Server Error",
            details: error.toString()
        }, { status: 500 });
    }
}
