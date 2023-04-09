"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncData = void 0;
const const_setting_1 = require("../FileInterface/const_setting");
const write_data_into_file_1 = require("./write_data_into_file");
const axios_1 = require("axios");
const fs = require("graceful-fs");
function syncData(res, fpTemplateData, uuidArray) {
    if (res.syncData.length !== 0) {
        console.log('syncData length is ', res.syncData.length);
        res.syncData.forEach(element => {
            fpTemplateData.push(element);
            uuidArray.push(element['uuid']);
        });
        (0, write_data_into_file_1.fingerprintWriteMessage)(const_setting_1.FINGERPRINT_TEMPLATE_FILE_PATH, fpTemplateData);
    }
    if (res.requestData.length !== 0) {
        console.log('request length is ', res.requestData.length);
        let obj = [];
        let syncImageData = [];
        let syncRemoteData = fpTemplateData.filter(x => { return res.requestData.includes(x['uuid']); });
        syncRemoteData.forEach(element => {
            syncImageData.push(((fs.readFileSync(element['imageName'])).toString('base64')));
        });
        obj.push(syncRemoteData, syncImageData);
        let countRequest = 0;
        do {
            let arrData = [];
            arrData.push([obj[0][countRequest]], [obj[1][countRequest]]);
            axios_1.default.post(this.remoteUrl + "syncRemoteData", arrData);
            countRequest++;
            console.log('countRequest is ', countRequest);
        } while (countRequest < res.requestData.length);
        console.log('finish sync');
    }
}
exports.syncData = syncData;
//# sourceMappingURL=sync_data.js.map