"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fingerprintVerify = void 0;
const fs = require("graceful-fs");
const constSetting_1 = require("../fileInterface/constSetting");
var verifyFpCount = 0;
function fingerprintVerify(fileNum, success) {
    let data = null;
    console.log('verifyFpCount is ', verifyFpCount);
    if (success === "match") {
        console.log('match');
        verifyFpCount = 0;
        return false;
    }
    if (fileNum === 0) {
        data = "no data";
    }
    else if (verifyFpCount < fileNum) {
        let imageData = fs.readFileSync(`${constSetting_1.IMAGE_FOLDER}image_${verifyFpCount + 1}.${"jpeg"}`);
        verifyFpCount++;
        data = imageData.toString('base64');
    }
    else {
        verifyFpCount = 0;
        data = 'finished';
        console.log('Not recognize');
    }
    return data;
}
exports.fingerprintVerify = fingerprintVerify;
//# sourceMappingURL=fingerprint_verify.js.map