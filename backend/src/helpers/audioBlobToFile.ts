import getTimeNow from "./getTime";
const fs = require('fs')
const path = require('path')

const saveRecording = async (audioBlob: any, fileName: string, folder: string) => {
    console.log("Saving file.")
    fileName = fileName + getTimeNow() + ".mp3"
    const folderName = path.join(__dirname, "../", "../" , folder, fileName)
    
    const writableStream = fs.createWriteStream(folderName);
    writableStream.write(audioBlob);
    fileName = "/" + fileName
    const folderPath = folderName;
    console.log("Saved file successfully/")
    return { fileName, folderPath};
}

export default saveRecording;