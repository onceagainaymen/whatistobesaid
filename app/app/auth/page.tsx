"use client"
import { motion, AnimatePresence } from "framer-motion"
import SignUp from "../../components/sign_up"
import SignIn from "../../components/sign_in"
import {useState} from 'react'


export default function Signing()
{
  enum E {SIGNIN, SIGNUP}
  const [auth, setAuth] = useState(E.SIGNUP);
  function switchPage()
  {
    setAuth(auth === E.SIGNUP ? E.SIGNIN : E.SIGNUP);
  }

  return (
    <div className="overflow-hidden">
    <AnimatePresence mode="wait">
    <motion.div
    key={auth}
    initial={{ x: 300, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: -300, opacity: 0 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div>
        {auth === E.SIGNUP && <SignUp onSubmit={()=>switchPage()}/>}
        {auth === E.SIGNIN && <SignIn onSubmit={()=>switchPage()}/>}
      </div>
      </motion.div>
      </AnimatePresence>
    </div>
  )
}
