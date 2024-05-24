import Image from "next/image";

type Props = {
    heading: string,
    image: string
}

function CallBox({ heading, image } : Props) {
    return (
        <div className="flex flex-col gap-4 bg-main-purple items-center pb-5 rounded-t-2xl min-h-[320px] rounded-b-2xl  border border-[rgba(0, 0, 0, 0.1)] transition-all cursor-pointer md:hover:scale-110 hover:scale-105 hover:drop-shadow-lg">
            <Image src={image} width={275} height={160} alt="image" className="w-[275px] h-[160px] rounded-2xl  border border-[rgba(0, 0, 0, 0.1)] object-cover" />
            <h3 className="text-xl max-w-32 text-center">
                {heading}
            </h3>
        </div>
    )
}

export default CallBox;