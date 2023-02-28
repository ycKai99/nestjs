"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postData = void 0;
const axios = require('axios');
const net = require("net");
var CryptoJS = require("crypto-js");
function postData(fileData, tempCount) {
    let socket;
    socket = new net.Socket();
    socket.connect(8080, '192.168.100.54', async () => {
        console.log('Connected to Java server');
        socket.write('ciphertext');
    });
    socket.on('data', (data) => {
        console.log(`Received from Java server: ${data.toString()}`);
    });
    socket.on('error', (error) => {
        console.log('error is ', error);
        setTimeout(postData, 5000);
    });
    socket.on('end', () => {
        console.log('disconnected from server');
    });
    socket.on('close', () => {
        console.log('Close');
    });
}
exports.postData = postData;
//# sourceMappingURL=postDataToLocal.js.map