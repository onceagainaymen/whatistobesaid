export default function ButtonAlt({text})
{
  return (
    <button
    className="h-20 border-black border-2 p-2.5 bg-gray-700 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-black text-white transition duration-300">
      <h2 className={`text-3xl font-bold uppercase tracking-tight`} style={{ fontFamily: "'Arial Black', 'Haettenschweiler', Impact, sans-serif" }}
>
        {text}
      </h2>
    </button>
  )
}
