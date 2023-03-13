"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveFingerprintImage = void 0;
var Jimp = require("jimp");
async function saveFingerprintImage(buffer, fileName) {
    await Jimp.read(buffer, (err, data) => {
        if (err)
            return false;
        data
            .resize(300, 300)
            .quality(50)
            .write(fileName);
        return true;
    });
}
exports.saveFingerprintImage = saveFingerprintImage;
//# sourceMappingURL=saveFingerprintImage.js.map