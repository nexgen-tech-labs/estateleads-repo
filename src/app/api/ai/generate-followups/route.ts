import { NextRequest, NextResponse } from "next/server";
import { callLLM, parseJsonResponse } from "@/lib/ai";
import { generateFollowupsPrompt } from "@/lib/prompts";
import type { FollowupResponse, GenerateFollowupsRequest } from "@/types/ai";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as GenerateFollowupsRequest;

    if (!body.leadName || !body.property || !body.message) {
      return NextResponse.json(
        { error: "leadName, property, and message are required" },
        { status: 400 }
      );
    }

    const prompt = generateFollowupsPrompt({
      leadName: body.leadName,
      property: body.property,
      message: body.message,
      agencyName: body.agencyName || "Harbour Homes",
    });

    const raw = await callLLM(prompt);
    const result = parseJsonResponse<FollowupResponse>(raw);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Generate followups error:", error);
    return NextResponse.json(
      { error: "Unable to generate follow-ups. Please try again." },
      { status: 500 }
    );
  }
}
