import { NextRequest, NextResponse } from "next/server";
import { callLLM, parseJsonResponse } from "@/lib/ai";
import { summarizeLeadPrompt } from "@/lib/prompts";
import type { LeadSummaryResponse, SummarizeLeadRequest } from "@/types/ai";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SummarizeLeadRequest;

    if (!body.leadName || !body.property || !body.message) {
      return NextResponse.json(
        { error: "leadName, property, and message are required" },
        { status: 400 }
      );
    }

    const prompt = summarizeLeadPrompt({
      leadName: body.leadName,
      property: body.property,
      message: body.message,
    });

    const raw = await callLLM(prompt);
    const result = parseJsonResponse<LeadSummaryResponse>(raw);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Summarize lead error:", error);
    return NextResponse.json(
      { error: "Unable to generate summary. Please try again." },
      { status: 500 }
    );
  }
}
