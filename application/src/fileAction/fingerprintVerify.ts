import fs = require('graceful-fs')
import { FILE_EXTENSION, IMAGE_FOLDER } from 'src/fileInterface/constSetting';

export function fingerprintVerify(verifyFpCount: number, fileNum: number) {

  let data = null;
  if (fileNum === 0) {
    data = "no data";
    console.log('no data');
  }
  else if (verifyFpCount < fileNum) {
    let imageData = fs.readFileSync(`${IMAGE_FOLDER}image_${verifyFpCount + 1}.${FILE_EXTENSION.JPEG}`);
    verifyFpCount++;
    data = imageData.toString('base64');
  }
  else {
    verifyFpCount = 0;
    data = 'finished';
    console.log('finished');
  }
  return data;
}