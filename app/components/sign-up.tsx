import SignUpComp from "../components/sign-up-comp.tsx"
export default function SignIn({onSubmit}: {onSubmit: () => void})
{
  return (
    <div className="w-full h-screen flex">
      
      {/* Left: 1/3 */}
      <div className="w-1/2 flex items-center justify-center">
        <SignUpComp onSubmit={onSubmit}/>
      </div>

      {/* Right: 2/3 */}
      <div className="w-1/2 h-full flex items-center border-l-2 justify-center">
          <img src="/rsdlp.jpeg" className="w-full h-full object-cover"/>
      </div>

    </div>
  )
}
