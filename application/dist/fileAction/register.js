"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fingerprintRegister = void 0;
const const_setting_1 = require("../FileInterface/const_setting");
const uuid_1 = require("uuid");
const generate_message_1 = require("./generate_message");
var Jimp = require("jimp");
async function fingerprintRegister(fingerprintData, fingerprintTemplateData, messageNotificationData, messageData, fingerprintImageTotal, locationTagData, writeData, addTag) {
    let fileName = "";
    let fileCount = fingerprintImageTotal;
    let uuid = (0, uuid_1.v4)();
    let fpData = fingerprintData['fpid'].replace(/\n/g, "");
    let buffer = Buffer.from(fpData, 'base64');
    fileName = `${const_setting_1.IMAGE_FOLDER}${uuid}.${"png"}`;
    let result = await Jimp.read(buffer)
        .then((data) => {
        data
            .resize(300, 400)
            .quality(50);
        let messageNotification = (0, generate_message_1.appMessage)(fileCount, "Registered fingerprint", uuid);
        let responseMessage = (0, generate_message_1.handleResponseMessage)("Save image successful.", uuid);
        let fingerprintTemplateMessage = (0, generate_message_1.zktecoFpMessage)(fingerprintData['fptemplate'], fileName, uuid);
        let locationTag = (0, generate_message_1.tagMessage)(uuid);
        writeData(const_setting_1.FPEVENT.NOTIF_MSG, messageNotificationData, messageNotification);
        writeData(const_setting_1.FPEVENT.RES_MSG, messageData, responseMessage);
        writeData(const_setting_1.FPEVENT.FP_TPL_MSG, fingerprintTemplateData, fingerprintTemplateMessage);
        addTag(const_setting_1.FPEVENT.LOC_TAG, locationTagData, locationTag);
        let dataArr = [];
        dataArr.push(fingerprintTemplateMessage, messageNotification, responseMessage, locationTag);
        console.log('success saved image');
        return dataArr;
    })
        .catch((err) => {
        let responseMessage = (0, generate_message_1.handleResponseMessage)("Failed to save image.", uuid);
        messageData.push(responseMessage);
        writeData(const_setting_1.FPEVENT.RES_MSG, messageData);
        console.log('fail saved file : ', err);
        return 0;
    });
    return Promise.resolve(result);
}
exports.fingerprintRegister = fingerprintRegister;
//# sourceMappingURL=register.js.map