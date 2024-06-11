'use client'
import createCheckout from "@/stripe/createCheckout";
import Box from "./Box";
import ToastStatus from "./useToast";
import getCredits from "@/database/getCredits";
import socket from "@/utils/Socket";
import { useEffect, useState } from "react";
import getUser from "@/database/getUser";
import { UserResponse } from "@supabase/supabase-js";
import { useSearchParams } from "next/navigation";


function Credit() {

    const [credit, setCredit] = useState<number>()
    const searchParams = useSearchParams()
    const message = searchParams.get('message') || ''

    socket.once('connect', async () => {

        const credits = await getCredits()
        const user = JSON.parse(await getUser()) as UserResponse

        if (credits.data?.length === 0) {
            socket.emit('add-user-credit-table', { id: user.data.user?.id, email: user.data.user?.email })
            setCredit(0)
        }
        else {
            setCredit(credits.data![0].credit)
        }
    })


    useEffect(() => {

        socket.connect()
        
        return () => {
            socket.disconnect()
        }
    }, [])

    return (
        <section className="flex justify-center items-center w-full md:h-[calc(100vh_-_80px)] bg-[#FBFCFF]">
            <div className="flex flex-col w-full h-full justify-start p-8 max-w-screen-xl gap-2 max-h-[700px]">
                <div className="flex flex-col gap-1 mb-4 md:mb-10">
                    <h1 className="font-bold text-3xl">Credits</h1>
                    <p className="font-bold text-base text-secondary-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
                <div className="flex h-full gap-6 flex-wrap">
                    <Box>
                        <div>
                            <p className="text-center"> {credit !== undefined ? credit : 'Loading...'} </p>
                            Credits
                        </div>
                    </Box>
                    <Box>
                        <div>
                            <form className="flex flex-col justify-center items-center gap-3">
                                <input name="amount" placeholder="Enter amount to add" type="number" className="p-3 bg-slate-100 rounded-2xl" />
                                <button formAction={createCheckout} type="submit" className="p-2 rounded-2xl transition-all hover:bg-black hover:text-white">
                                    Add balance
                                </button>
                            </form>
                        </div>
                    </Box>
                </div>
            </div>
            <ToastStatus message={message} />
        </section>
    )
}

export default Credit;