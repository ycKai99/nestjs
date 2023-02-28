"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDirectory = void 0;
const fs = require("graceful-fs");
function makeDirectory(dir) {
    if (fs.existsSync(dir)) {
        return false;
    }
    else {
        fs.mkdirSync(dir);
        return true;
    }
}
exports.makeDirectory = makeDirectory;
//# sourceMappingURL=makeDirectory.js.map