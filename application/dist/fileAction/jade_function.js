"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeColor = exports.checkVerified = exports.jadeButton = exports.jadeTrigger = exports.res_render = void 0;
const fs = require("graceful-fs");
const jade = require("jade");
const const_setting_1 = require("../FileInterface/const_setting");
const read_file_data_1 = require("./read_file_data");
const axios_1 = require("axios");
function res_render(jadefile, res, jadeargument) {
    let data = fs.readFileSync('views/' + jadefile + '.jade', {
        encoding: 'utf8',
    });
    let renderer = jade.compile(data);
    let html = renderer({ jadeargument });
    return html;
}
exports.res_render = res_render;
function jadeTrigger(res, req) {
    console.log('page refresh');
    const jadeargument = {};
    let fingerprintTemplateData = (0, read_file_data_1.readFileData)(const_setting_1.FINGERPRINT_TEMPLATE_FILE_PATH);
    jadeargument['fingerprintTemplateData'] = fingerprintTemplateData.reverse();
    jadeargument['fingerprintColor'] = false;
    jadeargument['fingerprintColor_1'] = false;
    jadeargument['fingerprintColor_2'] = false;
    jadeargument['fingerprintColor_3'] = false;
    jadeargument['fingerprintColor_4'] = false;
    jadeargument['fingerprintColor_5'] = false;
    jadeargument['fingerprintColor_6'] = false;
    jadeargument['fingerprintColor_7'] = false;
    jadeargument['fingerprintColor_8'] = false;
    jadeargument['fingerprintColor_9'] = false;
    jadeargument['fingerprintColor_10'] = false;
    jadeargument['fingerprintColor_11'] = false;
    if (req.body['submitValue'] == 'Person_code_01') {
        jadeargument['fingerprintColor'] = true;
        return res.send(res_render('statuspage', res, jadeargument));
    }
    return res.send(res_render('statuspage', res, jadeargument));
}
exports.jadeTrigger = jadeTrigger;
async function jadeButton(req, response) {
    let sendMessage = "";
    const jadeargument = {};
    let result = response;
    switch (req.body['submitValue']) {
        case "INITIALIZE_DEVICE":
            sendMessage = "INITIALIZE_DEVICE";
            break;
        case "ENROLL_FINGERPRINT":
            sendMessage = "ENROLL_FINGERPRINT";
            break;
        case "VERIFY_FINGERPRINT":
            sendMessage = "VERIFY_FINGERPRINT";
            break;
        case "BEGIN_DEVICE":
            sendMessage = "BEGIN_DEVICE";
            break;
        case "CLOSE_FINGERPRINT":
            sendMessage = "CLOSE_FINGERPRINT";
            break;
    }
    if (sendMessage) {
        await axios_1.default.post('http://192.168.242.46:8080', sendMessage)
            .then(res => {
            console.log('message from java:', res.data);
        })
            .catch(err => { console.log('error is ', err); });
    }
}
exports.jadeButton = jadeButton;
function checkVerified(arrayData, person_code, fingerIndex) {
    let verified = false;
    for (let i = 0; i < arrayData.length; i++) {
        if (arrayData['person_code'] === person_code && arrayData['fingerIndex'] === fingerIndex) {
            if (arrayData['status'] === 'verified') {
                verified = true;
            }
        }
    }
    return verified;
}
exports.checkVerified = checkVerified;
function changeColor(res, req) {
    const jadeargument = {};
    let colorData = fs.readFileSync('color.json', {
        encoding: 'utf8',
    });
    if (colorData.length != 0) {
        let fingerprintTemplateData = (0, read_file_data_1.readFileData)(const_setting_1.FINGERPRINT_TEMPLATE_FILE_PATH);
        let fpName = req.body['submitValue'];
        jadeargument['fingerprintTemplateData'] = fingerprintTemplateData.reverse();
        let jsonData = JSON.parse(colorData);
        jsonData.forEach(function (record) {
            if (record.status === false) {
                record.status = true;
            }
        });
        fs.writeFileSync('color.json', JSON.stringify(jsonData, null, 4));
        return res.send(res_render('statuspage', res, jadeargument));
    }
    else {
        let fingerprintTemplateData = (0, read_file_data_1.readFileData)(const_setting_1.FINGERPRINT_TEMPLATE_FILE_PATH);
        jadeargument['fingerprintTemplateData'] = fingerprintTemplateData.reverse();
        for (let i = 0; i < 12; i++) {
            let name = 'fingerprintColor_' + i;
            let jsonObject = [];
            let colorJsonData = { 'name': name, 'status': false };
            jsonObject.push(colorJsonData);
            fs.writeFileSync('color.json', JSON.stringify(jsonObject, null, 4));
        }
        return res.send(res_render('statuspage', res, jadeargument));
    }
}
exports.changeColor = changeColor;
//# sourceMappingURL=jade_function.js.map