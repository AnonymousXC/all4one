'use client'

import { useRouter } from "next/navigation";


function Home() {

    const router = useRouter()

    return (
        <div>
            <button onClick={() => {
                router.push('/join')
            }}>
                Click to go to join voice call
            </button>
            <br />
            <br />
            <button onClick={() => {
                router.push('/user/dashboard')
            }}>
                Click to go to dashboard
            </button>
        </div>
    )
}

export default Home;