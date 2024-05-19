import { Socket } from "socket.io"
import { IdLanguageMap } from "./LanguageSetter"


const onDisconnect = function(this: Socket, data : any) {
    const socket = this
    // @ts-expect-error
    delete IdLanguageMap[socket.id]
    console.log(IdLanguageMap)
}

export default onDisconnect;