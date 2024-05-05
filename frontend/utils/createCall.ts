import generateRoomID from "@/helper/roomIDGenerator";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

function createCall(router : AppRouterInstance) {
    const roomID = generateRoomID()
    router.push('/call/' + roomID)
    console.log(roomID)
}

export default createCall;