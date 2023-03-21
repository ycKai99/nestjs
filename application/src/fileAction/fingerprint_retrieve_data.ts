import fs = require('graceful-fs')
import { FILE_EXTENSION, IMAGE_FOLDER } from 'src/fileInterface/constSetting';
import { dataEncryption } from 'src/fileAction/fingerprint_data_encryption';

var verifyFpCount: number = 0;

export function retrieveFingerprintData(fileNum: number) {
    let data: string = null;
    if (verifyFpCount < fileNum) { // else if, loop all fingerprint image to do the verification
        console.log('image send: ', verifyFpCount + 1)
        let imageData = fs.readFileSync(`${IMAGE_FOLDER}image_${verifyFpCount + 1}.${FILE_EXTENSION.JPEG}`);
        verifyFpCount++;
        data = dataEncryption(imageData.toString('base64'));
    }
    else {
        verifyFpCount = 0;
        data = dataEncryption('finished');
        console.log('finished')
    } // else, loop finished all the fingerprint image
    return data;
}