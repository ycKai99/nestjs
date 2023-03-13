"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFileTotal = void 0;
const fs = require("graceful-fs");
const makeDirectory_1 = require("./makeDirectory");
function readFileTotal(folder) {
    const length = fs.readdirSync(folder).length;
    if (length === 0) {
        (0, makeDirectory_1.makeDirectory)(folder.substring(0, folder.length - 1));
    }
    return length;
}
exports.readFileTotal = readFileTotal;
//# sourceMappingURL=readFileTotal.js.map