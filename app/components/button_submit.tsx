import {roboto} from "../lib/fonts"

export default function ButtonSubmit({text})
{
  return (
    <button
    className="h-20 border-black border-2 p-2.5 bg-[#FFFFFF] hover:bg-gray-300 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-gray-400">
      <h3 className={`${roboto.className} text-3xl font-bold`}>
        {text}
      </h3>
    </button>
  )
}
