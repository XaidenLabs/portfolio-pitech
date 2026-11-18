#!/usr/bin/env bash
set -euo pipefail

TARGET="${1:-.}"
OUTPUT="${2:-}"

if [ -z "$OUTPUT" ]; then
  npx -y rea-agents@latest analyze-javascript-application "$TARGET" --json
else
  npx -y rea-agents@latest analyze-javascript-application "$TARGET" --json > "$OUTPUT"
  echo "Static analysis evidence successfully written to $OUTPUT"
fi
