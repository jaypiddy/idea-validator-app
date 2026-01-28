import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

// Read .env.local manually since we don't have dotenv
const envPath = path.resolve(process.cwd(), '.env.local');
let apiKey = '';

try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/GEMINI_API_KEY=(.*)/);
    if (match) {
        apiKey = match[1].trim();
    }
} catch (e) {
    console.error("Could not read .env.local", e);
}

if (!apiKey) {
    console.error("No API KEY found");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
    try {
        // Note: listModels is on the genAI instance or model manager? 
        // In strict SDK it might be different, but let's try the model manager if available
        // Actually, usually it's just fetching from the API directly or checking documentation. 
        // The SDK documentation says... genAI.getGenerativeModel is for *getting* one.
        // For listing, it might require a direct fetch if SDK doesn't expose it easily in this version.

        // Let's try a direct fetch to the API to be sure, bypassing SDK quirks
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
        const res = await fetch(url);
        const data = await res.json();

        if (data.models) {
            console.log("Available Models:");
            data.models.forEach(m => {
                if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent')) {
                    console.log(`- ${m.name}`);
                }
            });
        } else {
            console.log("No models found or error:", data);
        }

    } catch (error) {
        console.error("Error listing models:", error);
    }
}

listModels();
