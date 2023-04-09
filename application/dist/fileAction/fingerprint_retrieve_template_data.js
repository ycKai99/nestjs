"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveFingerprintTemplateData = void 0;
const fingerprint_data_encryption_1 = require("./fingerprint_data_encryption");
var countFt = 0;
function retrieveFingerprintTemplateData(data) {
    let returndata = "";
    if (countFt < data.length) {
        console.log('countFt is ', countFt);
        returndata = data[countFt]['fpid'];
        countFt++;
    }
    else {
        returndata = "finished";
        countFt = 0;
        console.log('sent finished');
    }
    return (0, fingerprint_data_encryption_1.dataEncryption)(returndata);
}
exports.retrieveFingerprintTemplateData = retrieveFingerprintTemplateData;
//# sourceMappingURL=fingerprint_retrieve_template_data.js.map