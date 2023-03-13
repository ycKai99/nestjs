import fs = require('graceful-fs')
import { FILE_EXTENSION, IMAGE_FOLDER } from 'src/fileInterface/constSetting';

var verifyFpCount: number = 0; // used to store current turn of result

export function fingerprintVerify(fileNum: number, success?) {
  let data: string = null;
  console.log('verifyFpCount is ', verifyFpCount)
  if (success === "match") {
    console.log('match')
    verifyFpCount = 0;
    return false;
  }
  if (fileNum === 0) {
    data = "no data";
  } // if fileNum is 0, then file is no data for verification
  else if (verifyFpCount < fileNum) { // else if, loop all fingerprint image to do the verification
    let imageData = fs.readFileSync(`${IMAGE_FOLDER}image_${verifyFpCount + 1}.${FILE_EXTENSION.JPEG}`);
    verifyFpCount++;
    data = imageData.toString('base64');
  }
  else {
    verifyFpCount = 0; data = 'finished'; console.log('Not recognize')
  } // else, loop finished all the fingerprint image
  return data;
}