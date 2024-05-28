import Peer, { MediaConnection } from "peerjs";

function makeVideoCall(peer: Peer, userID: string, selfVideo : any, otherVideo: any) {
    // @ts-expect-error
    var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    getUserMedia({ video: true, audio: false }, function (stream: any) {
        selfVideo.current.srcObject = stream;
        selfVideo.current.play()
        var call = peer?.call(userID, stream);
        call?.on('stream', function (remoteStream) {
            otherVideo.current.srcObject = remoteStream
            otherVideo.current?.play()
        });
    }, function (err: any) {
        console.log('Failed to get local stream', err);
    });
}

function receiveCall(peer: Peer , selfVideo : any, otherVideo : any) {
    peer.on('call', function (call: MediaConnection) {
        // @ts-expect-error
        var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        getUserMedia({ video: true, audio: false }, function (stream: any) {
            selfVideo.current.srcObject = stream;
            selfVideo.current?.play()
            call.answer(stream); // Answer the call with an A/V stream.
            call.on('stream', function (remoteStream) {
                otherVideo.current.srcObject = remoteStream
                otherVideo.current?.play()
            });
        }, function (err: any) {
            console.log('Failed to get local stream', err);
        });
    });
}

export { receiveCall, makeVideoCall }