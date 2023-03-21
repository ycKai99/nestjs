"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMessage = exports.handleResponseMessages = exports.zktecoFpMessage = exports.appMessage = void 0;
function appMessage(fileNum, operation, uuid) {
    const now = new Date();
    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const day = ('0' + now.getDate()).slice(-2);
    const hours = ('0' + now.getHours()).slice(-2);
    const minutes = ('0' + now.getMinutes()).slice(-2);
    const seconds = ('0' + now.getSeconds()).slice(-2);
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    let messageDetails = {
        message: "Fingerprint data",
        ReceivedDate: formattedDateTime,
        InstanceID: "FP_" + (fileNum + 1),
        EntityTypeID: "FP_" + (fileNum + 1),
        EntityTypeName: "Fingerprint",
        ID: "FP_",
        Code: "FPREG9500",
        Operation: operation,
        DataSource: "FP_" + uuid
    };
    return messageDetails;
}
exports.appMessage = appMessage;
function zktecoFpMessage(fingerprintData, uuid) {
    const now = new Date();
    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const day = ('0' + now.getDate()).slice(-2);
    const hours = ('0' + now.getHours()).slice(-2);
    const minutes = ('0' + now.getMinutes()).slice(-2);
    const seconds = ('0' + now.getSeconds()).slice(-2);
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    let messageDetails = {
        fpid: fingerprintData['fpid'],
        registeredDate: formattedDateTime,
        operation: 'Register fingerprint',
        vendor: 'ZKTeco',
        header_messageId: "FP_" + uuid
    };
    return messageDetails;
}
exports.zktecoFpMessage = zktecoFpMessage;
function handleResponseMessages(data, uuid) {
    const now = new Date();
    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const day = ('0' + now.getDate()).slice(-2);
    const hours = ('0' + now.getHours()).slice(-2);
    const minutes = ('0' + now.getMinutes()).slice(-2);
    const seconds = ('0' + now.getSeconds()).slice(-2);
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    let messageDetails = {
        time: formattedDateTime,
        message: data,
        header_messageId: "FP_" + uuid
    };
    return messageDetails;
}
exports.handleResponseMessages = handleResponseMessages;
function generateMessage() {
    const now = new Date();
    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const day = ('0' + now.getDate()).slice(-2);
    const hours = ('0' + now.getHours()).slice(-2);
    const minutes = ('0' + now.getMinutes()).slice(-2);
    const seconds = ('0' + now.getSeconds()).slice(-2);
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    let messageDetails = {
        message: "Fingerprint data to central server",
        ReceivedDate: formattedDateTime,
        InstanceID: "FP_testing",
        EntityTypeID: "FP_testing",
        EntityTypeName: "Fingerprint",
        ID: "FP_",
        Code: "FPREG9500",
        Operation: "sync",
        DataSource: "FP_"
    };
    return messageDetails;
}
exports.generateMessage = generateMessage;
//# sourceMappingURL=fingerprint_app_message.js.map