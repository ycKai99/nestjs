"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMessage = exports.zktecoFpMessage = exports.appMessage = void 0;
function appMessage(data, uuid) {
    let messageDetails = {
        message: "Fingerprint data",
        ReceivedDate: new Date(),
        InstanceID: "FP_" + (data.length + 1),
        EntityTypeID: "FP_" + (data.length + 1),
        EntityTypeName: "Fingerprint",
        ID: "FP_",
        Code: "FPREG9500",
        Operation: "Registered fingerprint",
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
//# sourceMappingURL=appMessage.js.map