"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMessage = exports.handleResponseMessage = exports.zktecoFpMessage = exports.appMessage = void 0;
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
        operation: 'Register fingerprint',
        vendor: 'ZKTeco',
        header_messageId: "FP_" + uuid,
        image_name: fileName
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
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    let hour = date.getHours().toString().padStart(2, '0');
    let minute = date.getMinutes().toString().padStart(2, '0');
    let second = date.getSeconds().toString().padStart(2, '0');
    let fullDate = year + month + day + hour + minute + second;
    let timezone = "Asia/Singapore";
    let formattedDate = new Intl.DateTimeFormat("en-US", { timeZone: timezone }).format(date);
    return formattedDate;
}
//# sourceMappingURL=fingerprint_app_message.js.map