"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.READ_MESSAGE_SYNC = exports.WRITE_MESSAGE_SYNC = exports.READ_FILE_SYNC = exports.WRITE_FILE_SYNC = exports.data_full_path = exports.message_full_path = exports.message_path = exports.file_path = void 0;
exports.file_path = {
    directory: 'localStorage',
    filename: 'fingerprintData.json'
};
exports.message_path = {
    directory: 'localStorage',
    filename: 'messageNotificationData.json'
};
exports.message_full_path = "./" + exports.message_path.directory + "/" + exports.message_path.filename;
exports.data_full_path = "./" + exports.file_path.directory + "/" + exports.file_path.filename;
exports.WRITE_FILE_SYNC = 'WRITE_FILE_SYNC';
exports.READ_FILE_SYNC = 'READ_FILE_SYNC';
exports.WRITE_MESSAGE_SYNC = 'WRITE_MESSAGE_SYNC';
exports.READ_MESSAGE_SYNC = 'READ_MESSAGE_SYNC';
//# sourceMappingURL=constSetting.js.map