"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fingerprintVerify = void 0;
const fs = require("graceful-fs");
const constSetting_1 = require("../fileInterface/constSetting");
function fingerprintVerify(verifyFpCount, fileNum) {
    let data = null;
    if (fileNum === 0) {
        data = "no data";
        console.log('no data');
    }
    else if (verifyFpCount < fileNum) {
        let imageData = fs.readFileSync(`${constSetting_1.IMAGE_FOLDER}image_${verifyFpCount + 1}.${"jpeg"}`);
        verifyFpCount++;
        console.log('count: ', verifyFpCount++);
        data = imageData.toString('base64');
    }
    else {
        verifyFpCount = 0;
        data = 'finished';
        console.log('finished');
    }
    return data;
}
exports.fingerprintVerify = fingerprintVerify;
//# sourceMappingURL=fingerprintVerify.js.map