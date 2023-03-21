var Jimp = require("jimp");

export function saveFingerprintImage(buffer, fileName) {
  // Jimp read buffer and compress image
  let returnValue: boolean = true;
  Jimp.read(buffer, (err, data) => {
    if (err) { console.log('fail'); returnValue = false; }
    data
      .resize(300, 400) // resize
      .quality(60) // set JPEG quality
      .write(fileName); // save
    console.log('File name : ', fileName);
    returnValue = true;
  });
  return returnValue
}