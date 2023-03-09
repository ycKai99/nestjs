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
const zktfingerprint_service_1 = require("./zktfingerprint.service");
const fs = require("graceful-fs");
const jade = require("jade");
const net = require("net");
const axios = require('axios');
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
        this.verifyFpCount = 0;
    }
    init(req, res) {
        let subValue = JSON.parse(JSON.stringify(req.body, null, 2));
        let socket;
        socket = new net.Socket();
        socket.connect(8080, 'localhost', async () => {
            console.log('Connected to Java server');
            socket.write('open');
        });
    }
    closeScanner(req, res) {
        let subValue = JSON.parse(JSON.stringify(req.body, null, 2));
        let socket;
        socket = new net.Socket();
        socket.connect(8080, 'localhost', async () => {
            console.log('Connected to Java server');
            socket.write('close');
        });
    }
    retrieveTesting() {
        return this.appService.retrieveTesting();
    }
    testing() {
        const dir = 'images/';
        fs.readdir(dir, (err, files) => {
            let fileNum = files.length;
            const fileExtension = '.jpeg';
            const fileName = `${dir}image_${fileNum + 1}${fileExtension}`;
            if (fileNum == 0) {
                let data = "no data";
                return data;
            }
            else if (this.verifyFpCount < fileNum) {
                for (let i = 0; i < fileNum; i++) {
                    let imageData = fs.readFileSync(`${dir}image_${i}${fileExtension}`);
                    this.verifyFpCount++;
                    return imageData;
                }
            }
            else {
                this.verifyFpCount = 0;
                let data = 'finished';
                return data;
            }
            if (err)
                console.log(err);
        });
    }
    registerFp(registerfp) {
        const dir = 'images/';
        fs.readdir(dir, (err, files) => {
            if (files.length != 0) {
            }
            let fileNum = files.length;
            const fileExtension = '.jpeg';
            const fileName = `${dir}image_${fileNum + 1}${fileExtension}`;
            let result = registerfp['fpid'].replace(/\n/g, "");
            const buffer = Buffer.from(result, 'base64');
            console.log('original image buffer length: ', buffer.length);
            var Jimp = require("jimp");
            Jimp.read(buffer, (err, data) => {
                if (err)
                    throw err;
                data
                    .resize(300, 400)
                    .quality(60)
                    .write(fileName);
                console.log('image save');
            });
            if (err)
                console.log(err);
        });
    }
    verify() {
        return this.appService.verifyFingerprint();
    }
    verifyFpMessage(status) {
        let result = status;
        return this.appService.verifyFingerprintMessage(result);
    }
    identifyFp() {
        return this.appService.identifyFingerprint();
    }
    getStatus(req, res) {
        const jadeargument = {};
        let data = fs.readFileSync('./localStorage/fingerprintData.json', {
            encoding: 'utf-8'
        });
        let fpdata = JSON.parse(data);
        jadeargument['dataSet1'] = fpdata;
        return res.send(res_render('statuspage', res, jadeargument));
    }
    postStatus(req, res) {
        const jadeargument = {};
        console.log("Message from java server: ", JSON.stringify(req.body, null, 2));
        let subValue = JSON.parse(JSON.stringify(req.body, null, 2));
        console.log(subValue.submitValue);
        let data = fs.readFileSync('./localStorage/fingerprintData.json', {
            encoding: 'utf8',
        });
        let fpdata = JSON.parse(data);
        jadeargument['dataSet1'] = fpdata;
        return res.send(res_render('statuspage', res, jadeargument));
    }
    postErrorMessage(req, res) {
        const jadeargument = {};
        console.log("Message from java server: ", JSON.stringify(req.body, null, 2));
        let data = fs.readFileSync('./localStorage/errorMessage.json', {
            encoding: 'utf8',
        });
        let errMessage = JSON.parse(JSON.stringify(req.body, null, 2));
        console.log(errMessage);
        let jsonArray = [];
        let jsonObj = JSON.parse(JSON.stringify(jsonArray));
        if (data.length != 0) {
            let pastErrMessage = JSON.parse(data);
            pastErrMessage.push(errMessage);
            console.log(pastErrMessage);
            fs.writeFileSync('./localStorage/errorMessage.json', JSON.stringify(pastErrMessage));
        }
        else {
            jsonObj.push(errMessage);
            fs.writeFileSync('./localStorage/errorMessage.json', JSON.stringify(jsonObj));
        }
        jadeargument['errMessage'] = data;
        return res.send(res_render('errorMessage', res, jadeargument));
    }
    getErrorMessage(res) {
        const jadeargument = {};
        let data = fs.readFileSync('./localStorage/errorMessage.json', {
            encoding: 'utf8',
        });
        let errMessage = JSON.parse(data);
        jadeargument['errMessage'] = errMessage;
        return res.send(res_render('errorMessage', res, jadeargument));
    }
};
__decorate([
    (0, common_1.Post)('init'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Object]),
    __metadata("design:returntype", Object)
], AppController.prototype, "init", null);
__decorate([
    (0, common_1.Post)('closeScanner'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Object]),
    __metadata("design:returntype", Object)
], AppController.prototype, "closeScanner", null);
__decorate([
    (0, common_1.Get)('retrieveTesting'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "retrieveTesting", null);
__decorate([
    (0, common_1.Get)('testing'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "testing", null);
__decorate([
    (0, common_1.Post)('registerfp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "registerFp", null);
__decorate([
    (0, common_1.Get)('verifyfp'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "verify", null);
__decorate([
    (0, common_1.Post)('verify'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "verifyFpMessage", null);
__decorate([
    (0, common_1.Get)('identifyfp'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "identifyFp", null);
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
__decorate([
    (0, common_1.Post)('error'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Object]),
    __metadata("design:returntype", String)
], AppController.prototype, "postErrorMessage", null);
__decorate([
    (0, common_1.Get)('error'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], AppController.prototype, "getErrorMessage", null);
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