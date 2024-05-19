'use client'
import LanguageSelector from "@/components/LanguageSelector";
import socket from "@/utils/Socket";
import createCall from "@/utils/createCall";
import joinCall from "@/utils/joinCall";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Home() {

  const router = useRouter()
  const [callID, setCallID] = useState("")

  useEffect(() => {
    socket.connect()
  })

  return (
    <main className="w-full h-screen flex justify-center items-center px-6">
      <div className="w-full max-w-[500px]">
        <div className="flex gap-3">
          <button type="button" className="default-btn" onClick={() => { joinCall(router, callID) }}>Join a Call</button>
          <input type="text" className="default-input" placeholder="xysbadfisudfni" required onChange={(e) => { setCallID(e.currentTarget.value) }} />
        </div>
        <div className="flex gap-3">
          <button type="button" className="default-btn flex-1" onClick={() => { createCall(router) }}>Create a new Call</button>
        </div>
        <LanguageSelector />
      </div>
    </main>
  )
}

export default Home;