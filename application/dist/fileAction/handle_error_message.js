"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrorMessage = void 0;
const const_setting_1 = require("../FileInterface/const_setting");
const uuid_1 = require("uuid");
const generate_message_1 = require("./generate_message");
const read_file_data_1 = require("./read_file_data");
const write_data_into_file_1 = require("./write_data_into_file");
function handleErrorMessage(message) {
    let data = (0, read_file_data_1.readFileData)(const_setting_1.RESPONSE_MESSAGE_FILE_PATH);
    let errMessage = JSON.parse(JSON.stringify(message, null, 2));
    let uuid = (0, uuid_1.v4)();
    let responseMessage;
    switch (parseInt(errMessage)) {
        case 0:
            responseMessage = (0, generate_message_1.handleResponseMessage)("Verify failed.", uuid);
            data.push(responseMessage);
            (0, write_data_into_file_1.fingerprintWriteMessage)(const_setting_1.RESPONSE_MESSAGE_FILE_PATH, data);
            break;
        case 1:
            responseMessage = (0, generate_message_1.handleResponseMessage)("Verify Success.", uuid);
            data.push(responseMessage);
            (0, write_data_into_file_1.fingerprintWriteMessage)(const_setting_1.RESPONSE_MESSAGE_FILE_PATH, data);
            break;
    }
    return data;
}
exports.handleErrorMessage = handleErrorMessage;
//# sourceMappingURL=handle_error_message.js.map