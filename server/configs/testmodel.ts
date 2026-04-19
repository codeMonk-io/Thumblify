import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY as string
});


async function listMyModels() {
  try {
    const response = await ai.models.list();
    console.log("Available models for your API key:");
    
    for (const m of response as any) {
      console.log(`- ${m.name}`);
    }
  } catch (error) {
    console.error("Error listing models:", error);
  }
}

listMyModels();