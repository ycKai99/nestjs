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
exports.LocationRelationController = void 0;
const common_1 = require("@nestjs/common");
const write_data_into_file_1 = require("../FileAction/write_data_into_file");
const const_setting_1 = require("../FileInterface/const_setting");
let LocationRelationController = class LocationRelationController {
    constructor() { }
    addRelation(command, fullData, data) {
        fullData.push(data);
        switch (command) {
            case const_setting_1.FPEVENT.LOC_REL:
                return (0, write_data_into_file_1.fingerprintWriteMessage)(const_setting_1.LOCATION_RELATION_FILE_PATH, fullData);
                break;
        }
    }
    deleteRelation(data, delData) {
        const a = data.filter((x) => {
            if (x.child !== delData && x.parent !== delData) {
                return x;
            }
        });
        console.log('data is ', a);
    }
};
LocationRelationController = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], LocationRelationController);
exports.LocationRelationController = LocationRelationController;
//# sourceMappingURL=app.location_relation.service.js.map