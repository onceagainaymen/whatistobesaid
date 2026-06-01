import { db } from "./lib/db";
import * as schema from "./lib/db/schema";
import { sql } from "drizzle-orm";

async function main() {
  console.log("🔌 Connecting...\n");

  const ping = await db.execute(sql`SELECT 1 AS result`);
  console.log("📡 Ping:", ping[0], "\n");

  const allUsers = await db.select().from(schema.users).limit(3);
  console.log(
    `👤 Users (${allUsers.length}):`,
    JSON.stringify(allUsers, null, 2),
    "\n",
  );

  const allPosts = await db.select().from(schema.posts).limit(3);
  console.log(
    `📝 Posts (${allPosts.length}):`,
    JSON.stringify(allPosts, null, 2),
    "\n",
  );

  const allComments = await db.select().from(schema.comments).limit(3);
  console.log(
    `💬 Comments (${allComments.length}):`,
    JSON.stringify(allComments, null, 2),
    "\n",
  );

  console.log("✅ All checks passed.");
  process.exit(0);
}

main().catch((e) => {
  console.error("❌ Error:", e);
  process.exit(1);
});
