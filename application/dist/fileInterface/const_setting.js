"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FPEVENT = exports.DB = exports.CHECK_SERVER = exports.REMOTE_SERVER = exports.LOCATION_RELATION_FILE_PATH = exports.LOCATION_TAG_FILE_PATH = exports.RESPONSE_MESSAGE_FILE_PATH = exports.FINGERPRINT_TEMPLATE_FILE_PATH = exports.FINGERPRINT_FILE_PATH = exports.MESSAGE_FILE_PATH = exports.LOCATION_RELATION_FILE = exports.LOCATION_TAG_FILE = exports.IMAGE_FOLDER = exports.RESPONSE_MESSAGE_FILE = exports.MESSAGE_NOTIFICATION_FILE = exports.FINGERPRINT_TEMPLATE_DATA_FILE = exports.FINGERPRINT_DATA_FILE = exports.DIRECTORY = void 0;
exports.DIRECTORY = "localStorage";
exports.FINGERPRINT_DATA_FILE = "fingerprintData.json";
exports.FINGERPRINT_TEMPLATE_DATA_FILE = "fingerprintTemplateData.json";
exports.MESSAGE_NOTIFICATION_FILE = "registeredFingerprintMessage.json";
exports.RESPONSE_MESSAGE_FILE = "handleResponseMessage.json";
exports.IMAGE_FOLDER = "localStorage/images/";
exports.LOCATION_TAG_FILE = "locationtag.json";
exports.LOCATION_RELATION_FILE = "locationrelation.json";
exports.MESSAGE_FILE_PATH = "./" + exports.DIRECTORY + "/" + exports.MESSAGE_NOTIFICATION_FILE;
exports.FINGERPRINT_FILE_PATH = "./" + exports.DIRECTORY + "/" + exports.FINGERPRINT_DATA_FILE;
exports.FINGERPRINT_TEMPLATE_FILE_PATH = "./" + exports.DIRECTORY + "/" + exports.FINGERPRINT_TEMPLATE_DATA_FILE;
exports.RESPONSE_MESSAGE_FILE_PATH = "./" + exports.DIRECTORY + "/" + exports.RESPONSE_MESSAGE_FILE;
exports.LOCATION_TAG_FILE_PATH = "./" + exports.DIRECTORY + "/" + exports.LOCATION_TAG_FILE;
exports.LOCATION_RELATION_FILE_PATH = "./" + exports.DIRECTORY + "/" + exports.LOCATION_RELATION_FILE;
exports.REMOTE_SERVER = "http://localhost:5050/";
exports.CHECK_SERVER = exports.REMOTE_SERVER + "checkserverlive";
var DB;
(function (DB) {
    DB.FILE = "file";
    DB.MONGO = "mongo";
})(DB = exports.DB || (exports.DB = {}));
var FPEVENT;
(function (FPEVENT) {
    FPEVENT.RES_MSG = "response message";
    FPEVENT.NOTIF_MSG = "notification message";
    FPEVENT.FP_TPL_MSG = "fingerprint template message";
    FPEVENT.IMG_TTL = "image total";
    FPEVENT.LOC_TAG = "location tag";
    FPEVENT.LOC_REL = "location relation";
})(FPEVENT = exports.FPEVENT || (exports.FPEVENT = {}));
//# sourceMappingURL=const_setting.js.map