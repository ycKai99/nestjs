"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFileTotal = void 0;
const fs = require("graceful-fs");
const fingerprint_create_directory_1 = require("./fingerprint_create_directory");
function readFileTotal(folder) {
    try {
        const files = fs.readdirSync(folder);
        return files.length;
    }
    catch (err) {
        console.log('err is ', err);
        if (err.code === "ENOENT" || err.code === undefined) {
            console.log('err code');
            (0, fingerprint_create_directory_1.makeDirectory)(folder.substring(0, folder.length - 1));
        }
    }
}
exports.readFileTotal = readFileTotal;
//# sourceMappingURL=fingerprint_read_file_total.js.map