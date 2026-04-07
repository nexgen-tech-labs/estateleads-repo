import type { LeadTemperature } from "./lead";

export interface LeadSummaryResponse {
  summary: string;
  leadType: string;
  timeline: string;
  nextAction: string;
  temperature: LeadTemperature;
}

export interface ReplyResponse {
  subject: string;
  body: string;
}

export interface FollowupResponse {
  step1: string;
  step2: string;
  step3: string;
}

export interface SummarizeLeadRequest {
  leadName: string;
  property: string;
  message: string;
}

export interface GenerateReplyRequest {
  leadName: string;
  property: string;
  message: string;
  agencyName: string;
}

export interface GenerateFollowupsRequest {
  leadName: string;
  property: string;
  message: string;
  agencyName: string;
}
