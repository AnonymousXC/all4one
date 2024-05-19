import { Socket } from "socket.io"

const IdLanguageMap = {}

const LanguageSelect = function(this : Socket, data : { language : string, email: any }) {
    const socket = this;
    // @ts-expect-error
    IdLanguageMap[socket.id] = data.language
    console.log(IdLanguageMap)
}

export default LanguageSelect;
export { IdLanguageMap };