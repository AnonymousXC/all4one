import { PostgrestSingleResponse } from "@supabase/supabase-js";
import supabase from "../supabase";


async function updateCredits(uid : string, email : string, amount : number) : Promise<PostgrestSingleResponse<null>>
{
    const initialAmount = await (await supabase.from('credits').select('credit').eq('id', uid).eq('email', email)).data![0].credit
    amount = initialAmount + amount

    const data = await supabase.from('credits').update({
        credit: amount,
    }).eq('id', uid).eq('email', email)

    return data;
}

export default updateCredits;