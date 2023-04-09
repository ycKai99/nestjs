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
const const_setting_1 = require("../FileInterface/const_setting");
const register_1 = require("../FileAction/register");
const retrieve_template_data_1 = require("../FingerprintAction/retrieve_template_data");
const refresh_connection_status_1 = require("../FileAction/refresh_connection_status");
const handle_error_message_1 = require("../FileAction/handle_error_message");
const get_method_1 = require("../ConnectionAction/get_method");
const post_method_1 = require("../ConnectionAction/post_method");
const get_local_fpid_1 = require("../FileAction/get_local_fpid");
const sync_data_1 = require("../FileAction/sync_data");
const app_storage_service_1 = require("./app.storage.service");
const app_location_tag_service_1 = require("./app.location_tag.service");
const app_location_relation_service_1 = require("./app.location_relation.service");
let StandardFingerprint = class StandardFingerprint {
    constructor() {
        this._messageNotificationData = [];
        this._fingerprintImageTotal = 0;
        this._responseMessageData = [];
        this._fingerprintTemplateData = [];
        this._addLocationTag = [];
        this._addLocationRelation = [];
        this.connectionStatus = "Online";
        this.VerifiedUUIDArray = [];
        this.remoteUrl = const_setting_1.REMOTE_SERVER;
        this.storageController = new app_storage_service_1.StorageController();
        this.locationTagController = new app_location_tag_service_1.LocationTagController();
        this.locationRelationController = new app_location_relation_service_1.LocationRelationController();
    }
    getConnectionStatus() {
        return this.connectionStatus;
    }
    setConnectionStatus(data) {
        this.connectionStatus = data;
    }
    async refreshConnectionStatus() {
        return await (0, refresh_connection_status_1.refrechConnection)();
    }
    fingerprintTemplateMatching() {
        if (this.getConnectionStatus() == 'Online') {
            return (0, get_method_1.getMethod)(this.remoteUrl + 'fptemplate');
        }
        else if (this.getConnectionStatus() == 'Offline') {
            return this.PerformfingerprintTemplateMatching();
        }
    }
    PerformfingerprintTemplateMatching() {
        return (0, retrieve_template_data_1.retrieveFingerprintTemplateData)(this._fingerprintTemplateData);
    }
    async fingerprintTemplate() {
        return await this.fingerprintTemplateMatching();
    }
    registerFingerprint(fingerprintData) {
        this.RegisterFingerprintData(fingerprintData);
    }
    RegisterFingerprintData(fingerprintData) {
        if (this.getConnectionStatus() == 'Online') {
            (0, post_method_1.postMethod)(this.remoteUrl + 'registerfp', fingerprintData);
        }
        else if (this.getConnectionStatus() == 'Offline') {
            this.PerformRegisterFingerprintData(fingerprintData);
        }
    }
    PerformRegisterFingerprintData(fingerprintData) {
        (0, register_1.fingerprintRegister)(fingerprintData, this._fingerprintTemplateData, this._messageNotificationData, this._responseMessageData, this._fingerprintImageTotal, this._addLocationTag, this.storageController.writeData, this.locationTagController.addLocationTag)
            .then((res) => {
            if (res.length === undefined) {
                console.log('failed');
            }
            else {
                this._fingerprintImageTotal += 1;
            }
        })
            .catch((err) => { console.log('error register : ', err); });
    }
    UpdateLocalStorage() {
        if (this.getConnectionStatus() == 'Online') {
            this.GetRemoteStorage().then((res) => {
                (0, sync_data_1.syncData)(res, this._fingerprintTemplateData, this.VerifiedUUIDArray);
            }).catch((err) => { console.log('get remote storage then catch error'); });
        }
    }
    GetRemoteStorage() {
        let localVerifiedFPIds = this.GetAllVerifiedLocalFPIds();
        return (0, post_method_1.postMethod)(this.remoteUrl + "getNewFPId", localVerifiedFPIds);
    }
    GetAllVerifiedLocalFPIds() {
        this.VerifiedUUIDArray = (0, get_local_fpid_1.localFpid)(this._fingerprintTemplateData);
        return this.VerifiedUUIDArray;
    }
    readFingerprintTemplateData() {
        this._fingerprintTemplateData = this.storageController.readData(const_setting_1.FPEVENT.FP_TPL_MSG);
    }
    getFingerprintTemplateData() {
        return this._fingerprintTemplateData;
    }
    setFingerprintTemplateData(data) {
        this._fingerprintTemplateData.push(data);
    }
    readMessageNotificationData() {
        this._messageNotificationData = this.storageController.readData(const_setting_1.FPEVENT.NOTIF_MSG);
    }
    getMessageNotificationData() {
        return this._messageNotificationData;
    }
    setMessageNotificationData(data) {
        this._messageNotificationData.push(data);
    }
    readReturnMessageData() {
        this._responseMessageData = this.storageController.readData(const_setting_1.FPEVENT.RES_MSG);
    }
    getResponseMessageData() {
        return this._responseMessageData;
    }
    setResponseMessageData(data) {
        this._responseMessageData.push(data);
    }
    countFileTotal() {
        this._fingerprintImageTotal = this.storageController.readData(const_setting_1.FPEVENT.IMG_TTL);
    }
    getFingerprintImageTotal() {
        return this._fingerprintImageTotal;
    }
    setFingerprintImageTotal(num) {
        this._fingerprintImageTotal = num;
    }
    readLocationTagData() {
        this._addLocationTag = this.storageController.readData(const_setting_1.FPEVENT.LOC_TAG);
    }
    getLocationTagData() {
        return this._addLocationTag;
    }
    setLocationTagData(data) {
        this._addLocationTag.push(data);
    }
    readLocationRelationData() {
        this._addLocationRelation = this.storageController.readData(const_setting_1.FPEVENT.LOC_REL);
    }
    getLocationRelationData() {
        return this._addLocationRelation;
    }
    setLocationRelationData(data) {
        this._addLocationRelation.push(data);
    }
    postErrorMessage(message) {
        return (0, handle_error_message_1.handleErrorMessage)(message);
    }
    testrelation() {
    }
};
StandardFingerprint = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], StandardFingerprint);
exports.StandardFingerprint = StandardFingerprint;
//# sourceMappingURL=app.main.service.js.map