"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveFingerprintData = void 0;
const fs = require("graceful-fs");
const constSetting_1 = require("../fileInterface/constSetting");
const fingerprint_data_encryption_1 = require("./fingerprint_data_encryption");
var verifyFpCount = 1;
function retrieveFingerprintData(fileNum) {
    let data = null;
    if (verifyFpCount < fileNum) {
        console.log('verifyFpCount is ', verifyFpCount);
        let imageData = fs.readFileSync(`${constSetting_1.IMAGE_FOLDER}image_${verifyFpCount}.${"jpeg"}`);
        verifyFpCount++;
        data = (0, fingerprint_data_encryption_1.dataEncryption)(imageData.toString('base64'));
    }
    else {
        verifyFpCount = 1;
        data = (0, fingerprint_data_encryption_1.dataEncryption)('finished');
        console.log('finished');
    }
    return data;
}
exports.retrieveFingerprintData = retrieveFingerprintData;
//# sourceMappingURL=fingerprint_retrieve_data.js.map