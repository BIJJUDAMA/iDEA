#!/usr/bin/env bash
set -euo pipefail

echo "Running pre-commit formatting check"
npm run format:check
