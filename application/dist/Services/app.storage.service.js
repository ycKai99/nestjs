"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageController = void 0;
const common_1 = require("@nestjs/common");
const read_file_data_1 = require("../FileAction/read_file_data");
const read_file_total_1 = require("../FileAction/read_file_total");
const write_data_into_file_1 = require("../FileAction/write_data_into_file");
const const_setting_1 = require("../FileInterface/const_setting");
let StorageController = class StorageController {
    constructor() { }
    readData(command) {
        switch (command) {
            case const_setting_1.FPEVENT.FP_TPL_MSG:
                return (0, read_file_data_1.readFileData)(const_setting_1.FINGERPRINT_TEMPLATE_FILE_PATH);
                break;
            case const_setting_1.FPEVENT.NOTIF_MSG:
                return (0, read_file_data_1.readFileData)(const_setting_1.MESSAGE_FILE_PATH);
                break;
            case const_setting_1.FPEVENT.RES_MSG:
                return (0, read_file_data_1.readFileData)(const_setting_1.RESPONSE_MESSAGE_FILE_PATH);
                break;
            case const_setting_1.FPEVENT.IMG_TTL:
                return (0, read_file_total_1.readFileTotal)(const_setting_1.IMAGE_FOLDER);
                break;
            case const_setting_1.FPEVENT.LOC_TAG:
                return (0, read_file_data_1.readFileData)(const_setting_1.LOCATION_TAG_FILE_PATH);
                break;
            case const_setting_1.FPEVENT.LOC_REL:
                return (0, read_file_data_1.readFileData)(const_setting_1.LOCATION_RELATION_FILE_PATH);
                break;
        }
    }
    writeData(command, fullData, CurrentData) {
        fullData.push(CurrentData);
        switch (command) {
            case const_setting_1.FPEVENT.FP_TPL_MSG:
                return (0, write_data_into_file_1.fingerprintWriteMessage)(const_setting_1.FINGERPRINT_TEMPLATE_FILE_PATH, fullData);
                break;
            case const_setting_1.FPEVENT.NOTIF_MSG:
                return (0, write_data_into_file_1.fingerprintWriteMessage)(const_setting_1.MESSAGE_FILE_PATH, fullData);
                break;
            case const_setting_1.FPEVENT.RES_MSG:
                return (0, write_data_into_file_1.fingerprintWriteMessage)(const_setting_1.RESPONSE_MESSAGE_FILE_PATH, fullData);
                break;
            case const_setting_1.FPEVENT.IMG_TTL:
                return (0, write_data_into_file_1.fingerprintWriteMessage)(const_setting_1.IMAGE_FOLDER, fullData);
                break;
            case const_setting_1.FPEVENT.LOC_TAG:
                return (0, write_data_into_file_1.fingerprintWriteMessage)(const_setting_1.LOCATION_TAG_FILE_PATH, fullData);
                break;
            case const_setting_1.FPEVENT.LOC_REL:
                return (0, write_data_into_file_1.fingerprintWriteMessage)(const_setting_1.LOCATION_RELATION_FILE_PATH, fullData);
                break;
        }
    }
};
StorageController = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], StorageController);
exports.StorageController = StorageController;
//# sourceMappingURL=app.storage.service.js.map