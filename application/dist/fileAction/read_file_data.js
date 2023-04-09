"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFileData = void 0;
const fs = require("graceful-fs");
const const_setting_1 = require("../FileInterface/const_setting");
const create_directory_1 = require("./create_directory");
function readFileData(fileName) {
    let result;
    try {
        let rawData = fs.readFileSync(fileName);
        if (rawData.length > 0) {
            result = JSON.parse(rawData.toString());
        }
        else {
            result = [];
        }
    }
    catch (err) {
        if (err.code === "ENOENT" || err.code === undefined) {
            (0, create_directory_1.makeDirectory)(const_setting_1.DIRECTORY);
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
    return result;
}
exports.readFileData = readFileData;
//# sourceMappingURL=read_file_data.js.map