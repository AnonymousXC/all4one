import { Socket } from "socket.io";
import supabase from "../supabase";

type Data = {
    id: string,
    email: string,
}

const addToTable = async function(this: Socket , { email, id } : Data) {
    await supabase.from('credits').insert({
        id,
        email,
        credit: 0,
    })
    console.log(`Added to table user id : ${id} with email : ${email}.`)
}

export default addToTable;