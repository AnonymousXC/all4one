import createCheckout from "@/stripe/createCheckout";
import Box from "./Box";
import { toast } from "react-toastify";
import ToastStatus from "./useToast";


function Credit({ searchParams } : { searchParams : any }) {

    return (
        <section className="flex justify-center items-center w-full md:h-[calc(100vh_-_80px)] bg-[#FBFCFF]">
            <div className="flex flex-col w-full h-full justify-start p-8 max-w-screen-xl gap-2 max-h-[700px]">
                <div className="flex flex-col gap-1 mb-4 md:mb-10">
                    <h1 className="font-bold text-3xl">Credits</h1>
                    <p className="font-bold text-base text-secondary-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
                <div className="flex h-full gap-6">
                    <Box>
                        <div>
                            <p className="text-center">0</p>
                            Credits
                        </div>
                    </Box>
                    <Box>
                        <div>
                            <form className="flex flex-col justify-center items-center gap-3">
                                <input name="amount" placeholder="Enter amount to add" type="number" className="p-3 bg-slate-100 rounded-2xl" />
                                <button formAction={createCheckout} type="submit" className="p-2 rounded-2xl transition-all hover:bg-black hover:text-white">
                                    Add balance
                                </button>
                            </form>
                        </div>
                    </Box>
                </div>
            </div>
            <ToastStatus message={searchParams.message || ''} />
        </section>
    )
}

export default Credit;