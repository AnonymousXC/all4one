'use client'
import login from "@/database/login"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


function SubmitButton() {

    const router = useRouter()

    return (
        <button
            formAction={async (data: FormData) => {
                toast.info("Processing your request...", { position: "top-right", autoClose: 1000 })
                const status = JSON.parse(await login(data))
                if (status.error) {
                    toast.error(`Error logging into account : ${status.error?.code}`)
                }
                else {
                    toast.success("Logged in successfully.")
                    router.push('/user/dashboard')
                }

            }}
            type="submit"
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
            Login
        </button>
    )
}

export default SubmitButton;