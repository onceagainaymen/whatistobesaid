import {roboto} from "../lib/fonts"

export default function ButtonAlt({text})
{
  return (
    <button
    className="h-20 border-black border-2 p-2.5 bg-gray-700 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-black text-white">
      <h2 className={`${roboto.className} text-3xl font-bold`}>
        {text}
      </h2>
    </button>
  )
}
