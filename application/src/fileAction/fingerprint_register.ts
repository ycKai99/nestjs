import { ERROR_MESSAGE, ERROR_MESSAGE_FOLDER_PATH, FILE_EXTENSION, FINGERPRINT_FOLDER_PATH, IMAGE_FOLDER, MESSAGE_FOLDER_PATH, SUCCESS_MESSAGE } from 'src/fileInterface/constSetting';
import { saveFingerprintImage } from './fingerprint_save_image';
import { v4 as uuidv4 } from 'uuid';
import { appMessage, returnMessage } from './fingerprint_app_message';
import fs = require('graceful-fs');
import { fingerprintWriteMessage } from './fingerprint_write_message';

export function fingerprintRegister(fingerprintData: string, fileNum: number, messageNotificationData, messageData) {

  let fileName: string = "";
  let fileCount = fileNum ? fileNum : 0;
  let uuid = uuidv4(); // create uuid v4
  let result: string = fingerprintData['fpid'].replace(/\n/g, ""); // remove \n character
  let buffer = Buffer.from(result, 'base64');

  // let date = new Date()
  // let title = "FP_"
  // let filename = title+date.getFullYear()+"_"+(date.getMonth()+1).toString().padStart(2,'0')+"_"+date.getDate().toString().padStart(2,'0')+"_"+date.getHours().toString().padStart(2,'0')+date.getMinutes().toString().padStart(2,'0')+date.getSeconds().toString().padStart(2,'0')+".jpeg";

  if (fileCount !== 0) {
    fileName = `${IMAGE_FOLDER}image_${fileCount + 1}.${FILE_EXTENSION.JPEG}`;
  } // file name
  else {
    fileName = 'images/image_1.jpeg';
  }

  let saveImage = saveFingerprintImage(buffer, fileName)

  if (saveImage) { // if save image successful
    let messageNotification = appMessage(fileCount, "Registered fingerprint", uuid); // create a notification message
    let messageOutput = returnMessage(SUCCESS_MESSAGE.SUCCESS_SAVE_IMAGE, uuid); // create a successful message

    messageNotificationData.push(messageNotification);
    messageData.push(messageOutput);

    fs.writeFileSync(MESSAGE_FOLDER_PATH, JSON.stringify(messageNotificationData, null, 4)); // write the notification message into the file
    fs.writeFileSync(ERROR_MESSAGE_FOLDER_PATH, JSON.stringify(messageData, null, 4)); // write the successful message into the file
    console.log(SUCCESS_MESSAGE.SUCCESS_SAVE_IMAGE)

    return SUCCESS_MESSAGE.SUCCESS_SAVE_IMAGE;
  }
  else { return ERROR_MESSAGE.FAILED_SAVE_IMAGE; }
}