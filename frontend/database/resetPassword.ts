'use server'
    
import { createClient } from "./supabase";

async function resetPassword(data : FormData) : Promise<string> {
    const supabase = createClient()
    const password = data.get('password') as string
    const status = await supabase.auth.updateUser({
        password: password
    })

    return JSON.stringify(status);
}

export default resetPassword;