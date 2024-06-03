'use server'
    
import { redirect } from "next/navigation";
import { createClient } from "./supabase";

async function resetPassword(data : FormData, code : string) {
    const supabase = createClient()
    const password = data.get('password') as string

    try {
        const authSigning = await supabase.auth.exchangeCodeForSession(code)
    
        if(authSigning.error)
            redirect(`/reset?message=${authSigning.error.message}`)

    } 
    catch(err) {
        redirect('/reset?message=Invalid auth code or link expired')
    }

    const status = await supabase.auth.updateUser({
        password: password
    })

    if(status.error)
        redirect(`/reset?message=${status.error.message}`)

    redirect('/reset?message=Password changed sucessfully.')
}

export default resetPassword;