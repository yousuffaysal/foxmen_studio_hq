import "dotenv/config";
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { Groq } from "groq-sdk";

async function main() {
    console.log("Checking GROQ_API_KEY...");
    const key = process.env.GROQ_API_KEY;

    if (!key) {
        console.error("❌ GROQ_API_KEY is MISSING in process.env");
    } else {
        console.log("✅ GROQ_API_KEY is present.");
        console.log(`Key length: ${key.length}`);

        // Test connection
        try {
            const groq = new Groq({ apiKey: key });
            console.log("Testing Groq API connection...");
            const completion = await groq.chat.completions.create({
                messages: [{ role: "user", content: "Hello" }],
                model: "llama-3.3-70b-versatile",
            });
            console.log("✅ Groq API Response:", completion.choices[0]?.message?.content);
        } catch (error: any) {
            console.error("❌ Groq API Connection Failed:", error.message);
        }
    }
}

main();
