import generateRoomID from "@/helper/roomIDGenerator";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

function createVideoCall(router : AppRouterInstance) {
    const roomID = generateRoomID()
    router.push('/video/' + roomID)
}

export default createVideoCall;