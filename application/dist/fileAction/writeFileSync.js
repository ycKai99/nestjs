"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFileSync = void 0;
const fs = require("graceful-fs");
const constSetting_1 = require("../fileInterface/constSetting");
const appMessage_1 = require("./appMessage");
const uuid_1 = require("uuid");
const axios_1 = require("axios");
async function writeFileSync(fingerprintData, fileData, messageData) {
    let uuid = (0, uuid_1.v4)();
    let messageDetails = (0, appMessage_1.appMessage)(fileData, uuid);
    let regFingerprint = (0, appMessage_1.zktecoFpMessage)(fingerprintData, uuid);
    fileData.push(regFingerprint);
    messageData.push(messageDetails);
    try {
        await fs.writeFileSync(constSetting_1.FINGERPRINT_FOLDER_PATH, JSON.stringify(fileData, null, 4));
        await fs.writeFileSync(constSetting_1.MESSAGE_FOLDER_PATH, JSON.stringify(messageData, null, 4));
        axios_1.default.post('http://192.168.100.46:5050/registerfp', {
            data: regFingerprint,
            message: messageDetails
        })
            .then(res => console.log("res is ", res.data))
            .catch(err => console.log("error is ", err));
        console.log('file saved');
    }
    catch (e) {
        console.log('error is ', e);
    }
}
exports.writeFileSync = writeFileSync;
//# sourceMappingURL=writeFileSync.js.map