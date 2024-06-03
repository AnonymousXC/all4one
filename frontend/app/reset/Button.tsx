'use client'
import resetPassword from '@/database/resetPassword'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/ReactToastify.css'

function SubmitButton({ params } : { params : any }) {

    useEffect(() => {
        if(!params.message) return
        if(params.message.includes('sucessfully'))
            toast.success(params.message)
        else
            toast.error(params.message)
    }, [params.message])

    return (
        <button className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            formAction={async (data: FormData) => {
                const passwod = data.get('password')
                const confirmPassword = data.get('confirm-password')
                if (passwod !== confirmPassword) {
                    toast.warn('Password do not match.')
                    return
                }

                await resetPassword(data, params.code)
            }}
        >Reset passwod</button>
    )
}

export default SubmitButton;