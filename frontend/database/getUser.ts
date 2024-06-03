'use server'

import { AuthError, UserResponse } from "@supabase/supabase-js";
import { createClient } from "./supabase"


async function getUser() : Promise<string> {
    const supabase = createClient()
    const user = await supabase.auth.getUser()
    return JSON.stringify(user);
}

export default getUser;