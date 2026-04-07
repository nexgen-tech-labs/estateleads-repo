export function summarizeLeadPrompt({
  leadName,
  property,
  message,
}: {
  leadName: string;
  property: string;
  message: string;
}): string {
  return `You are an assistant for a UK real estate agency.

Summarize the following property enquiry in 1 to 2 short sentences for an estate agent dashboard.

Extract if possible:
- buyer, seller, renter, landlord, or investor intent
- urgency or timeline
- property of interest
- any requested next action

Return ONLY valid JSON with no markdown formatting, no code fences:
{
  "summary": "",
  "leadType": "",
  "timeline": "",
  "nextAction": "",
  "temperature": "hot|warm|cold"
}

Lead name: ${leadName}
Property: ${property}
Enquiry:
${message}`;
}

export function generateReplyPrompt({
  leadName,
  property,
  message,
  agencyName,
}: {
  leadName: string;
  property: string;
  message: string;
  agencyName: string;
}): string {
  return `You are writing a professional and warm email reply for a UK estate agency.

Write a concise reply to a property enquiry.

Goals:
- acknowledge the enquiry
- sound human and professional
- invite next step such as viewing, budget, timing, or call
- avoid sounding robotic or salesy
- do not invent facts that were not provided
- keep it under 140 words

Context:
Lead name: ${leadName}
Property: ${property}
Enquiry: ${message}
Agency name: ${agencyName}

Return ONLY valid JSON with no markdown formatting, no code fences:
{
  "subject": "a short professional email subject line",
  "body": "the email body text"
}`;
}

export function generateFollowupsPrompt({
  leadName,
  property,
  message,
  agencyName,
}: {
  leadName: string;
  property: string;
  message: string;
  agencyName: string;
}): string {
  return `You are creating a short email follow-up sequence for a UK estate agency.

Create 3 follow-up emails for a property enquiry.

Rules:
- sequence steps: day 1, day 3, day 7
- each message should be brief and natural
- should encourage response without pressure
- mention viewing or next step where relevant
- do not repeat identical wording
- under 100 words each
- do not include subject lines, only message bodies

Context:
Lead name: ${leadName}
Property: ${property}
Original enquiry: ${message}
Agency name: ${agencyName}

Return ONLY valid JSON with no markdown formatting, no code fences:
{
  "step1": "",
  "step2": "",
  "step3": ""
}`;
}
