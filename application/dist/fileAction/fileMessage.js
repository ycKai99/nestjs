"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMessage = exports.fileMessage = void 0;
const uuid_1 = require("uuid");
const uuid = (0, uuid_1.v4)();
function fileMessage(data) {
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
exports.fileMessage = fileMessage;
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
        DataSource: "FP_" + uuid
    };
    return messageDetails;
}
exports.generateMessage = generateMessage;
//# sourceMappingURL=fileMessage.js.map