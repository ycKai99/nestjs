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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_zkt_fingerprint_service_1 = require("./Services/app.zkt_fingerprint.service");
const jade_function_1 = require("./FileAction/jade_function");
const fs = require("graceful-fs");
const path = require("path");
var java = require("java");
let count = 1;
let fpCount = 0;
let fpNumber = 0;
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    test() {
        java.classpath.push(path.join(__dirname, '../SourceAfis/commons-io-2.11.0.jar'));
        java.classpath.push(path.join(__dirname, '../SourceAfis/fastutil-8.5.6.jar'));
        java.classpath.push(path.join(__dirname, '../SourceAfis/fingerprintio-1.3.0.jar'));
        java.classpath.push(path.join(__dirname, '../SourceAfis/gson-2.8.9.jar'));
        java.classpath.push(path.join(__dirname, '../SourceAfis/jackson-annotations-2.13.3.jar'));
        java.classpath.push(path.join(__dirname, '../SourceAfis/jackson-core-2.13.3.jar'));
        java.classpath.push(path.join(__dirname, '../SourceAfis/jackson-databind-2.13.3.jar'));
        java.classpath.push(path.join(__dirname, '../SourceAfis/jackson-dataformat-cbor-2.13.3.jar'));
        java.classpath.push(path.join(__dirname, '../SourceAfis/jnbis-2.1.1.jar'));
        java.classpath.push(path.join(__dirname, '../SourceAfis/noexception-1.8.0.jar'));
        java.classpath.push(path.join(__dirname, '../SourceAfis/slf4j-api-1.7.32.jar'));
        java.classpath.push(path.join(__dirname, '../SourceAfis/slf4j-simple-1.6.1.jar'));
        java.classpath.push(path.join(__dirname, '../SourceAfis/sourceafis-3.17.1.jar'));
        java.classpath.push(path.join(__dirname, '../SourceAfis/stagean-1.2.0.jar'));
        const FingerprintTemplate = java.import('com.machinezoo.sourceafis.FingerprintTemplate');
        const FingerprintMatcher = java.import('com.machinezoo.sourceafis.FingerprintMatcher');
        const FingerprintImage = java.import('com.machinezoo.sourceafis.FingerprintImage');
        const file = java.import('java.nio.file.Files');
        const javapaths = java.import('java.nio.file.Paths');
        console.log('test');
        let longstring = "v2pkaXJlY3Rpb25zmB36QCd5mvpAoZHu+j/V0cz6QGQf5fo/wqrR+j87mcX6P7YBB/pAc9Uc+kCH\n9bD6P+hrUfpAZV+3+j91xyz6P5Lvx/pAg0DT+kDCvsr6QBGeXPpABLaD+kB9DoX6P5Lvx/pAUpdE\n+kCtVxv6P8Kq0fo/mFts+j+2AQf6P423Dfo/VoXw+j+D42P6QIWAxvpAhrSZZmhlaWdodBkBd2pw\nb3NpdGlvbnNYmB0YQhg/GFoYhRhoGIgYbhisGMYYaBh4GKcYgBjIGFEYQRhYGKgYoBh4GDoYWhh2\nGHYYiBisGMQY4RjbanBvc2l0aW9uc1mYHRg4GM4Y4BhSGPQYfBkBSBg8GQFIGMoYuhhsGQFCGHoY\nexh2GLAYeBkBCBiDGKoZATIYyhjqGMYYRhiWGNQZAQhldHlwZXN4HUJCRUJCRUJCQkJFQkJFQkJF\nQkJCRUVFRUJFRUVFZ3ZlcnNpb254GlNvdXJjZUFGSVMgZm9yIEphdmEgMy4xNy4xZXdpZHRoGQEs\n/w==\n";
        let buffer2 = Buffer.from(longstring, 'base64');
        let filedata = fs.readFileSync('localStorage/images/ed6eb89b-c7b9-4d4b-ae6b-6eb7042a84cd.jpeg');
        let buffer = Buffer.from(filedata.toString('utf-8'));
        console.log('buffer length is ', buffer.length);
        console.log('filedata length is ', filedata.length);
        var byte = java.newArray("byte", buffer.toString('utf-8')
            .split('')
            .map(function (c) {
            return java.newByte(String.prototype.charCodeAt(c));
        }));
        console.log('byte is ', byte.length);
        var b = java.newByte(buffer.length);
        b = buffer;
        console.log('b is ', b);
        console.log('b length is ', b.length);
        let image = FingerprintTemplate(b);
        let image2 = FingerprintTemplate(b);
        let matcher = FingerprintMatcher(image);
        matcher.match(image2);
        console.log('matcher is ', matcher);
    }
    testrelation() {
        return this.appService.testrelation();
    }
    registerFingerprint(fingerprintData) {
        return this.appService.registerFingerprint(fingerprintData);
    }
    async fptemplate() {
        return await this.appService.fingerprintTemplate();
    }
    getStatus(req, res) {
        return (0, jade_function_1.jadeTrigger)(res, req);
    }
    async postStatus(req, res, imageData) {
        console.log("message post: ", req.body['submitValue']);
        await (0, jade_function_1.jadeButton)(req, res);
        return await (0, jade_function_1.jadeTrigger)(res, req);
    }
    async testMatch(imageData, req, res) {
        console.log("message post: ", req.body['submitValue']);
        await (0, jade_function_1.changeColor)(res, req);
    }
    async showScore(imageData, req) {
        await console.log('fingerprint ', count++, ': ', imageData['fpid']);
        if (count > 10) {
            count = 1;
        }
    }
    async regMessage(imageData) {
        await console.log(imageData['fpid']);
    }
    async changeColor(imageData, res, req) {
        let num = imageData['fpid'].length;
    }
};
__decorate([
    (0, common_1.Get)('test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "test", null);
__decorate([
    (0, common_1.Get)('testrelation'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "testrelation", null);
__decorate([
    (0, common_1.Post)('registerfp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "registerFingerprint", null);
__decorate([
    (0, common_1.Get)('fptemplate'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "fptemplate", null);
__decorate([
    (0, common_1.Get)('status'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getStatus", null);
__decorate([
    (0, common_1.Post)('status'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Object, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "postStatus", null);
__decorate([
    (0, common_1.Post)('testing'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Request, Response]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "testMatch", null);
__decorate([
    (0, common_1.Post)('score'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Request]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "showScore", null);
__decorate([
    (0, common_1.Post)('display'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "regMessage", null);
__decorate([
    (0, common_1.Post)('color'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Request]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "changeColor", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_zkt_fingerprint_service_1.ZKTFingerprintService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map