// sign_in.tsx
"use client";
import SignInComp from "./sign_in_comp";

export default function SignIn({ onSubmit }: { onSubmit: () => void }) {
  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 flex items-center justify-center py-12 lg:py-0">
        <SignInComp onSubmit={onSubmit} />
      </div>
      <div className="hidden lg:flex w-1/2 h-screen items-center justify-center">
        <img src="/brutalism.jpeg" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}
