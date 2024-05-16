import { Socket } from "socket.io"

const emailLanguageMap = {}

const LanguageSelect = function(this : Socket, data : { language : string, email: any }) {
    const socket = this;
    // @ts-expect-error
    emailLanguageMap[socket.id] = data.language
    console.log(emailLanguageMap)
}

export default LanguageSelect;
export { emailLanguageMap };