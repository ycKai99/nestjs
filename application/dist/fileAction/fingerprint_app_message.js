"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMessage = exports.handleResponseMessages = exports.zktecoFpMessage = exports.appMessage = void 0;
function appMessage(fileNum, operation, uuid) {
    let messageDetails = {
        message: "Fingerprint data",
        ReceivedDate: new Date(),
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
    let messageDetails = {
        fpid: fingerprintData['fpid'],
        registeredDate: new Date(),
        operation: 'Register fingerprint',
        vendor: 'ZKTeco',
        header_messageId: "FP_" + uuid
    };
    return messageDetails;
}
exports.zktecoFpMessage = zktecoFpMessage;
function handleResponseMessages(data, uuid) {
    let messageDetails = {
        time: new Date(),
        message: data,
        header_messageId: "FP_" + uuid
    };
    return messageDetails;
}
exports.handleResponseMessages = handleResponseMessages;
function generateMessage() {
    let messageDetails = {
        message: "Fingerprint data to central server",
        ReceivedDate: new Date(),
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