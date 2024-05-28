'use client'
import socket from '@/utils/Socket';
import createCall from '@/utils/createCall';
import createVideoCall from '@/utils/createVideoCall';
import { PhoneCall } from '@/utils/iconsExports'
import joinCall from '@/utils/joinCall';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function CallJoining() {

    const [ showNewCallMenu, setNewCallMenu ] = useState(false)
    const [ callID, setCallID ] = useState("")
    const router = useRouter()


    return (
        <>
            <div>
                <label htmlFor="name" className="block mb-2 text-base font-medium mt-4">Name</label>
                <input type="text" className="dropdown" placeholder="enter your name" />
            </div>
            <div className="flex flex-col-reverse md:flex-row gap-6 md:mt-6 mt-4">
                <div>
                    <button className="border px-6 rounded-2xl border-black flex gap-3 items-center min-h-12 w-full" onClick={() => setNewCallMenu(!showNewCallMenu)}>
                        <PhoneCall size={'20'} />
                        Create a new call
                    </button>
                    <div className={`${showNewCallMenu === true ? 'h-max' : 'h-0'} overflow-hidden transition-all rounded-2xl flex flex-col bg-slate-200 mt-3`}>
                        <button className='py-3 hover:bg-slate-900 hover:text-white transition-colors'
                        onClick={() => {
                            createCall(router)
                        }}>
                            Create voice call
                        </button>
                        <button className='py-3 hover:bg-slate-900 hover:text-white transition-colors'
                        onClick={() => {
                            createVideoCall(router)
                        }}>
                            Create video call
                        </button>
                    </div>
                </div>
                <div>
                    <label htmlFor="code" className="block md:hidden mb-2 text-base font-medium mt-4">Meeting code</label>
                    <div className="flex">
                        <input type="text" className="dropdown" placeholder="Enter the code" onChange={(e) => {
                            setCallID(e.currentTarget.value)
                        }} />
                        <button className="text-[#8C8C8C] px-8 hover:text-black" 
                        onClick={() => {
                            joinCall(router, callID)
                        }}>Join</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CallJoining;