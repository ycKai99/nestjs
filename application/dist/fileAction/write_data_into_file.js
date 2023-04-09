"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fingerprintWriteMessage = void 0;
const fs = require("graceful-fs");
function fingerprintWriteMessage(filePath, data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
        return true;
    }
    catch (err) {
        return false;
    }
}
exports.fingerprintWriteMessage = fingerprintWriteMessage;
//# sourceMappingURL=write_data_into_file.js.map