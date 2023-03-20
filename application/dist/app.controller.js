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
const path = require('path');
const java = require('java');
java.asyncOptions = {
    syncSuffix: "",
    asyncSuffix: "Async",
    promiseSuffix: "Promise",
    promisify: require('util').promisify
};
java.classpath.push('C:/Users/User/Desktop/fingerprint_Project/github/zkfinger_nestjs_master_branch/JavaScript/application/SourceAFIS/commons-io-2.11.0.jar');
java.classpath.push('C:/Users/User/Desktop/fingerprint_Project/github/zkfinger_nestjs_master_branch/JavaScript/application/SourceAFIS/fastutil-8.5.6.jar');
java.classpath.push('C:/Users/User/Desktop/fingerprint_Project/github/zkfinger_nestjs_master_branch/JavaScript/application/SourceAFIS/fingerprintio-1.3.0.jar');
java.classpath.push('C:/Users/User/Desktop/fingerprint_Project/github/zkfinger_nestjs_master_branch/JavaScript/application/SourceAFIS/gson-2.8.9.jar');
java.classpath.push('C:/Users/User/Desktop/fingerprint_Project/github/zkfinger_nestjs_master_branch/JavaScript/application/SourceAFIS/jackson-annotations-2.13.3.jar');
java.classpath.push('C:/Users/User/Desktop/fingerprint_Project/github/zkfinger_nestjs_master_branch/JavaScript/application/SourceAFIS/jackson-core-2.13.3.jar');
java.classpath.push('C:/Users/User/Desktop/fingerprint_Project/github/zkfinger_nestjs_master_branch/JavaScript/application/SourceAFIS/jackson-databind-2.13.3.jar');
java.classpath.push('C:/Users/User/Desktop/fingerprint_Project/github/zkfinger_nestjs_master_branch/JavaScript/application/SourceAFIS/jackson-dataformat-cbor-2.13.3.jar');
java.classpath.push('C:/Users/User/Desktop/fingerprint_Project/github/zkfinger_nestjs_master_branch/JavaScript/application/SourceAFIS/jnbis-2.1.1.jar');
java.classpath.push('C:/Users/User/Desktop/fingerprint_Project/github/zkfinger_nestjs_master_branch/JavaScript/application/SourceAFIS/noexception-1.8.0.jar');
java.classpath.push('C:/Users/User/Desktop/fingerprint_Project/github/zkfinger_nestjs_master_branch/JavaScript/application/SourceAFIS/slf4j-api-1.7.32.jar');
java.classpath.push('C:/Users/User/Desktop/fingerprint_Project/github/zkfinger_nestjs_master_branch/JavaScript/application/SourceAfis/sourceafis-3.17.1.jar');
java.classpath.push('C:/Users/User/Desktop/fingerprint_Project/github/zkfinger_nestjs_master_branch/JavaScript/application/SourceAfis/stagean-1.2.0.jar');
const FingerprintTemplate = java.import('com.machinezoo.sourceafis.FingerprintTemplate');
const FingerprintMatcher = java.import('com.machinezoo.sourceafis.FingerprintMatcher');
const FingerprintImage = java.import('com.machinezoo.sourceafis.FingerprintImage');
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    testMatch(imageData, req) {
        const probeTemplate = fs.readFileSync('images/image_1.jpeg');
        const candidateTemplate = fs.readFileSync('images/image_2.jpeg');
        const probebuffer = Buffer.from(probeTemplate.toString('base64'), 'base64');
        let buffer2 = new Uint8Array(probebuffer);
        const probebuffer1 = Buffer.from(candidateTemplate.toString('base64'), 'base64');
        let buffer21 = new Uint8Array(probebuffer1);
        console.log("probe :", buffer2);
        console.log("candidate :", buffer21);
    }
    registerFingerprint(fingerprintData) {
        console.log(fingerprintData);
        return this.appService.registerFingerprint(fingerprintData);
    }
    verifyFingerprint() {
        return this.appService.verifyFingerprint();
    }
    verifyFpMessage(status) {
        let result = status;
        return this.appService.verifyFingerprintMessage(result);
    }
    fingerprintData() {
        return this.appService.fingerprintData();
    }
    async postErrorMessage(req, res) {
        const jadeargument = {};
        console.log("Message from java server: ", JSON.stringify(req.body, null, 2));
        let data = await (0, fingerprint_read_file_data_1.readFileData)(constSetting_1.ERROR_MESSAGE_FOLDER_PATH);
        let jsonArray = [];
        let jsonObj = JSON.parse(JSON.stringify(jsonArray));
        const now = new Date();
        const year = now.getFullYear();
        const month = ('0' + (now.getMonth() + 1)).slice(-2);
        const day = ('0' + now.getDate()).slice(-2);
        const hours = ('0' + now.getHours()).slice(-2);
        const minutes = ('0' + now.getMinutes()).slice(-2);
        const seconds = ('0' + now.getSeconds()).slice(-2);
        const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        switch (req.body['fpid']) {
            case '0':
                console.log('Verify success');
                break;
            case '1':
                console.log('Verify fail');
                const errorMessage = {};
                let errorData = fs.readFileSync(constSetting_1.ERROR_MESSAGE_FOLDER_PATH, {
                    encoding: 'utf8',
                });
                let errMessage = JSON.parse(errorData);
                console.log(errMessage);
                console.log('before push: ', data);
                let newData = { "time": formattedDateTime, "operation": 'Verify fail' };
                data.push(newData);
                console.log('after push: ', data);
                fs.writeFileSync(constSetting_1.ERROR_MESSAGE_FOLDER_PATH, JSON.stringify(data));
                break;
        }
        jadeargument['errMessage'] = data;
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
    (0, common_1.Get)('testing'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Request]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "testMatch", null);
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
    (0, common_1.Get)('fingerprintData'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "fingerprintData", null);
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