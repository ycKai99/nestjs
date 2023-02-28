"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readfromfilepath = void 0;
async function readfromfilepath(selectedpath, name, variable) {
    let returnvariable;
    let path;
    path = 'Localstorage\\';
    if (selectedpath > '') {
        path = path + selectedpath + '\\';
    }
    let appName = '';
}
exports.readfromfilepath = readfromfilepath;
//# sourceMappingURL=readfromfilepath.js.map