"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onlyFpData = void 0;
function onlyFpData(fileData) {
    let dataArray = [];
    fileData.forEach(element => {
        dataArray.push(element['fpid']);
    });
    return dataArray;
}
exports.onlyFpData = onlyFpData;
//# sourceMappingURL=identifyFp.js.map