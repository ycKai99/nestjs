"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fingerprintWriteMessage = void 0;
const fs = require("graceful-fs");
function fingerprintWriteMessage(filePath, data) {
    let returnMessage = true;
    fs.stat(filePath, (err, stat) => {
        if (err === null) {
            fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
            console.log('Data is append into file...');
        }
        else if (err.code === 'ENOENT') {
            fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
            console.log('Data is written into file...');
        }
        else {
            returnMessage = false;
            console.log('Failed to write data into file...');
        }
    });
    return returnMessage;
}
exports.fingerprintWriteMessage = fingerprintWriteMessage;
//# sourceMappingURL=fingerprint_write_message.js.map