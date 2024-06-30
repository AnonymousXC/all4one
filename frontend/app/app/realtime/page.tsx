import getUser from "@/database/getUser";
import RealtimeClientWrapper from "./ClientWrapper";
import { UserResponse } from "@supabase/supabase-js";
import { redirect } from "next/navigation";


async function Realtime() {

    const user = JSON.parse(await getUser()) as UserResponse

    if(user.data.user === null)
        redirect('/login')

    return (
        <>
            <RealtimeClientWrapper />            
        </>
    )
}

export default Realtime;