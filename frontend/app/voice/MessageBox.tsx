

type Props = {
    self: boolean,
    text: string,
}

function MessageBox({ self, text }: Props) {
    return (
        <div className="flex flex-col gap-1 px-10">
            <div className="flex gap-2 items-center">
                <img src="https://avatars3.githubusercontent.com/u/100200?s=460&v=4" className="w-10 h-10 rounded-full"></img>
                <p className="text-[#8C8C8C]"> { self === true ? "Sophia" : "Josh" } </p>
            </div>
            <p className="px-6"> {text} </p>
        </div>
    )
}

export default MessageBox;