'use client'
import signup from "@/database/signUp";
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


function SubmitButton() {

    const router = useRouter()

    return (
        <button
            formAction={async (data: FormData) => {
                toast.info("Processing your request...", { position: "top-right", autoClose: 1000 })
                const status = JSON.parse(await signup(data))
                if (status.error) {
                    toast.error(`Error creating an account : ${status.error.name}`)
                }
                else {
                    toast.success("Account created successfully.")
                    router.push('/user/dashboard')
                }

            }}
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
            Sign Up
        </button>
    )
}

export default SubmitButton;