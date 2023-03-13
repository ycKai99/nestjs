var Jimp = require("jimp");

export function saveFingerprintImage(buffer,fileName) {
    // Jimp read buffer and compress image
    let returnValue:boolean = true;
    console.log('buffer is ',buffer)
    Jimp.read(buffer, (err, data) => {
      if (err) {console.log('fail');returnValue = false;}
      data
        .resize(300, 300) // resize
        .quality(30) // set JPEG quality
        .write(fileName); // save
        console.log('true : ',fileName)
        returnValue = true;
    });
    return returnValue
}