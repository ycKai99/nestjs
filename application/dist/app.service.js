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
exports.StandardFingerprint = void 0;
const common_1 = require("@nestjs/common");
const fingerprint_read_file_data_1 = require("./fileAction/fingerprint_read_file_data");
const constSetting_1 = require("./fileInterface/constSetting");
const fingerprint_register_1 = require("./fileAction/fingerprint_register");
const fingerprint_verify_1 = require("./fileAction/fingerprint_verify");
const fingerprint_read_file_total_1 = require("./fileAction/fingerprint_read_file_total");
const fingerprint_retrieve_data_1 = require("./fileAction/fingerprint_retrieve_data");
let StandardFingerprint = class StandardFingerprint {
    constructor() {
        this.countFileTotal();
        this.readMessageNotificationData();
        this.readReturnMessageData();
    }
    async readMessageNotificationData() {
        console.log('read message notification');
        this._messageNotificationData = await (0, fingerprint_read_file_data_1.readFileData)(constSetting_1.MESSAGE_FOLDER_PATH);
    }
    get messageNotificationData() {
        return this._messageNotificationData;
    }
    set messageNotificationData(data) {
        this._messageNotificationData.push(data);
    }
    async readReturnMessageData() {
        this._messageData = await (0, fingerprint_read_file_data_1.readFileData)(constSetting_1.ERROR_MESSAGE_FOLDER_PATH);
    }
    get messageData() {
        return this._messageData;
    }
    set messageData(data) {
        this._messageData.push(data);
    }
    get fingerprintImageTotal() {
        return this._fingerprintImageTotal;
    }
    set fingerprintImageTotal(num) {
        this._fingerprintImageTotal = num;
    }
    countFileTotal() {
        this.fingerprintImageTotal = (0, fingerprint_read_file_total_1.readFileTotal)(constSetting_1.IMAGE_FOLDER);
    }
    registerFingerprint(fingerprintData) {
        this.countFileTotal();
        let result = (0, fingerprint_register_1.fingerprintRegister)(fingerprintData, this.fingerprintImageTotal, this._messageNotificationData, this._messageData);
        this.readMessageNotificationData();
        this.readReturnMessageData();
        return result;
    }
    async verifyFingerprint() {
        await this.countFileTotal();
        return await (0, fingerprint_verify_1.fingerprintVerify)(this.fingerprintImageTotal);
    }
    verifyFingerprintMessage(message) {
        if (message['fpid'] === "match") {
            (0, fingerprint_verify_1.fingerprintVerify)(this.fingerprintImageTotal, message['fpid']);
        }
    }
    fingerprintData() {
        return (0, fingerprint_retrieve_data_1.retrieveFingerprintData)(this.fingerprintImageTotal);
    }
};
StandardFingerprint = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], StandardFingerprint);
exports.StandardFingerprint = StandardFingerprint;
//# sourceMappingURL=app.service.js.map