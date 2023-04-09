"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFileData = void 0;
const fs = require("graceful-fs");
const constSetting_1 = require("../fileInterface/constSetting");
const fingerprint_create_directory_1 = require("./fingerprint_create_directory");
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
            (0, fingerprint_create_directory_1.makeDirectory)(constSetting_1.DIRECTORY);
            fs.writeFile(fileName, '', (err) => {
                if (err) {
                    console.log('write file error is ', err);
                }
                else {
                    console.log('success created');
                }
            });
        }
    }
}
exports.readFileData = readFileData;
//# sourceMappingURL=fingerprint_read_file_data.js.map