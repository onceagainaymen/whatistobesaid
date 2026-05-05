import ButtonSubmit from "../components/button_submit"
import ButtonAlt from "../components/button_alt"
import {melloida} from "../lib/fonts"

export default function HeadFrame()
{
  return (
    <header className="mb-4 border-b-2 h-24 flex items-center px-4">
    <div className="flex-1">
    <h1 className={`${melloida.className} text-4xl font-bold`}>
    WhatIsToBe<span className="text-gray-400">Said</span>
    </h1>
    <p>0.1</p>
    </div>

    <div className="flex items-center gap-8 mr-3 ml-auto">
    <ButtonSubmit text="Sign In">
    </ButtonSubmit>
    <ButtonAlt text="Sign Up">
    </ButtonAlt>
    </div>
    </header>
  )
}
