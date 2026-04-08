# Gmail Integration Setup Guide

This guide explains how to set up Gmail OAuth for EstateLeads AI to enable email syncing from your property enquiries inbox.

## Overview

The Gmail integration allows you to:
- Connect your Gmail account securely via OAuth 2.0
- Fetch emails from a specific label (e.g., "Property Enquiries")
- Automatically convert emails into leads
- Track which emails have been imported

## Prerequisites

- A Google Cloud Project
- Gmail inbox with property enquiries
- A designated Gmail label for enquiries (e.g., "Property Enquiries")

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project:
   - Click the project dropdown at the top
   - Click "NEW PROJECT"
   - Enter a project name (e.g., "EstateLeads AI")
   - Click "CREATE"

## Step 2: Enable Gmail API


1. In the Google Cloud Console, search for "Gmail API"
2. Click on "Gmail API"
3. Click the "ENABLE" button
4. Wait for the API to be enabled

## Step 3: Create OAuth 2.0 Credentials

1. Go to "Credentials" in the left sidebar
2. Click "CREATE CREDENTIALS"
3. Select "OAuth client ID"
4. If prompted, configure the OAuth consent screen:
   - Select "External" user type
   - Fill in the required fields:
     - App name: "EstateLeads AI"
     - User support email: your email
     - Developer contact: your email
   - Click "SAVE AND CONTINUE"
   - Add scopes:
     - `https://www.googleapis.com/auth/gmail.readonly`
     - `https://www.googleapis.com/auth/gmail.send`
   - Click "SAVE AND CONTINUE"
   - Add test users (your Gmail account)
   - Click "SAVE AND CONTINUE"

5. Back to creating credentials, select:
   - Application type: "Web application"
   - Name: "EstateLeads Development"
   - Authorized redirect URIs:
     - `http://localhost:3000/api/gmail/callback` (for development)
     - `https://yourdomain.com/api/gmail/callback` (for production)
   - Click "CREATE"

6. Copy the Client ID and Client Secret

## Step 4: Configure Environment Variables

Add the OAuth credentials to your `.env.local` file:

```bash
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/gmail/callback
```

## Step 5: Using the Gmail Inbox Integration

1. Navigate to `/dashboard/inbox`
2. Click "Connect Gmail"
3. You'll be redirected to Gmail's login page
4. Authorize EstateLeads AI to access your Gmail
5. You'll be redirected back to the app
6. Configure your Gmail label (defaults to "Property Enquiries")
7. Click "Sync Now" to fetch emails
8. Click "Create Lead" on any email to import it as a lead

## Development Notes

- **Token Storage**: Currently uses in-memory storage (MVP only). For production, implement secure token storage (e.g., encrypted database).
- **Sync Frequency**: Currently manual via "Sync Now" button. For production, consider background jobs.
- **Label Name**: Must be exact match (case-sensitive). Check your Gmail labels.
- **Email Parsing**: Extracts sender, subject, body, and attempts to detect property address.

## API Endpoints

### GET `/api/gmail/connect`
Returns the OAuth authorization URL

**Response:**
```json
{
  "authUrl": "https://accounts.google.com/o/oauth2/v2/auth?..."
}
```

### GET `/api/gmail/callback`
Handles OAuth callback from Google
- Exchanges authorization code for tokens
- Stores tokens (in-memory for MVP)
- Redirects back to inbox with `connected=true` param

### POST `/api/gmail/sync`
Syncs emails from Gmail label

**Request:**
```json
{
  "label": "Property Enquiries",
  "maxResults": 20
}
```

**Response:**
```json
{
  "success": true,
  "messagesCount": 5,
  "messages": [
    {
      "senderName": "John Smith",
      "senderEmail": "john@example.com",
      "subject": "Enquiry about 12 Marine Road",
      "body": "Hi, I'm interested in viewing...",
      "propertyAddress": "12 Marine Road, Southsea",
      "receivedTime": "2024-04-03T10:30:00Z",
      "messageId": "abc123",
      "source": "gmail"
    }
  ]
}
```

### POST `/api/gmail/import-to-lead`
Converts a Gmail message to a lead

**Request:**
```json
{
  "email": {
    "senderName": "John Smith",
    "senderEmail": "john@example.com",
    "subject": "Enquiry about 12 Marine Road",
    "body": "Hi, I'm interested in viewing...",
    "propertyAddress": "12 Marine Road, Southsea",
    "receivedTime": "2024-04-03T10:30:00Z",
    "messageId": "abc123",
    "source": "gmail"
  }
}
```

**Response:**
```json
{
  "success": true,
  "lead": {
    "id": "lead_1712145600000_xyz",
    "name": "John Smith",
    "email": "john@example.com",
    "propertyAddress": "12 Marine Road, Southsea",
    "message": "Hi, I'm interested in viewing...",
    "temperature": "hot",
    "status": "new",
    "source": "gmail",
    "leadType": "buyer",
    "agencyId": "default",
    "createdAt": "2024-04-03T10:30:00.000Z",
    "updatedAt": "2024-04-03T10:32:45.123Z"
  },
  "message": "Lead \"John Smith\" created from email"
}
```

## Troubleshooting

### "No emails found"
- Check that your Gmail label name matches exactly (case-sensitive)
- Ensure you have emails with the "Property Enquiries" label
- Try with fewer filters (e.g., remove the `is:unread` filter)

### "Failed to sync emails"
- Verify GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are correct
- Check that Gmail API is enabled in Google Cloud Console
- Ensure redirect URI matches in Google Cloud settings

### "Gmail not connected"
- Click "Connect Gmail" to authorize
- You may need to clear cookies and try again
- Ensure you're using the test user account added in OAuth consent screen

## Production Deployment

When deploying to production:

1. Update `GOOGLE_REDIRECT_URI` to your production domain
2. Implement secure token storage (not in-memory)
3. Set up background jobs for auto-sync (optional)
4. Use environment variables for all secrets
5. Implement refresh token rotation
6. Add rate limiting to API endpoints
7. Consider webhook notifications instead of manual sync

## Security Considerations

- Never commit `.env.local` to version control
- Tokens should be encrypted at rest
- Implement token expiration and refresh
- Rate limit OAuth endpoints
- Validate all email inputs before creating leads
- Use HTTPS in production
