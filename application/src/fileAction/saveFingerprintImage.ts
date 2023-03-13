var Jimp = require("jimp");

export async function saveFingerprintImage(buffer, fileName) {
  // Jimp read buffer and compress image
  await Jimp.read(buffer, (err, data) => {
    if (err) return false;
    data
      .resize(300, 300) // resize
      .quality(50) // set JPEG quality
      .write(fileName); // save

    return true;
  });
}