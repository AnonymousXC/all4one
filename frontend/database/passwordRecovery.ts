'use server'
import { redirect } from "next/navigation"
import { createClient } from "./supabase"

async function recoverPassword(data : FormData) {
    const supabase = createClient()
    const email = data.get('email') as string

    const status = await supabase.auth.resetPasswordForEmail(email)

    if(status.data)
        redirect('/recover/success')
    else
        redirect('/recover/error')
}

export default recoverPassword;