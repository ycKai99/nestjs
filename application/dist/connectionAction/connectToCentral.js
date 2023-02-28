"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToLocalServer = void 0;
const appMessage_1 = require("../fileAction/appMessage");
const readFileSync_1 = require("../fileAction/readFileSync");
const axios = require('axios');
async function connectToLocalServer() {
    let file = await (0, readFileSync_1.readFileSync)("./" + process.env.DIRECTORY + "/" + process.env.FILE_NAME);
    let message = (0, appMessage_1.generateMessage)();
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