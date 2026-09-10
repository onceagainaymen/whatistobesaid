// sign_up.tsx
import SignUpComp from "./sign_up_comp";
export default function SignIn({ onSubmit }: { onSubmit: () => void }) {
  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 flex items-center justify-center py-12 lg:py-0">
        <SignUpComp onSubmit={onSubmit} />
      </div>
      <div className="hidden lg:flex w-1/2 h-screen border-l-2 items-center justify-center">
        <img src="/rsdlp.jpeg" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}
