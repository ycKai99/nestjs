import fs = require('graceful-fs')
import { ERROR_MESSAGE, FILE_EXTENSION, IMAGE_FOLDER, SUCCESS_MESSAGE } from 'src/fileInterface/constSetting';
import { saveFingerprintImage } from './saveFingerprintImage';

export async function fingerprintRegister(fingerprintData: string, fileNum: number) {

        let fileName: string = "";
        let result = fingerprintData['fpid'].replace(/\n/g, "");
        let buffer = Buffer.from(result, 'base64');

        // let date = new Date()
        // let title = "FP_"
        // let filename = title+date.getFullYear()+"_"+(date.getMonth()+1).toString().padStart(2,'0')+"_"+date.getDate().toString().padStart(2,'0')+"_"+date.getHours().toString().padStart(2,'0')+date.getMinutes().toString().padStart(2,'0')+date.getSeconds().toString().padStart(2,'0')+".jpeg";

        if (fileNum !== 0) { fileName = `${IMAGE_FOLDER}image_${fileNum + 1}.${FILE_EXTENSION.JPEG}`; }
        else { fileName = 'images/image_1.jpeg'; }

        if (saveFingerprintImage(buffer, fileName)) { return SUCCESS_MESSAGE.SUCCESS_SAVE_IMAGE; }
        else { return ERROR_MESSAGE.FAILED_SAVE_IMAGE; }
}