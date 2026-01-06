import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function main() {
    console.log("Checking available models...");
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("❌ GEMINI_API_KEY is missing");
        return;
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        // Access the model manager via the client instance if available, 
        // otherwise try a direct fetch or a standard model to test access.
        // The SDK doesn't always expose listModels directly on the main class in all versions.
        // Let's try to just instantiate a known model and run a dummy prompt to see if it works,
        // or print the available models if the SDK supports it.

        console.log("SDK Version:", require('@google/generative-ai/package.json').version);

        // Attempt to guess/check common models
        const modelsToCheck = ["gemini-1.5-flash", "gemini-1.5-flash-001", "gemini-pro"];
        for (const m of modelsToCheck) {
            console.log(`Testing model: ${m}`);
            try {
                const model = genAI.getGenerativeModel({ model: m });
                const result = await model.generateContent("Hello");
                console.log(`✅ ${m} works! Response: ${result.response.text().substring(0, 20)}...`);
            } catch (e: any) {
                console.log(`❌ ${m} failed: ${e.message.split('\n')[0]}`);
            }
        }

    } catch (e: any) {
        console.error("Error initializing client:", e.message);
    }
}

main();
