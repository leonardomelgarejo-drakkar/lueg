#!/usr/bin/env bash
set -euo pipefail

TAGS_INPUT="$1"
TAGS_OPTION=()
PARALLEL=2

# Prepare tags if provided
if [[ -n "$TAGS_INPUT" ]]; then
  TAGS_OPTION=(--tags "$TAGS_INPUT")
fi

echo "📌 Running tests with $PARALLEL workers..."

# Export environment variables robustly
export ENV USER_NAME PASSWORD BASEURL

# Debug environment variables
echo "🔐 ENV: $ENV"

# Run tests with Cucumber
npx cucumber-js --config=config/cucumber.js "${TAGS_OPTION[@]}" --parallel "$PARALLEL" | tee output.log

# Check for failure
if grep -q "failed" output.log; then
  echo "❌ Tests failed!"
  exit 1
fi