import getTimeNow from "./getTime";
const fs = require('fs')

const saveRecording = async (audioBlob: any, fileName: string, folder: string) => {
    fileName = fileName + getTimeNow() + ".mp3"
    const folderName = `./${folder}/${fileName}`

    const writableStream = fs.createWriteStream(folderName);
    writableStream.write(audioBlob);
    return folderName;
}

export default saveRecording;