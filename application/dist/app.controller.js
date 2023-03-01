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
const app_service_1 = require("./app.service");
const fs = require("graceful-fs");
const jade = require("jade");
const net = require("net");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    init(req, res) {
        let subValue = JSON.parse(JSON.stringify(req.body, null, 2));
        let socket;
        socket = new net.Socket();
        socket.connect(8080, 'localhost', async () => {
            console.log('Connected to Java server');
            socket.write(subValue.submitValue);
            socket.destroy();
        });
    }
    retrieveTesting() {
        return this.appService.retrieveTesting();
    }
    testing() {
        return this.appService.display();
    }
    registerFp(registerfp) {
        console.log('registerfp is ', registerfp);
        this.appService.registerFingerprint(registerfp);
        return "success";
    }
    verifyFp() {
        return this.appService.verifyFingerprint();
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
    (0, common_1.Get)('verifyFp'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "verifyFp", null);
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
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
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