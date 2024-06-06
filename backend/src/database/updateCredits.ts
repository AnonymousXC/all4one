import { PostgrestSingleResponse } from "@supabase/supabase-js";
import supabase from "../supabase";

interface Error {
    error: {
        details: string,
    },
}

async function updateCredits(uid: string, email: string, amount: number): Promise<PostgrestSingleResponse<null> | Error> {
    const initialAmount = parseFloat(await (await supabase.from('credits').select('credit').eq('id', uid).eq('email', email)).data![0].credit)

    if (isNaN(initialAmount) === false)
        amount = initialAmount + amount

    if (amount === null)
        return { error: { details: "Amount is null." } }

    const data = await supabase.from('credits').update({
        credit: amount,
    }).eq('id', uid).eq('email', email)

    return data;
}

export default updateCredits;