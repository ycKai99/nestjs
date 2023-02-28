"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writetofilepath = void 0;
async function writetofilepath(selectedpath, name, variable, handler) {
    let path;
    path = 'Localstorage\\';
    if (selectedpath > '') {
        path = path + selectedpath + '\\';
    }
    let appName = '';
    try {
        const str = JSON.stringify(variable, null, 1);
    }
    catch (e) {
    }
}
exports.writetofilepath = writetofilepath;
//# sourceMappingURL=writetofilepath.js.map