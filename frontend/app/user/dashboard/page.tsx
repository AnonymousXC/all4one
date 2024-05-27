'use client'
import { useRouter } from "next/navigation";
import CallBox from "./CallBox";


function Dashboard() {

  const router = useRouter()

  return (
    <section className="flex justify-center items-center w-full md:h-[calc(100vh_-_80px)] bg-[#FBFCFF]">
      <div className="flex flex-col justify-between w-full h-full p-8 max-w-screen-xl gap-20 md:gap-2 max-h-[700px]">
        <div className="flex flex-col gap-1">
          <h1 className="font-bold text-3xl">Dashboard</h1>
          <p className="font-bold text-base text-secondary-text">Hello Josh!</p>
        </div>
        <div className="w-full md:mx-6">
          <div className="bg-white border border-[rgba(0, 0, 0, 0.1)] rounded-2xl px-4 py-8">
              <h2 className="font-bold text-lg">Please Select your Chatroom.</h2>
              <div className="flex flex-col gap-8 mt-8 w-full justify-center items-center md:flex-row">
                <CallBox heading="Real time Telephone" image="/images/image1.jpg" onClick={() => { router.push('/user/join') }} />
                <CallBox heading="Real time Video" image="/images/image2.jpg" onClick={() => { router.push('/user/join') }} />
                <CallBox heading="Real time Physical" image="/images/image3.jpg" onClick={() => { router.push('/user/live') }} />
              </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Dashboard;