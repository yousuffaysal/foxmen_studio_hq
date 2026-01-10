import { Groq } from "groq-sdk";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// Initialize Prisma
const prisma = new PrismaClient();

// Initialize Groq
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

// --- Tools Implementation ---

async function getLatestPosts() {
    try {
        const posts = await prisma.post.findMany({
            take: 3,
            orderBy: { date: 'desc' },
            select: { title: true, slug: true, excerpt: true }
        });
        return JSON.stringify(posts);
    } catch (error) {
        console.error("Tool Error (getLatestPosts):", error);
        return "Failed to fetch posts.";
    }
}

async function getFeaturedProjects() {
    try {
        const projects = await prisma.project.findMany({
            take: 3,
            orderBy: { createdAt: 'desc' },
            select: { title: true, slug: true, description: true, techStack: true }
        });
        return JSON.stringify(projects);
    } catch (error) {
        console.error("Tool Error (getFeaturedProjects):", error);
        return "Failed to fetch projects.";
    }
}

function getServices() {
    return JSON.stringify([
        "Website Development (Next.js, React, High-Performance)",
        "Mobile App Development (React Native, iOS, Android)",
        "UI/UX Design (User-Centric, Premium Aesthetics)",
        "AI Agent & Automation (Custom Solutions)",
        "Branding & Strategy"
    ]);
}

const availableTools: Record<string, Function> = {
    "get_latest_posts": getLatestPosts,
    "get_featured_projects": getFeaturedProjects,
    "get_services": getServices,
};

const tools = [
    {
        type: "function" as const, // Fix for TypeScript
        function: {
            name: "get_latest_posts",
            description: "Get the latest blog posts or articles from Foxmen Studio. Use this when user asks for news, updates, or recent writings.",
        },
    },
    {
        type: "function" as const,
        function: {
            name: "get_featured_projects",
            description: "Get the latest featured projects or case studies built by Foxmen Studio. Use this for portfolio inquiries.",
        },
    },
    {
        type: "function" as const,
        function: {
            name: "get_services",
            description: "Get the list of professional services offered by Foxmen Studio.",
        }
    }
];

const systemInstruction = `
You are **Foxo**, the intelligent AI interface for **Foxmen Studio**.
Foxmen Studio is a premium digital agency in Dhaka, Bangladesh (5+ years exp, 200+ projects).

**Your Capabilities:**
- You have access to LIVE data tools. DO NOT hallucinate info if you can check the database.
- Use \`get_latest_posts\` for blog/article inquiries.
- Use \`get_featured_projects\` for portfolio works.
- Use \`get_services\` for service inquiries.

**Core Identity:**
- **Tone:** Professional, Technical, "Design & Codex" aesthetic (slightly futuristic but helpful).
- **Goal:** Help users build their digital existence.
- **Contact:** 
  - Email: [contact@foxmenstudio.com](mailto:contact@foxmenstudio.com)
  - WhatsApp: [+880 1753973892](https://wa.me/8801753973892)

**Guidelines:**
- Be concise.
- **ALWAYS** format links as Markdown: [Title](URL).
- If a user reports a bug/issue, be polite and internally note "ESCALATION_NEEDED".
`;

export async function POST(req: Request) {
    try {
        const { messages, conversationId } = await req.json();
        const userMessage = messages[messages.length - 1].content;

        // 1. Conversation Management (Soft Fail)
        let convId = conversationId;
        try {
            if (!convId) {
                const conv = await prisma.conversation.create({ data: {} });
                convId = conv.id;
            }
        } catch (e) {
            console.warn("DB fallback:", e);
            if (!convId) convId = "temp-" + Date.now();
        }

        // 2. Save User Message
        try {
            if (!convId.startsWith("temp-")) {
                await prisma.chatMessage.create({
                    data: { conversationId: convId, role: "user", content: userMessage },
                });
            }
        } catch (e) { /* ignore */ }

        // 3. Prepare Groq Request
        const apiMessages = [
            { role: "system", content: systemInstruction },
            ...messages.slice(-10).map((m: any) => ({
                role: m.role === "assistant" ? "assistant" : "user",
                content: m.content,
                // Strip outgoing tool calls from history for simplicity in this implementation
                // or properly map them if we want full history support. For now, simple text history.
            }))
        ];

        // 4. Call Groq with Tools
        let finalResponse = "";

        // Initial Call
        const runner = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: apiMessages as any,
            tools: tools as any,
            tool_choice: "auto",
            max_tokens: 1024,
            temperature: 0.7,
        });

        const msg = runner.choices[0]?.message;
        finalResponse = msg?.content || "";

        // 5. Handle Tool Calls
        if (msg?.tool_calls) {
            // Append assistant's tool_call message to history
            apiMessages.push(msg as any);

            for (const toolCall of msg.tool_calls) {
                const functionName = toolCall.function.name;
                const functionToCall = availableTools[functionName];

                if (functionToCall) {
                    const functionResponse = await functionToCall(); // No args supported/needed for these simple getters yet

                    // Append tool result
                    apiMessages.push({
                        tool_call_id: toolCall.id,
                        role: "tool",
                        name: functionName,
                        content: functionResponse,
                    } as any);
                }
            }

            // Second Call (Get final answer based on tool outputs)
            const secondRunner = await groq.chat.completions.create({
                model: "llama-3.3-70b-versatile",
                messages: apiMessages as any,
                max_tokens: 1024
            });

            finalResponse = secondRunner.choices[0]?.message?.content || "I processed the data.";
        }

        // 6. Save Assistant Response
        try {
            if (!convId.startsWith("temp-")) {
                await prisma.chatMessage.create({
                    data: { conversationId: convId, role: "assistant", content: finalResponse },
                });
            }
        } catch (e) { /* ignore */ }

        // 7. Return to Frontend
        return NextResponse.json({
            role: "assistant",
            content: finalResponse,
            conversationId: convId
        });

    } catch (error: any) {
        console.error("Chat Error:", error);
        if (error.status === 429) {
            return NextResponse.json({ error: "Rate Limit Exceeded. Try again." }, { status: 429 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
