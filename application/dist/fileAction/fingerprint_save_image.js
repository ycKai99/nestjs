"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveFingerprintImage = void 0;
var Jimp = require("jimp");
function saveFingerprintImage(buffer, fileName) {
    let returnValue = true;
    console.log('buffer is ', buffer);
    Jimp.read(buffer, (err, data) => {
        if (err) {
            console.log('fail');
            returnValue = false;
        }
        data
            .resize(300, 400)
            .quality(60)
            .write(fileName);
        console.log('true : ', fileName);
        returnValue = true;
    });
    return returnValue;
}
exports.saveFingerprintImage = saveFingerprintImage;
//# sourceMappingURL=fingerprint_save_image.js.map