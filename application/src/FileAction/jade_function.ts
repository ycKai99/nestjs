import fs = require('graceful-fs')
import jade = require('jade')
import { RESPONSE_MESSAGE_FILE_PATH, SUBMIT_VALUE } from 'src/FileInterface/const_setting';
import { readFileData } from './read_file_data';
import axios from 'axios';
import { Controller, Get, Post, Body, Res, Req } from '@nestjs/common';

export function res_render(jadefile: any, res: any, jadeargument: any, registerStatus: any) {
    // Compile a function
    let data = fs.readFileSync('views/' + jadefile + '.jade', {
        encoding: 'utf8',
    });
    let renderer = jade.compile(data);
    // Render the function
    let html = renderer({ jadeargument, registerStatus });
    return html;
}

export function jadeTrigger(res, req) {
    const jadeargument: any = {};
    const registerStatus: any = {};
    // let data = readFileData(FINGERPRINT_TEMPLATE_FILE_PATH)
    let data = readFileData(RESPONSE_MESSAGE_FILE_PATH);
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
    // jadeargument['dataSet1'] = data;
    // return res.send(res_render('statuspage', res, jadeargument));
}

export async function jadeButton(req, imageData: any, response) {
    let sendMessage = "";
    let result: Response = response;
    switch (req.body['submitValue']) {
        case SUBMIT_VALUE.INITIALIZE_DEVICE:
            sendMessage = SUBMIT_VALUE.INITIALIZE_DEVICE
            break;
        case SUBMIT_VALUE.ENROLL_FINGERPRINT:
            sendMessage = SUBMIT_VALUE.ENROLL_FINGERPRINT
            break;
        case SUBMIT_VALUE.VERIFY_FINGERPRINT:
            sendMessage = SUBMIT_VALUE.VERIFY_FINGERPRINT
            break;
        case SUBMIT_VALUE.BEGIN_DEVICE:
            sendMessage = SUBMIT_VALUE.BEGIN_DEVICE
            break;
        case SUBMIT_VALUE.CLOSE_FINGERPRINT:
            sendMessage = SUBMIT_VALUE.CLOSE_FINGERPRINT
            break;
        case '0':
            sendMessage = 'start';
            break;
    }
    if (sendMessage) {
        await axios.post('http://192.168.242.46:8080', sendMessage)
            .then(res => {
                console.log('message from java:', res.data);
                // if (res.data.includes('radio button click')) {
                // triggerColor(result);
                // }
            })
            .catch(err => { console.log('error is ', err) })
    }
}

export function triggerColor(res) {
    const jadeargument: any = {};
    const registerStatus: any = {};
    let data = readFileData(RESPONSE_MESSAGE_FILE_PATH);
    let registrationStatus = true;
    registerStatus['registerSuccess'] = [{ registrationSuccess: registrationStatus }];
    jadeargument['data'] = data.reverse();
    return res.send(res_render('statuspage', res, jadeargument, registerStatus));
}