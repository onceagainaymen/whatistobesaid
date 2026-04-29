export default function HeadFrame()
{
  return (
    <header className="border-b-2 h-24 flex items-center px-4">
  <h1 className="text-4xl font-bold flex-1">
    WhatIsToBe<span className="text-gray-400">Said</span>
  </h1>

  <div className="flex items-center gap-8 mr-3 ml-auto">
    <h2 className="text-3xl hover:text-gray-700 font-bold">
      Sign In
    </h2>
    <div className="bg-black h-16 w-40 hover:bg-gray-700 transition duration-300 flex items-center justify-center px-4">
      <h2 className="text-3xl text-white font-bold">
        Sign Up
      </h2>
    </div>
  </div>
</header>
  )
}
