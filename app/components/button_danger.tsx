export default function ButtonDanger({ text }) {
  return (
    <button
      className="
        bg-transparent border-none text-red-700/35 hover:text-red-700
        border-b border-red-700/15 hover:border-red-700
        pb-0.5 text-[11px] tracking-[0.12em] uppercase
        transition-all duration-200
      "
      style={{ fontFamily: "'Courier New', Courier, monospace" }}
    >
      <h1 className="text-xl"> {text} </h1>
    </button>
  );
}
