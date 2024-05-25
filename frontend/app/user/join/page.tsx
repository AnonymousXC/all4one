import LanguageSelector from "@/components/global/Language/LanguageSelector";
import { PhoneCall } from '@/utils/iconsExports';

function Join() {
    return (
        <section className="flex justify-center items-center w-full md:h-[calc(100vh_-_80px)] bg-[#FBFCFF]">
            <div className="flex flex-col w-full h-full justify-start p-8 max-w-screen-xl gap-20 md:gap-2 max-h-[700px]">
                <div className="flex flex-col gap-1 mb-10">
                    <h1 className="font-bold text-3xl">Video calls and meetings made easier.</h1>
                    <p className="font-bold text-base text-secondary-text">Connect, collaborate, meet.</p>
                </div>
                <div>
                    <LanguageSelector />
                </div>
                <div>
                    <label htmlFor="name" className="block mb-2 text-base font-medium mt-4">Name</label>
                    <input type="text" className="dropdown" placeholder="enter your name" />
                </div>
                <div className="flex gap-6 mt-6">
                    <button className="border px-6 rounded-2xl border-black flex gap-3 items-center">
                        <PhoneCall size={'20'} />
                        Create a new call
                    </button>
                    <div>
                        <input type="text" className="dropdown" placeholder="Enter the code" />
                        <button className="text-[#8C8C8C] px-8">Join</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Join;