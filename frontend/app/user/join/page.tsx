import LanguageSelector from "@/components/global/Language/LanguageSelector";
import CallJoining from "./JoinCall";

function Join() {
    return (
        <section className="flex justify-center items-center w-full md:h-[calc(100vh_-_80px)] bg-[#FBFCFF]">
            <div className="flex flex-col w-full h-full justify-start p-8 max-w-screen-xl gap-2 max-h-[700px]">
                <div className="flex flex-col gap-1 mb-4 md:mb-10">
                    <h1 className="font-bold text-3xl">Video calls and meetings made easier.</h1>
                    <p className="font-bold text-base text-secondary-text">Connect, collaborate, meet.</p>
                </div>
                <div>
                    <LanguageSelector />
                </div>
                <CallJoining />
            </div>
        </section>
    )
}

export default Join;