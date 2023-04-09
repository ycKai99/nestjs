"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDate = exports.generateMessage = exports.relationMessage = exports.tagMessage = exports.handleResponseMessage = exports.zktecoFpMessage = exports.appMessage = void 0;
function appMessage(fileNum, operation, uuid) {
    let messageDetails = {
        message: "Fingerprint data",
        ReceivedDate: generateDate(),
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
function zktecoFpMessage(fingerprintData, fileName, uuid) {
    let messageDetails = {
        fpid: fingerprintData,
        registeredDate: generateDate(),
        status: 'new',
        vendor: 'ZKTeco',
        uuid: "FP_" + uuid,
        imageName: fileName,
        personCode: "person code"
    };
    return messageDetails;
}
exports.zktecoFpMessage = zktecoFpMessage;
function handleResponseMessage(data, uuid) {
    let messageDetails = {
        time: generateDate(),
        message: data,
        header_messageId: "FP_" + uuid
    };
    return messageDetails;
}
exports.handleResponseMessage = handleResponseMessage;
function tagMessage(uuid) {
    let messageDetails = {
        uuid: uuid,
        tag: process.env.LOCATION
    };
    return messageDetails;
}
exports.tagMessage = tagMessage;
function relationMessage(child, parent) {
    let messageDetails = {
        child: child,
        parent: parent
    };
    return messageDetails;
}
exports.relationMessage = relationMessage;
function generateMessage() {
    let messageDetails = {
        message: "Fingerprint data to central server",
        ReceivedDate: generateDate(),
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
function generateDate() {
    let date = new Date();
    let timezone = "Asia/Singapore";
    let formattedDate = new Intl.DateTimeFormat("en-US", { timeZone: timezone, month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true, }).format(date);
    return formattedDate;
}
exports.generateDate = generateDate;
//# sourceMappingURL=generate_message.js.map