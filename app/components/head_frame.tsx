import ButtonSubmit from "../components/button_submit";
import { melloida } from "../lib/fonts";
import { getSession } from "@/lib/auth";
import ButtonDanger from "./button_danger";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function HeadFrame() {
  const session = await getSession();
  async function handleLogout() {
    "use server";
    const cookieStore = await cookies();
    cookieStore.delete("session");
    redirect("/");
  }
  return (
    <header className="border-b-2 h-24 flex items-center px-4">
      <div className="flex-1">
        <h1 className={`${melloida.className} text-4xl font-bold`}>
          <a href="/">
            WhatIsToBe<span className="text-gray-400">Said</span>
          </a>
        </h1>
      </div>

      <div className="flex items-center gap-8 mr-3 ml-auto">
        {session === null && (
          <>
            <a href="/auth">
              <ButtonSubmit text="signing"></ButtonSubmit>
            </a>
          </>
        )}
        {session !== null && (
          <>
            <a href={`/profile/${session.username}`}>
              <ButtonSubmit text="profile"></ButtonSubmit>
            </a>
            <p>|</p>
            <form action={handleLogout}>
              <button type="submit">
                <ButtonDanger text="log out"></ButtonDanger>
              </button>
            </form>
          </>
        )}
      </div>
    </header>
  );
}
