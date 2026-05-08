export default function ButtonDanger({text})
{
  return (
    <button
    className="h-12 border-black border-2 p-2.5 text-white bg-red-700 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-red-400 transition duration-300">
      <h3 className={`text-3xl font-bold`} style={{ fontFamily: "'Arial Black', 'Haettenschweiler', Impact, sans-serif" }}
>
        {text}
      </h3>
    </button>
  )
}
