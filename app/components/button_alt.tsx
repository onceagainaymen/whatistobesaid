export default function ButtonAlt({ text }) {
  return (
    <div
      className="
        bg-transparent text-black/30 hover:text-black
        border border-black/10 hover:border-black/50 hover:bg-black/[0.03]
        px-3.5 py-1.5 text-[11px] tracking-[0.12em] uppercase
        transition-all duration-200
        text-center
      "
      style={{ fontFamily: "'Courier New', Courier, monospace" }}
    >
      <h1 className="text-xl"> {text} </h1>
    </div>
  );
}
