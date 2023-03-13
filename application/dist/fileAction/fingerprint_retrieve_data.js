"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveFingerprintData = void 0;
const fs = require("graceful-fs");
const constSetting_1 = require("../fileInterface/constSetting");
var verifyFpCount = 0;
function retrieveFingerprintData(fileNum) {
    let data = null;
    if (verifyFpCount < fileNum) {
        console.log('verifyFpCount is ', verifyFpCount);
        let imageData = fs.readFileSync(`${constSetting_1.IMAGE_FOLDER}image_${verifyFpCount + 1}.${"jpeg"}`);
        verifyFpCount++;
        data = imageData.toString('base64');
    }
    else {
        verifyFpCount = 0;
        data = 'finished';
        console.log('finished');
    }
    return data;
}
exports.retrieveFingerprintData = retrieveFingerprintData;
//# sourceMappingURL=fingerprint_retrieve_data.js.map