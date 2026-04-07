/**
 * POST /api/gmail/import-to-lead
 * Converts a parsed Gmail email into a Lead structure
 */

import { ParsedEmail } from "@/types/gmail"
import { Lead, LeadSource, LeadStatus, LeadType } from "@/types/lead"
import { NextRequest, NextResponse } from "next/server"

interface ImportRequest {
  email: ParsedEmail
  leadType?: LeadType
}

function guessLeadType(email: ParsedEmail): LeadType {
  const body = email.body.toLowerCase()
  const subject = email.subject.toLowerCase()

  const buyerKeywords = ["buy", "purchase", "viewing", "interested", "seller"]
  const sellerKeywords = ["sell", "market", "valuation", "market value", "list"]
  const rentalKeywords = ["rent", "let", "landlord", "tenant", "lease"]

  const allText = `${body} ${subject}`

  if (rentalKeywords.some((k) => allText.includes(k))) return "renter"
  if (sellerKeywords.some((k) => allText.includes(k))) return "seller"
  if (buyerKeywords.some((k) => allText.includes(k))) return "buyer"

  return "buyer" // default
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as ImportRequest
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { error: "Email data is required" },
        { status: 400 }
      )
    }

    // Infer lead type from email content
    const leadType = body.leadType || guessLeadType(email)

    // Create lead object
    const newLead: Lead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: email.senderName,
      email: email.senderEmail,
      phone: "", // Would need phone extraction from body
      propertyAddress: email.propertyAddress || "Property enquiry",
      message: email.body,
      temperature: "hot", // New leads from email are hot
      status: "new" as LeadStatus,
      source: "gmail" as LeadSource,
      leadType,
      agencyId: "default", // Would be set from user context
      createdAt: new Date(email.receivedTime).toISOString(),
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json(
      {
        success: true,
        lead: newLead,
        message: `Lead "${newLead.name}" created from email`,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error importing email to lead:", error)
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to import email as lead",
      },
      { status: 500 }
    )
  }
}
