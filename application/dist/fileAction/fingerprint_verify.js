"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fingerprintVerify = void 0;
const fs = require("graceful-fs");
const constSetting_1 = require("../fileInterface/constSetting");
const fingerprint_data_encryption_1 = require("./fingerprint_data_encryption");
var verifyFpCount = 1;
function fingerprintVerify(fileNum, success) {
    let data = null;
    console.log('verifyFpCount is ', verifyFpCount);
    if (success === "match") {
        console.log('match');
        verifyFpCount = 1;
        return false;
    }
    if (fileNum === 0) {
        data = "no data";
    }
    else if (verifyFpCount < fileNum) {
        let imageData = fs.readFileSync(`${constSetting_1.IMAGE_FOLDER}image_${verifyFpCount}.${"jpeg"}`);
        verifyFpCount++;
        data = (0, fingerprint_data_encryption_1.dataEncryption)(imageData.toString('base64'));
    }
    else {
        verifyFpCount = 1;
        data = (0, fingerprint_data_encryption_1.dataEncryption)('finished');
        console.log('Not recognize');
    }
    return data;
}
exports.fingerprintVerify = fingerprintVerify;
//# sourceMappingURL=fingerprint_verify.js.map