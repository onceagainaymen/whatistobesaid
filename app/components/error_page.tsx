export default function ErrorPage({
  message,
  status,
}: {
  message: string;
  status: number;
}) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <div className="max-w-xl w-full border-4 border-black p-8 relative">
        {/* Brutalist shadow */}
        <div className="absolute inset-0 translate-x-2 translate-y-2 bg-black -z-10"></div>

        {/* Error code */}
        <div className="text-[8rem] font-black leading-none tracking-tighter mb-4 select-none">
          {status}
        </div>

        {/* Divider */}
        <div className="w-full h-1 bg-black mb-6"></div>

        {/* Message */}
        <p className="text-xl font-bold uppercase tracking-tight mb-6">
          {message}
        </p>

        {/* Divider */}
        <div className="w-full h-1 bg-black mb-6"></div>
        {/* Home link */}
        <a
          href="/"
          className="block text-center mt-3 text-xs font-black uppercase tracking-widest text-black/50 hover:text-black transition-colors duration-200"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
}
