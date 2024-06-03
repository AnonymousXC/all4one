import getUser from "@/database/getUser";
import { UserResponse } from "@supabase/supabase-js";
import { redirect } from "next/navigation";



async function Home() {

    const user = JSON.parse(await getUser()) as UserResponse;

    if(user.data.user === null)
        redirect('/login')
    else
        redirect('/user/dashboard')

    return (
        <div className="flex justify-center items-center h-screen">
            Loading...
        </div>
    )
}

export default Home;