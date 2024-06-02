'use server'

import { UserResponse } from "@supabase/supabase-js";
import { createClient } from "./supabase"


async function getUser() : Promise<UserResponse> {
    const supabase = createClient()
    const user = await supabase.auth.getUser()
    return user;
}

export default getUser;