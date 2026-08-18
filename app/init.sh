#!/bin/bash
set -e

echo "⏳ Waiting for MySQL to be ready..."
until mysql -h database -u root -p$MYSQL_ROOT_PASSWORD -e "SELECT 1" > /dev/null 2>&1; do
  echo "  Not ready yet, retrying in 3s..."
  sleep 3
done

echo "✅ Database ready"

echo "🔍 Introspecting database schema..."
npx drizzle-kit introspect

echo "🌱 Seeding database..."
npx tsx scripts/seed.ts

echo "✅ Seeding complete"
echo "🚀 Starting Next.js..."

exec npm run dev
