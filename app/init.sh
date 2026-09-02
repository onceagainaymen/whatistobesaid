#!/bin/bash
set -e

MARKER_FILE="/app/.db_initialized"

echo "⏳ Waiting for MySQL to be ready..."
until mysql -h database -u root -p"$MYSQL_ROOT_PASSWORD" -e "SELECT 1" > /dev/null 2>&1; do
  echo "  Not ready yet, retrying in 3s..."
  sleep 3
done

echo "✅ Database ready"

if [ ! -f "$MARKER_FILE" ]; then
  echo "🔍 First run — introspecting database schema..."
  npx drizzle-kit introspect

  echo "🌱 Seeding database..."
  npx tsx scripts/seed.ts

  touch "$MARKER_FILE"
  echo "✅ Seeding complete"
else
  echo "⏭️  Already initialized — skipping introspect & seed"
fi

mkdir -p /app/public/uploads
chmod -R 777 /app/public/uploads

echo "🚀 Starting Next.js..."
exec npm run dev
