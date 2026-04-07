import { NextRequest, NextResponse } from "next/server";
import { callLLM, parseJsonResponse } from "@/lib/ai";
import { generateReplyPrompt } from "@/lib/prompts";
import type { ReplyResponse, GenerateReplyRequest } from "@/types/ai";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as GenerateReplyRequest;

    if (!body.leadName || !body.property || !body.message) {
      return NextResponse.json(
        { error: "leadName, property, and message are required" },
        { status: 400 }
      );
    }

    const prompt = generateReplyPrompt({
      leadName: body.leadName,
      property: body.property,
      message: body.message,
      agencyName: body.agencyName || "Harbour Homes",
    });

    const raw = await callLLM(prompt);
    const result = parseJsonResponse<ReplyResponse>(raw);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Generate reply error:", error);
    return NextResponse.json(
      { error: "Unable to generate reply. Please try again." },
      { status: 500 }
    );
  }
}
