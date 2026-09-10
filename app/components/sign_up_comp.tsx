// sign_up_comp.tsx
"use client";

import { useState } from "react";
import ButtonAlt from "./button_alt";

export default function SignUpComp({ onSubmit }: { onSubmit: () => void }) {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);

  async function handleSubmit() {
    setError("");
    setLoading(true);
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) return setError(data.error);
    setCreated(true);
    await sleep(2000);
    onSubmit();
  }

  return (
    <div className="w-full max-w-md lg:max-w-none px-6 sm:px-12 lg:px-32 mb-3 font-mono">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8 sm:mb-12">
        Create
        <br />
        account.
      </h1>

      <div className="divide-y divide-black border-y border-black">
        {[
          {
            label: "Name",
            key: "name",
            type: "text",
            placeholder: "Your name",
          },
          {
            label: "Username",
            key: "username",
            type: "text",
            placeholder: "Your username",
          },
          {
            label: "Email",
            key: "email",
            type: "text",
            placeholder: "you@domain.com",
          },
          {
            label: "Password",
            key: "password",
            type: "password",
            placeholder: "Your password",
          },
        ].map(({ label, key, type, placeholder }) => (
          <div key={key} className="py-6 sm:py-8 flex flex-col gap-1">
            <label className="text-[9px] tracking-[0.2em] uppercase text-neutral-400">
              {label}
            </label>
            <input
              type={type}
              placeholder={placeholder}
              value={form[key as keyof typeof form]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              className="bg-transparent outline-none text-sm placeholder:text-neutral-300 w-full"
            />
          </div>
        ))}
      </div>

      {error && <p className="text-red-600 text-xs mt-3">{error}</p>}

      <div className="mt-4 flex flex-wrap items-center gap-3 sm:gap-4">
        <span onClick={handleSubmit}>
          <ButtonAlt text={loading ? "..." : "submit"} />
        </span>
        <button className="cursor-pointer" onClick={onSubmit}>
          <p className="text-sm">already have an account?</p>
        </button>
        {created && (
          <p className="text-green-500 text-xs mt-3 w-full">
            Account created successfully!
          </p>
        )}
      </div>
    </div>
  );
}
