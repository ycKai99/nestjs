"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFileSync = void 0;
const fingerprint_app_message_1 = require("./fingerprint_app_message");
const uuid_1 = require("uuid");
async function writeFileSync(fingerprintData, fileData, messageData) {
    let uuid = (0, uuid_1.v4)();
    let messageDetails;
    let regFingerprint = (0, fingerprint_app_message_1.zktecoFpMessage)(fingerprintData, uuid);
    console.log('file data', fileData);
    try {
        console.log('file saved');
    }
    catch (e) {
        console.log('error is ', e);
    }
}
exports.writeFileSync = writeFileSync;
//# sourceMappingURL=writeFileSync.js.map