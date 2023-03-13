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
const retrieveFileData_1 = require("./fileAction/retrieveFileData");
const constSetting_1 = require("./fileInterface/constSetting");
const fingerprintRegister_1 = require("./fileAction/fingerprintRegister");
const fingerprintVerify_1 = require("./fileAction/fingerprintVerify");
const readFileTotal_1 = require("./fileAction/readFileTotal");
let StandardFingerprint = class StandardFingerprint {
    constructor() {
        this.verifyFpCount = 1;
        this.fileNum = 0;
        this.countFileTotal();
        this.readMessageData();
    }
    get messageData() {
        return this._messageData;
    }
    set messageData(data) {
        this._messageData.push(data);
    }
    readMessageData() {
        this._messageData = (0, retrieveFileData_1.readFileData)(constSetting_1.MESSAGE_FOLDER_PATH);
    }
    countFileTotal() {
        this._fingerprintImageTotal = (0, readFileTotal_1.readFileTotal)(constSetting_1.IMAGE_FOLDER);
    }
    get fingerprintImageTotal() {
        return this._fingerprintImageTotal;
    }
    set fingerprintImageTotal(num) {
        this._fingerprintImageTotal = num;
    }
    async registerFingerprint(fingerprintData) {
        console.log('fingerprintImageTotal is ', this.fingerprintImageTotal);
        await this.countFileTotal();
        let result = await (0, fingerprintRegister_1.fingerprintRegister)(fingerprintData, this.fingerprintImageTotal);
        return result;
    }
    verifyFingerprint() {
        return (0, fingerprintVerify_1.fingerprintVerify)(this.verifyFpCount, this.fingerprintImageTotal);
    }
    verifyFingerprintMessage(message) {
        console.log('message is ', message);
        if (message === "match success") {
            this.verifyFpCount = 0;
        }
    }
};
StandardFingerprint = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], StandardFingerprint);
exports.StandardFingerprint = StandardFingerprint;
//# sourceMappingURL=app.service.js.map