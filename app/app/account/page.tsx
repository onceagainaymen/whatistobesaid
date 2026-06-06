import AccountPanel from "../../components/account_panel";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";

export default async function Account() {
  const session = await getSession();
  const user = await db.select().from(users).where(eq(session.id, users.id));
  return <AccountPanel user={user} />;
}
