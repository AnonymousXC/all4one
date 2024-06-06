'use server'
import socket from "@/utils/Socket";
import { createClient } from "./supabase";
import { PostgrestSingleResponse } from "@supabase/supabase-js";


async function getCredits() : Promise<PostgrestSingleResponse<any[]>> {

    const supabase = createClient()
    const user = await supabase.auth.getUser()

    const credit = await supabase.from('credits').select('*').eq('id', user.data.user?.id)

    return credit;

}

export default getCredits;