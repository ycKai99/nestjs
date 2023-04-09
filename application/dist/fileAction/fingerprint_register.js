"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fingerprintRegister = void 0;
const constSetting_1 = require("../fileInterface/constSetting");
const uuid_1 = require("uuid");
const fingerprint_app_message_1 = require("./fingerprint_app_message");
const fingerprint_write_message_1 = require("./fingerprint_write_message");
var Jimp = require("jimp");
async function fingerprintRegister(fingerprintData, fingerprintTemplateData, messageNotificationData, messageData, fingerprintImageTotal) {
    let fileName = "";
    let fileCount = fingerprintImageTotal;
    let uuid = (0, uuid_1.v4)();
    let fpData = fingerprintData['fpid'].replace(/\n/g, "");
    let buffer = Buffer.from(fpData, 'base64');
    fileName = `${constSetting_1.IMAGE_FOLDER}image_${fileCount + 1}.${"jpeg"}`;
    console.log(fileName);
    let result = await Jimp.read(buffer)
        .then((data) => {
        data
            .resize(300, 400)
            .quality(60)
            .write(fileName);
        let messageNotification = (0, fingerprint_app_message_1.appMessage)(fileCount, "Registered fingerprint", uuid);
        let responseMessage = (0, fingerprint_app_message_1.handleResponseMessage)("Save image successful.", uuid);
        messageNotificationData.push(messageNotification);
        messageData.push(responseMessage);
        (0, fingerprint_write_message_1.fingerprintWriteMessage)(constSetting_1.MESSAGE_FOLDER_PATH, messageNotificationData);
        (0, fingerprint_write_message_1.fingerprintWriteMessage)(constSetting_1.RESPONSE_MESSAGE_FILE_PATH, messageData);
        (0, fingerprint_write_message_1.fingerprintWriteMessage)(constSetting_1.FINGERPRINT_TEMPLATE_FILE_PATH, fingerprintTemplateData);
        console.log('success');
    })
        .catch((err) => {
        let responseMessage = (0, fingerprint_app_message_1.handleResponseMessage)("Failed to save image.", uuid);
        messageData.push(responseMessage);
        (0, fingerprint_write_message_1.fingerprintWriteMessage)(constSetting_1.RESPONSE_MESSAGE_FILE_PATH, messageData);
        console.log('fail saved file');
        return "failed to save image";
    });
    return result;
}
exports.fingerprintRegister = fingerprintRegister;
//# sourceMappingURL=fingerprint_register.js.map