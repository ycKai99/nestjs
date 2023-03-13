"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDirectory = void 0;
const fs = require("graceful-fs");
function makeDirectory(dir) {
    if (fs.existsSync(dir)) {
        console.log('Folder exists...');
        return false;
    }
    else {
        fs.mkdirSync(dir);
        console.log('Folder created...');
        return true;
    }
}
exports.makeDirectory = makeDirectory;
//# sourceMappingURL=fingerprint_create_directory.js.map