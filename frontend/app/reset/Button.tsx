'use client'
import resetPassword from '@/database/resetPassword'
import { UserResponse } from '@supabase/supabase-js'
import { toast } from 'react-toastify'
import 'react-toastify/ReactToastify.css'

function SubmitButton() {
    return (
        <button className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            formAction={async (data: FormData) => {
                const passwod = data.get('password')
                const confirmPassword = data.get('confirm-password')
                if (passwod !== confirmPassword) {
                    toast.warn('Password do not match.')
                    return
                }

                const status = JSON.parse(await resetPassword(data)) as UserResponse
                console.log(status)
                if(status.error) {
                    toast.error("Error changing password.")
                    return;
                }
                toast.success("Password changed successfully.")
            }}
        >Reset passwod</button>
    )
}

export default SubmitButton;