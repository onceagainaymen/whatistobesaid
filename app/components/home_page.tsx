import {melloida} from "../lib/fonts"
import {roboto} from "../lib/fonts"
export default function HomePage()
{
  return (
      <div className="grid mx-auto h-[60vh] mt-34 w-[84vw] grid-cols-2 grid-rows-2">
        <div className="self-start justify-self-start">
         <h1 className={`${melloida.className} text-8xl font-bold`}>Have you <span className="text-red-600">Said</span> <br/> it yet? Why wait?</h1>
          <span className={`${roboto.className} text-gray-400 block mx-auto w-fit text-6xl font-bold hover:text-gray-700 transition duration-300`}><a href="/auth">Sign up.</a></span>
        </div>
        <div className="col-start-2 row-start-2 self-end justify-self-end">
          <img src="/lenin.png"/>
        </div>
      </div>
  )
}
