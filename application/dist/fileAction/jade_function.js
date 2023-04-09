"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.triggerColor = exports.jadeButton = exports.jadeTrigger = exports.res_render = void 0;
const fs = require("graceful-fs");
const jade = require("jade");
const const_setting_1 = require("../FileInterface/const_setting");
const read_file_data_1 = require("./read_file_data");
const axios_1 = require("axios");
function res_render(jadefile, res, jadeargument, registerStatus) {
    let data = fs.readFileSync('views/' + jadefile + '.jade', {
        encoding: 'utf8',
    });
    let renderer = jade.compile(data);
    let html = renderer({ jadeargument, registerStatus });
    return html;
}
exports.res_render = res_render;
function jadeTrigger(res, req) {
    const jadeargument = {};
    const registerStatus = {};
    let data = (0, read_file_data_1.readFileData)(const_setting_1.RESPONSE_MESSAGE_FILE_PATH);
    console.log('page refresh');
    if (req.body['submitValue'] != 0) {
        let registrationStatus = false;
        registerStatus['registerSuccess'] = [{ registrationSuccess: registrationStatus }];
        jadeargument['data'] = data.reverse();
        return res.send(res_render('statuspage', res, jadeargument, registerStatus));
    }
    else {
        let registrationStatus = true;
        registerStatus['registerSuccess'] = [{ registrationSuccess: registrationStatus }];
        jadeargument['data'] = data.reverse();
        return res.send(res_render('statuspage', res, jadeargument, registerStatus));
    }
}
exports.jadeTrigger = jadeTrigger;
async function jadeButton(req, imageData, response) {
    let sendMessage = "";
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
        case '0':
            sendMessage = 'start';
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
function triggerColor(res) {
    const jadeargument = {};
    const registerStatus = {};
    let data = (0, read_file_data_1.readFileData)(const_setting_1.RESPONSE_MESSAGE_FILE_PATH);
    let registrationStatus = true;
    registerStatus['registerSuccess'] = [{ registrationSuccess: registrationStatus }];
    jadeargument['data'] = data.reverse();
    return res.send(res_render('statuspage', res, jadeargument, registerStatus));
}
exports.triggerColor = triggerColor;
//# sourceMappingURL=jade_function.js.map