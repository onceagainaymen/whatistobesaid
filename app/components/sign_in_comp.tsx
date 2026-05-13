"use client"

import ButtonAlt from "./button_alt"

export default function SignInComp({onSubmit}: {onSubmit: () => void}) {
  return (
      <div className="w-full px-32 mb-3 font-mono">

        <h1 className="text-4xl font-bold tracking-tight mb-12">
          Log in
        </h1>

        <div className="divide-y divide-black border-y border-black">
          {["Email", "Password"].map((label) => (
            <div key={label} className="py-8 flex flex-col gap-1">
              <label className="text-[9px] tracking-[0.2em] uppercase text-neutral-400">
                {label}
              </label>
              <input
                type={label === "Password" ? "password" : "text"}
                placeholder={label === "Email" ? "you@domain.com" : `Your ${label.toLowerCase()}`}
                className="bg-transparent outline-none text-sm placeholder:text-neutral-300"
              />
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-4">
          <ButtonAlt text="submit"/>
          <button className="cursor-pointer" onClick={onSubmit}><p>don't have an account?</p></button>
        </div>
      </div>
  );
}
