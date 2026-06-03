import Index from "../components/Index";
import HomePage from "../components/home_page";
import { getSession } from "@/lib/auth";

export default async function Home() {
  const session = await getSession();
  return (
    <div>
      {session !== null && <Index />}
      {session === null && <HomePage />}
    </div>
  );
}
