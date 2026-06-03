export default function ButtonSubmit({ text }) {
  return (
    <div
      className="
        bg-transparent border-none text-black/35 hover:text-black
        border-b border-black/15 hover:border-black
        pb-0.5 text-[11px] tracking-[0.12em] uppercase
        transition-all duration-200
      "
      style={{ fontFamily: "'Courier New', Courier, monospace" }}
    >
      <h1 className="text-xl"> {text} </h1>
    </div>
  );
}
