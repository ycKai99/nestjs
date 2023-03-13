"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFileData = void 0;
const fs = require("graceful-fs");
const makeDirectory_1 = require("./makeDirectory");
function readFileData(fileName) {
    try {
        let rawData = fs.readFileSync(fileName);
        let result;
        if (rawData.length > 0) {
            result = JSON.parse(rawData.toString());
        }
        else {
            result = [];
        }
        return result;
    }
    catch (err) {
        if (err.code === "ENOENT" || err.code === undefined) {
            (0, makeDirectory_1.makeDirectory)("images");
            fs.writeFile(fileName, '', (err) => {
                if (err) {
                    console.log('writefile error is ', err);
                }
                else {
                    console.log('success created');
                }
            });
        }
    }
}
exports.readFileData = readFileData;
//# sourceMappingURL=retrieveFileData.js.map