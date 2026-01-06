import { Groq } from "groq-sdk";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function verify() {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
        console.error("❌ GROQ_API_KEY is missing!");
        process.exit(1);
    }

    const groq = new Groq({ apiKey });

    console.log(`🔍 Testing Groq key: ${apiKey.substring(0, 10)}...`);
    console.log(`👉 Testing model: llama-3.3-70b-versatile`);

    try {
        const completion = await groq.chat.completions.create({
            messages: [{ role: "user", content: "Hi. Reply with OK." }],
            model: "llama-3.3-70b-versatile",
        });

        console.log(`✅ SUCCESS! Groq is working.`);
        console.log(`   Response: ${completion.choices[0]?.message?.content}`);
    } catch (error: any) {
        if (error.status === 429) {
            console.log(`⚠️  Rate Limited (429)`);
        } else {
            console.error(`❌ Error:`, error.message);
        }
    }
}

verify();
