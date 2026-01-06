import { PrismaClient } from '@prisma/client';
import "dotenv/config";
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function main() {
    console.log("Available Environment Keys:", Object.keys(process.env).filter(k => !k.startsWith('npm_')));

    const key = process.env.GEMINI_API_KEY;
    console.log(`GEMINI_API_KEY type: ${typeof key}`);
    console.log(`GEMINI_API_KEY length: ${key ? key.length : 'N/A'}`);
    console.log(`GEMINI_API_KEY value (first 4): ${key ? key.substring(0, 4) : 'N/A'}`);

    if (key && key.length > 0) {
        console.log("✅ GEMINI_API_KEY is validly present");
    } else {
        console.error("❌ GEMINI_API_KEY is present but EMPTY");
    }

    // Debugging raw file content
    const fs = require('fs');
    try {
        const content = fs.readFileSync('.env.local', 'utf8');
        const lines = content.split('\n');
        const keyLine = lines.find((l: string) => l.startsWith('GEMINI_API_KEY'));
        console.log("Raw line in .env.local:", keyLine);
        if (keyLine) {
            console.log("Line length:", keyLine.length);
            console.log("Chars:", keyLine.split('').map((c: string) => c.charCodeAt(0)));
        }
    } catch (e: any) {
        console.log("Could not read .env.local raw:", e.message);
    }
}

main();
