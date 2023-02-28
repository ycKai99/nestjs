"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToLocalServer = void 0;
const fileMessage_1 = require("../fileAction/fileMessage");
const readFileSync_1 = require("../fileAction/readFileSync");
const fileMessageType_interface_1 = require("../fileInterface/fileMessageType.interface");
const axios = require('axios');
async function connectToLocalServer() {
    let file = await (0, readFileSync_1.readFileSync)(fileMessageType_interface_1.fileItemName.FILE_STORAGE_NAME);
    let message = (0, fileMessage_1.generateMessage)();
    console.log(message);
    console.log(JSON.stringify(file, null, 0));
    axios.post('http://192.168.100.46:4040/syncFpStorage', {
        data: file,
        message: message
    })
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
}
exports.connectToLocalServer = connectToLocalServer;
//# sourceMappingURL=connectToCentral.js.map