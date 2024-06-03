'use server'
import { redirect } from "next/navigation"
import { createClient } from "./supabase"

async function recoverPassword(data : FormData) {
    const supabase = createClient()
    const email = data.get('email') as string

    const status = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: '/reset'
    })

    console.log(status)

    if(status.data)
        redirect('/reset')
}

export default recoverPassword;