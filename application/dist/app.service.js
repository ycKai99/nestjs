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
const identifyFp_1 = require("./fileAction/identifyFp");
const readFileSync_1 = require("./fileAction/readFileSync");
const writeFileSync_1 = require("./fileAction/writeFileSync");
const postDataToCentral_1 = require("./connectionAction/postDataToCentral");
const constSetting_1 = require("./fileInterface/constSetting");
const dataEncryption_1 = require("./fileAction/dataEncryption");
let StandardFingerprint = class StandardFingerprint {
    constructor() {
        this.verifyFpCount = 0;
        this.verifyFpTotal = 0;
        this.verifyBool = true;
        this.readFingerprintData();
        this.readMessageData();
    }
    retrieveTesting() {
        (0, postDataToCentral_1.syncData)(this.fingerprintData);
        return "message from local server";
    }
    display() {
        let data = {
            fpid: 'fp6',
            registeredDate: new Date(),
            operation: 'registeredFingerprint',
            vendor: 'ZKTeco'
        };
        this.fingerprintData = data;
        return this.fingerprintData;
    }
    get fingerprintData() {
        return this._fingerprintData;
    }
    set fingerprintData(data) {
        this._fingerprintData.push(data);
    }
    get messageData() {
        return this._messageData;
    }
    set messageData(data) {
        this._messageData.push(data);
    }
    readMessageData() {
        this._messageData = (0, readFileSync_1.readFileData)(constSetting_1.message_full_path);
    }
    readFingerprintData() {
        this._fingerprintData = (0, readFileSync_1.readFileData)(constSetting_1.data_full_path);
    }
    registerFingerprint(data) {
        (0, writeFileSync_1.writeFileSync)(data, this._fingerprintData);
        this.readFingerprintData;
    }
    fingerprintRawData() {
        return (0, identifyFp_1.onlyFpData)(this._fingerprintData);
    }
    verifyFingerprint(status) {
        this.verifyFpTotal = this._fingerprintData.length;
        let check = status['fpid'];
        do {
            if (this.verifyFpCount < this.verifyFpTotal) {
                let fp = this._fingerprintData[this.verifyFpCount]['fpid'];
                console.log(this._fingerprintData['']);
                this.verifyBool = true;
                this.verifyFpCount++;
                let data = (0, dataEncryption_1.dataEncryption)(fp);
                if (check === 'match') {
                    this.verifyBool = false;
                    this.verifyFpCount = 0;
                    console.log('match');
                    break;
                }
                return data;
            }
            else {
                this.verifyBool = false;
                this.verifyFpCount = 0;
                if (check === 'match') {
                    this.verifyBool = false;
                    this.verifyFpCount = 0;
                    console.log('match');
                }
                console.log('finish');
                return "finished";
            }
        } while (this.verifyBool);
    }
    identifyFingerprint() {
    }
};
StandardFingerprint = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], StandardFingerprint);
exports.StandardFingerprint = StandardFingerprint;
//# sourceMappingURL=app.service.js.map