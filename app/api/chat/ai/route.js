export const maxDuration = 60;

import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import connectDB from "@/config/mongodb";
import Chat from "../../../models/Chat";

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req) {
  try {
    const { userId } = getAuth(req);
    const { chatId, prompt } = await req.json();

    if (!userId) {
      return NextResponse.json({ success: false, message: "User not authenticated" });
    }

    await connectDB();
    const data = await Chat.findOne({ userId, _id: chatId });
    if (!data) {
      return NextResponse.json({ success: false, message: "Chat not found" });
    }

    // Save user's prompt to DB
    const userPrompt = {
      role: "user",
      content: prompt,
      timestamp: Date.now()
    };
    data.messages.push(userPrompt);

    // Call Gemini API (using your structure)
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const generatedText = response.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    console.log("[Gemini Response]", generatedText);

    const aiMessage = {
      role: "assistant",
      content: generatedText,
      timestamp: Date.now()
    };

    data.messages.push(aiMessage);
    await data.save();

    return NextResponse.json({ success: true, data: aiMessage });

  } catch (error) {
    console.error("[Gemini Error]", error);
    return NextResponse.json({
      success: false,
      message: error.message || "Something went wrong with Gemini API"
    });
  }
}