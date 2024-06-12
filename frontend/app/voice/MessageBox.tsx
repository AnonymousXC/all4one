

type Props = {
    self: boolean,
    text: string,
}

function MessageBox({ self, text }: Props) {
    return (
        <div className={`flex flex-col gap-1 px-6 w-max py-3 rounded-2xl max-w-[90%] md:max-w-[700px] ${self === true ? "self-end bg-[#362360]" : "self-start bg-white"}`}>
            <p className={`text-sm ${self === true ? "text-slate-300 text-end" : "text-start text-slate-600"}`}> {self === true ? "You" : "User 2"} </p>
            <p className={`${self === true ? "text-white text-end" : ""}`}> {text} </p>
        </div>
    )
}

export default MessageBox;