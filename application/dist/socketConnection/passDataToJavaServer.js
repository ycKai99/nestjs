"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passDataToJava = void 0;
const net = require("net");
const identifyFp_1 = require("../fileAction/identifyFp");
async function passDataToJava() {
    let socket;
    socket = new net.Socket();
    socket.connect(8080, 'localhost', async () => {
        console.log('Connected to Java server');
        let dataFile = await (0, identifyFp_1.identifyFp)();
        console.log('datafile is ', dataFile);
        socket.write(dataFile.toString());
        socket.destroy();
    });
    socket.on('data', (data) => {
        console.log(`Received from Java server: ${data.toString()}`);
    });
    socket.on('error', (error) => {
        console.log('error is ', error);
        setTimeout(passDataToJava, 5000);
    });
    socket.on('end', () => {
        console.log('disconnected from server');
    });
    socket.on('close', () => {
        console.log('Close');
    });
}
exports.passDataToJava = passDataToJava;
//# sourceMappingURL=passDataToJavaServer.js.map