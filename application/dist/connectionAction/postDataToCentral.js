"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncData = void 0;
const fingerprint_app_Message_1 = require("../fileAction/fingerprint_app_Message");
const axios = require('axios');
async function syncData(fileData) {
    let message = (0, fingerprint_app_Message_1.generateMessage)();
    console.log(message);
    console.log(JSON.stringify(fileData, null, 0));
    axios.post('http://192.168.100.46:4040/syncFpStorage', {
        data: fileData,
        message: message
    })
        .then(res => console.log("res is ", res.data))
        .catch(err => console.log("error is ", err));
}
exports.syncData = syncData;
//# sourceMappingURL=postDataToCentral.js.map