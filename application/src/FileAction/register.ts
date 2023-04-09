import { ERROR_MESSAGE, FILE_EXTENSION, IMAGE_FOLDER, SUCCESS_MESSAGE, FPEVENT } from 'src/FileInterface/const_setting';
import { v4 as uuidv4 } from 'uuid';
import { appMessage, handleResponseMessage, tagMessage, zktecoFpMessage } from './generate_message';

var Jimp = require("jimp");

export async function fingerprintRegister(fingerprintData, fingerprintTemplateData, messageNotificationData, messageData, fingerprintImageTotal, locationTagData, writeData, addTag) {
  // fingerprintWriteMessage("localStorage/testing.txt",fingerprintData['fpid']);
  let fileName: string = "";
  let fileCount = fingerprintImageTotal;
  let uuid = uuidv4(); // create uuid v4
  let fpData: string = fingerprintData['fpid'].replace(/\n/g, ""); // remove \n character
  let buffer = Buffer.from(fpData, 'base64');
  fileName = `${IMAGE_FOLDER}${uuid}.${FILE_EXTENSION.PNG}`; // file name
  let result = await Jimp.read(buffer)
    .then((data) => {
      data
        .resize(300, 400) // resize
        .quality(50) // set JPEG quality
        .write(fileName); // save

      let messageNotification = appMessage(fileCount, "Registered fingerprint", uuid); // create a notification message
      let responseMessage = handleResponseMessage(SUCCESS_MESSAGE.SUCCESS_SAVE_IMAGE, uuid); // create a successful message
      let fingerprintTemplateMessage = zktecoFpMessage(fingerprintData['fptemplate'], fileName, uuid);
      let locationTag = tagMessage(uuid);

      writeData(FPEVENT.NOTIF_MSG, messageNotificationData, messageNotification);
      writeData(FPEVENT.RES_MSG, messageData, responseMessage); // write the notification message into the file
      writeData(FPEVENT.FP_TPL_MSG, fingerprintTemplateData, fingerprintTemplateMessage);
      addTag(FPEVENT.LOC_TAG, locationTagData, locationTag);

      let dataArr = [];
      dataArr.push(fingerprintTemplateMessage, messageNotification, responseMessage, locationTag);
      console.log('success saved image');
      return dataArr;
    })
    .catch((err) => {
      let responseMessage = handleResponseMessage(ERROR_MESSAGE.FAILED_SAVE_IMAGE, uuid);
      messageData.push(responseMessage);
      writeData(FPEVENT.RES_MSG, messageData);// write the successful message into the file
      console.log('fail saved file : ', err);
      return 0;
    })
  return Promise.resolve(result);
}
