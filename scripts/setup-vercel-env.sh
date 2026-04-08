#!/usr/bin/env bash
# setup-vercel-env.sh — Add all required environment variables to Vercel
#
# Usage:
#   chmod +x scripts/setup-vercel-env.sh
#   ./scripts/setup-vercel-env.sh
#
# Prerequisites:
#   - Vercel CLI installed: npm install -g vercel
#   - Logged in: vercel login
#   - Linked to a project: vercel link (run once from project root)
#   - scripts/service-account.json present (for Firebase Admin auto-upload)
#
# Each variable is added to all three environments: production, preview, development.
# You will be prompted for the value of each variable.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SERVICE_ACCOUNT_PATH="$SCRIPT_DIR/service-account.json"

ENVIRONMENTS="production preview development"

add_env() {
  local key="$1"
  local hint="$2"
  local sensitive="${3:-true}"   # true = masked input, false = plain

  echo ""
  echo "──────────────────────────────────────────"
  echo "Variable : $key"
  echo "What    : $hint"
  echo "──────────────────────────────────────────"

  if [ "$sensitive" = "true" ]; then
    read -rs -p "Value (hidden): " value
    echo ""
  else
    read -r -p "Value: " value
  fi

  if [ -z "$value" ]; then
    echo "⚠️  Skipped (empty value)"
    return
  fi

  for env in $ENVIRONMENTS; do
    echo "$value" | vercel env add "$key" "$env" --force
  done

  echo "✅  $key added to all environments"
}

echo ""
echo "╔══════════════════════════════════════════╗"
echo "║   EstateLeads AI — Vercel Env Setup      ║"
echo "╚══════════════════════════════════════════╝"
echo ""
echo "This script will prompt for each required environment variable."
echo "Press ENTER to skip optional variables."
echo ""

# ── OpenAI ──────────────────────────────────────────────────────────────────

add_env "OPENAI_API_KEY" \
  "OpenAI secret key (sk-...). Required for all AI features." \
  true

add_env "OPENAI_MODEL" \
  "Model to use, e.g. gpt-4o or gpt-4o-mini. Defaults to gpt-4o-mini if blank." \
  false

# ── Firebase (client-side) ───────────────────────────────────────────────────

echo ""
echo "════════ Firebase Client Config ════════"
echo "Find these in Firebase Console → Project Settings → Your Apps → Web App"

add_env "NEXT_PUBLIC_FIREBASE_API_KEY" \
  "Firebase web API key" \
  true

add_env "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN" \
  "e.g. your-project.firebaseapp.com" \
  false

add_env "NEXT_PUBLIC_FIREBASE_PROJECT_ID" \
  "e.g. your-project-id" \
  false

add_env "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET" \
  "e.g. your-project.appspot.com" \
  false

add_env "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID" \
  "Numeric sender ID from Firebase Console" \
  false

add_env "NEXT_PUBLIC_FIREBASE_APP_ID" \
  "Firebase App ID (1:xxx:web:xxx)" \
  false

# ── Google OAuth (Gmail integration) ────────────────────────────────────────

echo ""
echo "════════ Google OAuth (Gmail) ════════"
echo "Find these in Google Cloud Console → APIs & Services → Credentials"

add_env "GOOGLE_CLIENT_ID" \
  "OAuth 2.0 Client ID (ends in .apps.googleusercontent.com)" \
  false

add_env "GOOGLE_CLIENT_SECRET" \
  "OAuth 2.0 Client Secret" \
  true

add_env "GOOGLE_REDIRECT_URI" \
  "Production callback URL, e.g. https://yourdomain.com/api/gmail/callback" \
  false

# ── Stripe ───────────────────────────────────────────────────────────────────

echo ""
echo "════════ Stripe (Billing) — adding dummy placeholders ════════"
echo "Replace these with real values in Vercel dashboard when billing is ready."

add_env_value() {
  local key="$1"
  local value="$2"
  for env in $ENVIRONMENTS; do
    echo "$value" | vercel env add "$key" "$env" --force
  done
  echo "✅  $key = $value"
}

add_env_value "STRIPE_SECRET_KEY"       "sk_test_dummy_replace_me"
add_env_value "STRIPE_WEBHOOK_SECRET"   "whsec_dummy_replace_me"
add_env_value "STRIPE_PRICE_STARTER"    "price_dummy_starter"
add_env_value "STRIPE_PRICE_PRO"        "price_dummy_pro"
add_env_value "STRIPE_PRICE_AGENCY"     "price_dummy_agency"

# ── App URL ──────────────────────────────────────────────────────────────────

add_env "NEXT_PUBLIC_APP_URL" \
  "Your production domain, e.g. https://estateleads.ai (used for Stripe redirect URLs)" \
  false

# ── Firebase Admin (service account) ─────────────────────────────────────────

echo ""
echo "════════ Firebase Admin Service Account ════════"

if [ -f "$SERVICE_ACCOUNT_PATH" ]; then
  echo "Found scripts/service-account.json — base64-encoding and uploading automatically..."

  # Compact the JSON (strip whitespace) then base64-encode it
  if command -v python3 &>/dev/null; then
    encoded=$(python3 -c "import json,base64,sys; d=json.load(open('$SERVICE_ACCOUNT_PATH')); print(base64.b64encode(json.dumps(d).encode()).decode())")
  else
    encoded=$(base64 < "$SERVICE_ACCOUNT_PATH" | tr -d '\n')
  fi

  for env in $ENVIRONMENTS; do
    echo "$encoded" | vercel env add "FIREBASE_SERVICE_ACCOUNT" "$env" --force
  done

  echo "✅  FIREBASE_SERVICE_ACCOUNT added to all environments"
  echo ""
  echo "   In your app, decode it with:"
  echo "   const sa = JSON.parse(Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT!, 'base64').toString())"
else
  echo "⚠️  scripts/service-account.json not found — skipping."
  echo "   Download it from Firebase Console → Project Settings → Service accounts"
  echo "   Save it as scripts/service-account.json and re-run this script."
fi

# ── Done ─────────────────────────────────────────────────────────────────────

echo ""
echo "╔══════════════════════════════════════════╗"
echo "║   ✅  All variables processed!           ║"
echo "╚══════════════════════════════════════════╝"
echo ""
echo "Verify in Vercel dashboard: Settings → Environment Variables"
echo "Then redeploy: vercel --prod"
echo ""
