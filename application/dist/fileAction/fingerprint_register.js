"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fingerprintRegister = void 0;
const constSetting_1 = require("../fileInterface/constSetting");
const fingerprint_save_image_1 = require("./fingerprint_save_image");
const uuid_1 = require("uuid");
const fingerprint_app_message_1 = require("./fingerprint_app_message");
const fs = require("graceful-fs");
function fingerprintRegister(fingerprintData, fileNum, messageNotificationData, messageData) {
    let fileName = "";
    let fileCount = fileNum ? fileNum : 0;
    let uuid = (0, uuid_1.v4)();
    let result = fingerprintData['fpid'].replace(/\n/g, "");
    let buffer = Buffer.from(result, 'base64');
    if (fileCount !== 0) {
        fileName = `${constSetting_1.IMAGE_FOLDER}image_${fileCount + 1}.${"jpeg"}`;
    }
    else {
        fileName = 'images/image_1.jpeg';
    }
    let saveImage = (0, fingerprint_save_image_1.saveFingerprintImage)(buffer, fileName);
    if (saveImage) {
        let messageNotification = (0, fingerprint_app_message_1.appMessage)(fileCount, "Registered fingerprint", uuid);
        let messageOutput = (0, fingerprint_app_message_1.returnMessage)("Save image successful.", uuid);
        messageNotificationData.push(messageNotification);
        messageData.push(messageOutput);
        fs.writeFileSync(constSetting_1.MESSAGE_FOLDER_PATH, JSON.stringify(messageNotificationData, null, 4));
        fs.writeFileSync(constSetting_1.ERROR_MESSAGE_FOLDER_PATH, JSON.stringify(messageData, null, 4));
        console.log("Save image successful.");
        return "Save image successful.";
    }
    else {
        return "Failed to save image.";
    }
}
exports.fingerprintRegister = fingerprintRegister;
//# sourceMappingURL=fingerprint_register.js.map