"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fingerprintRegister = void 0;
const constSetting_1 = require("../fileInterface/constSetting");
const saveFingerprintImage_1 = require("./saveFingerprintImage");
async function fingerprintRegister(fingerprintData, fileNum) {
    let fileName = "";
    let result = fingerprintData['fpid'].replace(/\n/g, "");
    let buffer = Buffer.from(result, 'base64');
    if (fileNum !== 0) {
        fileName = `${constSetting_1.IMAGE_FOLDER}image_${fileNum + 1}.${"jpeg"}`;
    }
    else {
        fileName = 'images/image_1.jpeg';
    }
    if ((0, saveFingerprintImage_1.saveFingerprintImage)(buffer, fileName)) {
        return "Save image successful.";
    }
    else {
        return "Failed to save image.";
    }
}
exports.fingerprintRegister = fingerprintRegister;
//# sourceMappingURL=fingerprintRegister.js.map