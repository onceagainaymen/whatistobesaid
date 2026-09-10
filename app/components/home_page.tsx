import { melloida } from "../lib/fonts";
import { roboto } from "../lib/fonts";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="grid mx-auto mt-12 sm:mt-20 lg:mt-34 w-[90vw] lg:w-[84vw] grid-cols-1 lg:grid-cols-2 gap-8 lg:h-[60vh] lg:grid-rows-2">
      <div className="self-start justify-self-start text-center lg:text-left">
        <h1
          className={`${melloida.className} text-4xl sm:text-5xl lg:text-8xl font-bold`}
        >
          Have you <span className="text-red-600">Said</span> it yet? Why wait?
        </h1>
        <span
          className={`${roboto.className} text-gray-400 block mx-auto lg:mx-0 w-fit text-2xl sm:text-3xl lg:text-6xl font-bold hover:text-gray-700 transition duration-300`}
        >
          <a href="/auth">Sign in.</a>
        </span>
      </div>
      <div className="lg:col-start-2 lg:row-start-2 self-center lg:self-end justify-self-center lg:justify-self-end">
        <Image
          src="/lenin.png"
          alt="Lenin"
          width={500}
          height={500}
          className="w-48 sm:w-72 lg:w-auto h-auto"
        />
      </div>
    </div>
  );
}
