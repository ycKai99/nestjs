"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.identifyFp = void 0;
async function identifyFp(fileData) {
    let dataArray = [];
    fileData.forEach(element => {
        dataArray.push(element['fpid']);
    });
    return dataArray;
}
exports.identifyFp = identifyFp;
//# sourceMappingURL=identifyFp.js.map