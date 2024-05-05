function getTimeNow() {
    var currentdate = new Date();
    var datetime = currentdate.getHours() + currentdate.getMinutes() + currentdate.getSeconds();
    return datetime;
}

export default getTimeNow;