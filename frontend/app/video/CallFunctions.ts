import Peer, { MediaConnection } from "peerjs";
import { toast } from "react-toastify";

function makeVideoCall(peer: Peer, userID: string, selfVideo : any, otherVideo: any) {

    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
    })
    .then((stream : MediaStream) => {
        if(stream) window.setCamera(true)
        selfVideo.current.srcObject = stream;
        selfVideo.current.play()
        window.selfStream = stream
        var call = peer?.call(userID, stream);
        call?.on('stream', function (remoteStream : MediaStream) {
            otherVideo.current.srcObject = remoteStream
            otherVideo.current?.play()
            window.setVideoCallConnection(true)
        });
        call.on('error', (err) => {
            toast.error(err.message)
        })
    })
    .catch((err) => {
        window.setVideoCallConnection(false)
        toast.error('Failed to get local stream. Please allow camera.' + err);
    })
}

function receiveCall(peer: Peer , selfVideo : any, otherVideo : any) {
    peer.on('call', function (call: MediaConnection) {
        call.on('stream', function (remoteStream) {
            otherVideo.current.srcObject = remoteStream
            otherVideo.current?.play()
        });
        call.on('error', (err) => {
            toast.error(err.message)
        })
        // @ts-expect-error
        var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        getUserMedia({ video: true, audio: false }, function (stream: any) {
            if(stream) window.setCamera(true)
            selfVideo.current.srcObject = stream;
            selfVideo.current?.play()
            call.answer(stream); // Answer the call with an A/V stream.
            window.setVideoCallConnection(true)
        }, function (err: any) {
            window.setVideoCallConnection(false)
            toast.error('Failed to get local stream. Please allow camera.' + err);
        });
    });
}

export { receiveCall, makeVideoCall }