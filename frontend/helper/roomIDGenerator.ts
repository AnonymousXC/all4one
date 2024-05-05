function generateRoomID() {
    // I generate the UID from two parts here 
    // to ensure the random number provide enough bits.
    var fp = (Math.random() * 46656) | 0
    var sp = (Math.random() * 46656) | 0
    var fprad = ("000" + fp.toString(36)).slice(-3) ;
    var sprad = ("000" + fp.toString(36)).slice(-3);
    return fprad + sprad;
}

export default generateRoomID;