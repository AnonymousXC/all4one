import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

function joinVideoCall(router : AppRouterInstance, callID : string) {
    router.push('/video/' + callID)
}

export default joinVideoCall;