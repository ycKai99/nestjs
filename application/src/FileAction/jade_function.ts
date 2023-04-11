import fs = require('graceful-fs')
import jade = require('jade')
import { RESPONSE_MESSAGE_FILE_PATH, SUBMIT_VALUE, FINGERPRINT_TEMPLATE_FILE_PATH } from 'src/FileInterface/const_setting';
import { readFileData } from './read_file_data';
import axios from 'axios';

export function res_render(jadefile: any, res: any, jadeargument: any) {
    // Compile a function
    let data = fs.readFileSync('views/' + jadefile + '.jade', {
        encoding: 'utf8',
    });
    let renderer = jade.compile(data);
    // Render the function
    let html = renderer({ jadeargument });
    return html;
}

// render the jade template
export function jadeTrigger(res, req) {
    console.log('page refresh');
    const jadeargument: any = {};

    //default data to display 
    let fingerprintTemplateData = readFileData(FINGERPRINT_TEMPLATE_FILE_PATH);
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

    /*if selected person_code
    {
    
    //logic
    if(checkverified(arraydata,person_code,fingerIndex))
        jadeargument["fingerprintcolor1"]= true 
    

    }*/
    if (req.body['submitValue'] == 'Person_code_01') {
        jadeargument['fingerprintColor'] = true;
        // jadeargument['fingerprintColor_1'] = true;
        // jadeargument['fingerprintColor_2'] = true;
        // jadeargument['fingerprintColor_3'] = true;
        // jadeargument['fingerprintColor_4'] = true;
        // jadeargument['fingerprintColor_5'] = true;
        // jadeargument['fingerprintColor_6'] = true;
        // jadeargument['fingerprintColor_7'] = true;
        // jadeargument['fingerprintColor_8'] = true;
        // jadeargument['fingerprintColor_9'] = true;
        // jadeargument['fingerprintColor_10'] = true;
        // jadeargument['fingerprintColor_11'] = true;
        return res.send(res_render('statuspage', res, jadeargument));
    }

    return res.send(res_render('statuspage', res, jadeargument));
}

// trigger the function of initialize scanner
export async function jadeButton(req, response) {
    let sendMessage = "";
    const jadeargument: any = {};

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
    }
    //send message to java to trigger the function
    if (sendMessage) {
        await axios.post('http://192.168.242.46:8080', sendMessage)
            .then(res => {
                console.log('message from java:', res.data);
            })
            .catch(err => { console.log('error is ', err) })
    }
}



export function checkVerified(arrayData, person_code, fingerIndex) {
    let verified: boolean = false;
    for (let i = 0; i < arrayData.length; i++) {
        if (arrayData['person_code'] === person_code && arrayData['fingerIndex'] === fingerIndex) {
            if (arrayData['status'] === 'verified') {
                verified = true;
            }
        }
    }
    return verified;
}



//testing
export function changeColor(res, req) {
    const jadeargument: any = {};
    let colorData = fs.readFileSync('color.json', {
        encoding: 'utf8',
    });
    if (colorData.length != 0) {
        let fingerprintTemplateData = readFileData(FINGERPRINT_TEMPLATE_FILE_PATH);
        let fpName = req.body['submitValue'];
        jadeargument['fingerprintTemplateData'] = fingerprintTemplateData.reverse();
        // let name = 'fingerprintColor_' + fpName;
        // let colorJsonData = { 'name': name, 'status': true };
        let jsonData = JSON.parse(colorData);
        // jsonData.push(colorJsonData);

        jsonData.forEach(function (record) {
            if (record.status === false) {
                record.status = true;
            }
        });
        fs.writeFileSync('color.json', JSON.stringify(jsonData, null, 4));
        return res.send(res_render('statuspage', res, jadeargument));
    }
    else {
        let fingerprintTemplateData = readFileData(FINGERPRINT_TEMPLATE_FILE_PATH);
        // let fpName = req.body['submitValue'];
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