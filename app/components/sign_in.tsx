"use client"
import SignInComp from "./sign_in_comp"

export default function SignIn({onSubmit}: {onSubmit: () => void})
{
  return (
    <div className="w-full h-screen flex">
      
      {/* Left: 1/3 */}
      <div className="w-1/2 flex items-center justify-center">
      <SignInComp onSubmit={onSubmit}/>
      </div>

      {/* Right: 2/3 */}
      <div className="w-1/2 h-full flex items-center justify-center">
          <img src="/brutalism.jpeg" className="w-[97vh] h-full object-cover"/>
      </div>
    </div>
  )
}
