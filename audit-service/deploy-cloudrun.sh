#!/bin/bash
# Deploy audit-service to Google Cloud Run using the Dockerfile.
# Run from the audit-service directory: bash deploy-cloudrun.sh

set -e

PROJECT="gemini-prod-475814"
REGION="us-central1"
SERVICE="audit-service"

# Load .env safely (handles values with spaces and special chars)
if [ ! -f .env ]; then
  echo "❌ .env file not found. Run from the audit-service directory."
  exit 1
fi

get_env() {
  grep "^$1=" .env | head -1 | cut -d'=' -f2-
}

OPENAI_API_KEY=$(get_env OPENAI_API_KEY)
RESEND_API_KEY=$(get_env RESEND_API_KEY)
SENDER_EMAIL=$(get_env SENDER_EMAIL)
INTERNAL_NOTIFY_EMAIL=$(get_env INTERNAL_NOTIFY_EMAIL)
GOOGLE_SHEET_URL=$(get_env GOOGLE_SHEET_URL)

echo "🚀 Deploying $SERVICE to Cloud Run ($REGION)..."

gcloud run deploy "$SERVICE" \
  --source . \
  --region "$REGION" \
  --project "$PROJECT" \
  --allow-unauthenticated \
  --memory 2Gi \
  --cpu 2 \
  --execution-environment gen2 \
  --update-env-vars "OPENAI_API_KEY=$OPENAI_API_KEY" \
  --update-env-vars "RESEND_API_KEY=$RESEND_API_KEY" \
  --update-env-vars "SENDER_EMAIL=$SENDER_EMAIL" \
  --update-env-vars "INTERNAL_NOTIFY_EMAIL=$INTERNAL_NOTIFY_EMAIL" \
  --update-env-vars "GOOGLE_SHEET_URL=$GOOGLE_SHEET_URL" \
  --update-env-vars "FRONTEND_URL=https://scaleuplabs.dev" \
  --update-env-vars "NODE_ENV=production" \
  --update-env-vars "MOCK_LLM=false" \
  --update-env-vars "PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true"

echo "✅ Deployment complete!"
