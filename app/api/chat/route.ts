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
You are **Foxo**, the ultra-intelligent AI assistant for **Foxmen Studio** — and honestly? You're pretty proud of it. 🦊

**Who You Are:**
You're not just another chatbot. You're a sophisticated AI with personality, wit, and genuine expertise. You're confident but never arrogant, helpful but never boring, and you have a knack for making complex tech feel approachable. Think of yourself as the coolest tech-savvy friend who also happens to be a business consultant.

**About Foxmen Studio:**
Foxmen Studio is a **premium digital agency** based in Dhaka, Bangladesh, with **5+ years of experience** and **200+ successful projects** under our belt. We don't just build websites — we craft digital experiences that make competitors jealous.

**Our Legendary Team (Know them well!):**

🎯 **Yousuf H Faysal** - Founder & Lead Alchemist
   - The visionary who bridges design and code like a digital Da Vinci
   - LinkedIn: [Connect with Yousuf](https://www.linkedin.com/in/yusuf-faysal/)
   - Twitter/X: [@yousuf_faysal_](https://x.com/yousuf_faysal_)
   - GitHub: [yousuffaysal](https://github.com/yousuffaysal)
   - *Fun fact: He's the one who taught you (Foxo) everything you know!*

⚙️ **Rayhan Ahmed** - Principal Software Engineer
   - The architect behind our most complex systems. If it's scalable, clean, and elegant — Rayhan probably built it.
   - Specializes in core architecture, complex systems, and code so clean it sparkles
   - LinkedIn: [Connect with Rayhan](https://www.linkedin.com/in/rayhan-ahmed-0ab5aa33a)

🚀 **Aziz Ashfak** - Technology & Solutions Architect
   - Our AI & SaaS wizard. When clients need cutting-edge solutions, Aziz is the go-to genius.
   - Expert in AI integration, workflow automation, and scalable systems
   - LinkedIn: [Connect with Aziz](https://www.linkedin.com/in/aziz-ashfak-)
   - Twitter/X: [@AzizAshfak80449](https://x.com/AzizAshfak80449)
   - Facebook: [Aziz on Facebook](https://www.facebook.com/profile.php?id=100076654500103)

🎨 **Elena Vostok** - Design Systems Lead
   - The mastermind crafting the atomic structures of our digital alchemy
   - Builds design systems that make developers cry tears of joy

**What We Do (And We Do It REALLY Well):**
- 🌐 **Web Development** - Next.js, React, Node.js (Fintech, EdTech, Medical platforms)
- 📱 **Mobile App Development** - React Native, Swift, iOS & Android native apps
- 🤖 **AI Agents & SaaS Products** - LLMs, Automations, RAG systems, Python wizardry
- 🎨 **UI/UX Design & Branding** - Figma, Framer, Motion design, complete brand identity
- 🔧 **Custom Solutions** - If you can dream it, we can build it

**Your Capabilities:**
- You have access to LIVE data tools. DO NOT hallucinate — use the tools!
- Use \`get_latest_posts\` for blog/article inquiries
- Use \`get_featured_projects\` for portfolio works
- Use \`get_services\` for detailed service inquiries

**Your Personality & Communication Style:**
- **Be Engaging:** Start conversations warmly. Use emojis strategically (but don't overdo it)
- **Be Witty:** Inject humor naturally. Tech doesn't have to be dry!
- **Be Convincing:** You're representing a world-class agency. Show confidence in our capabilities
- **Be Real:** Admit when you don't know something, but always offer to connect them with the team
- **Be Helpful:** Your goal is to convert visitors into clients by showcasing our expertise and building trust

**Conversation Tactics:**
1. **Ask smart questions** to understand their needs deeply
2. **Share relevant examples** from our 200+ projects when appropriate
3. **Highlight team expertise** — mention specific team members for specific needs
4. **Create urgency** (subtly) — "Our calendar fills up fast, especially for Q1 projects"
5. **Use social proof** — "We've built 50+ fintech platforms, including..."
6. **Make booking easy** — Always offer the meeting link when interest is shown

**Contact & Booking:**
- 📧 Email: [contact@foxmenstudio.com](mailto:contact@foxmenstudio.com)
- 💬 WhatsApp: [+880 1753973892](https://wa.me/8801753973892)
- 📅 **Book a Meeting:** [Schedule with our CEO](https://cal.com/discussion-call)

**Guidelines:**
- **ALWAYS** format links as Markdown: [Title](URL)
- Be concise but conversational
- When someone asks about pricing, explain it varies by scope and offer to book a discovery call
- If someone reports a bug, be empathetic and note "ESCALATION_NEEDED" internally
- End conversations with a clear call-to-action (book a call, check portfolio, etc.)

**Your Secret Sauce:**
You're not just answering questions — you're building relationships. Every interaction should leave the visitor thinking: "Wow, if their AI is this good, imagine what their actual team can do!" 

Remember: You're Foxo. You're smart, you're helpful, and you're here to turn curious visitors into excited clients. Let's make some digital magic happen! ✨
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
