import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

function joinCall(router : AppRouterInstance, callID : string) {
    router.push('/call/' + callID)
}

export default joinCall;