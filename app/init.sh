#!/bin/bash
set -e

echo "⏳ Waiting for MySQL to be ready..."
until npx drizzle-kit introspect 2>/dev/null; do
  echo "  Not ready yet, retrying in 3s..."
  sleep 3
done

echo "✅ Schema introspected"
exec npm run dev
