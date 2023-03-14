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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.res_render = exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const fs = require("graceful-fs");
const jade = require("jade");
const zktfingerprint_service_1 = require("./zktfingerprint.service");
const constSetting_1 = require("./fileInterface/constSetting");
const fingerprint_read_file_data_1 = require("./fileAction/fingerprint_read_file_data");
const fingerprint_write_message_1 = require("./fileAction/fingerprint_write_message");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    registerFingerprint(fingerprintData) {
        return this.appService.registerFingerprint(fingerprintData);
    }
    verifyFingerprint() {
        return this.appService.verifyFingerprint();
    }
    verifyFpMessage(status) {
        let result = status;
        return this.appService.verifyFingerprintMessage(result);
    }
    countFileNum() {
        return this.appService.countFingerprintImage();
    }
    async postErrorMessage(req, res) {
        const jadeargument = {};
        console.log("Message from java server: ", JSON.stringify(req.body, null, 2));
        let data = await (0, fingerprint_read_file_data_1.readFileData)(constSetting_1.ERROR_MESSAGE_FOLDER_PATH);
        let errMessage = JSON.parse(JSON.stringify(req.body['fpid'], null, 2));
        let jsonArray = [];
        let jsonObj = JSON.parse(JSON.stringify(jsonArray));
        if (data.length !== 0) {
            data.push(errMessage);
        }
        else {
            jsonObj.push(errMessage);
            data = jsonObj;
        }
        await (0, fingerprint_write_message_1.fingerprintWriteMessage)(constSetting_1.ERROR_MESSAGE_FOLDER_PATH, data);
        jadeargument['dataSet1'] = data;
        return res.send(res_render('errorMessage', res, jadeargument));
    }
    getErrorMessage(res) {
        const jadeargument = {};
        let data = fs.readFileSync(constSetting_1.ERROR_MESSAGE_FOLDER_PATH, {
            encoding: 'utf8',
        });
        console.log("Message Page reload");
        let errMessage = JSON.parse(data);
        jadeargument['errMessage'] = errMessage;
        return res.send(res_render('errorMessage', res, jadeargument));
    }
    getStatus(req, res) {
        const jadeargument = {};
        let data = fs.readFileSync(constSetting_1.FINGERPRINT_FOLDER_PATH, {
            encoding: 'utf-8'
        });
        console.log("Status Page reload");
        let fpdata = JSON.parse(data);
        jadeargument['dataSet1'] = fpdata;
        const errorMessage = {};
        let errorData = fs.readFileSync(constSetting_1.ERROR_MESSAGE_FOLDER_PATH, {
            encoding: 'utf8',
        });
        let errMessage = JSON.parse(errorData);
        errorMessage['errMessage'] = errMessage;
        return res.send(res_render('statuspage', res, jadeargument));
    }
    postStatus(req, res) {
        let sendMessage = "";
        console.log("message post: ", req.body['submitValue']);
        switch (req.body['submitValue']) {
            case "INITIALIZE_DEVICE":
                sendMessage = "INITIALIZE_DEVICE";
                console.log('INITIALIZE_DEVICE');
                break;
            case "ENROLL_FINGERPRINT":
                console.log('ENROLL_FINGERPRINT');
                break;
            case "VERIFY_FINGERPRINT":
                console.log('VERIFY_FINGERPRINT');
                break;
            case "CLOSE_DEVICE":
                sendMessage = "IDENTIFY_FINGERPRINT";
                console.log('CLOSE_DEVICE');
                break;
        }
        const jadeargument = {};
        let data = fs.readFileSync(constSetting_1.FINGERPRINT_FOLDER_PATH, {
            encoding: 'utf8',
        });
        let fpdata = JSON.parse(data);
        jadeargument['dataSet1'] = fpdata;
        return res.send(res_render('statuspage', res, jadeargument));
    }
};
__decorate([
    (0, common_1.Post)('registerfp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "registerFingerprint", null);
__decorate([
    (0, common_1.Get)('verifyfp'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "verifyFingerprint", null);
__decorate([
    (0, common_1.Post)('verify'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "verifyFpMessage", null);
__decorate([
    (0, common_1.Get)('fileNum'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "countFileNum", null);
__decorate([
    (0, common_1.Post)('error'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "postErrorMessage", null);
__decorate([
    (0, common_1.Get)('error'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], AppController.prototype, "getErrorMessage", null);
__decorate([
    (0, common_1.Get)('status'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", String)
], AppController.prototype, "getStatus", null);
__decorate([
    (0, common_1.Post)('status'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Object]),
    __metadata("design:returntype", String)
], AppController.prototype, "postStatus", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [zktfingerprint_service_1.ZKTFingerprintService])
], AppController);
exports.AppController = AppController;
function res_render(jadefile, res, jadeargument) {
    let data = fs.readFileSync('views/' + jadefile + '.jade', {
        encoding: 'utf8',
    });
    let renderer = jade.compile(data);
    let html = renderer({ jadeargument });
    return html;
}
exports.res_render = res_render;
//# sourceMappingURL=app.controller.js.map