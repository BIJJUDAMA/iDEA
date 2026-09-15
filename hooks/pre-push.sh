#!/usr/bin/env bash
set -euo pipefail

echo "Running pre-push checks"
npm run lint
npm run typecheck
npm run build
