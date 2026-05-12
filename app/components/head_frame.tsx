import ButtonSubmit from "../components/button_submit"
import ButtonAlt from "../components/button_alt"
import {melloida} from "../lib/fonts"

export default function HeadFrame()
{
  return (
    <header className="border-b-2 h-24 flex items-center px-4">
    <div className="flex-1">
    <h1 className={`${melloida.className} text-4xl font-bold`}>
    <a href="/">WhatIsToBe<span className="text-gray-400">Said</span></a>
    </h1>
    </div>

    <div className="flex items-center gap-8 mr-3 ml-auto">
    <a href="/auth">
    <ButtonSubmit text="signing">
    </ButtonSubmit>
    </a>
    </div>
    </header>
  )
}
