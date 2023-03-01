"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFileSync = void 0;
const fs = require("graceful-fs");
const constSetting_1 = require("../fileInterface/constSetting");
const appMessage_1 = require("./appMessage");
const readFileSync_1 = require("./readFileSync");
async function writeFileSync(fingerprintData, fileData) {
    console.log('data is ', fingerprintData);
    console.log('data is ', fingerprintData['fpid']);
    let readMessage = await (0, readFileSync_1.readFileData)(constSetting_1.message_full_path);
    let messageDetails = (0, appMessage_1.appMessage)(fileData);
    let regFingerprint = {
        fpid: fingerprintData['fpid'],
        registeredDate: new Date,
        operation: 'Register fingerprint',
        vendor: 'ZKTeco'
    };
    fileData.push(regFingerprint);
    readMessage.push(messageDetails);
    try {
        console.log('file data is ', fileData);
        fs.writeFileSync(constSetting_1.data_full_path, JSON.stringify(fileData, null, 4));
        fs.writeFileSync(constSetting_1.message_full_path, JSON.stringify(readMessage, null, 4));
        console.log('file saved');
    }
    catch (e) {
        console.log('error is ', e);
    }
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');
        const second = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }
}
exports.writeFileSync = writeFileSync;
//# sourceMappingURL=writeFileSync.js.map