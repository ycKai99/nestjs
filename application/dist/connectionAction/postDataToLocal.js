"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postData = void 0;
const axios = require('axios');
var CryptoJS = require("crypto-js");
var tempCount = 1;
var tempTotal;
var checkStatus = true;
function postData(fileData) {
    tempTotal = fileData.length;
    let data;
    if (tempTotal <= 0) {
        data = "no data";
        checkStatus = false;
        return checkStatus;
    }
    do {
        if (tempCount <= tempTotal) {
            console.log('tempCount is ', tempCount);
            data = calResult(fileData);
        }
        else {
            console.log('done sent all data');
            data = "done";
            checkStatus = false;
        }
        console.log('run axios');
        axios.post('http://192.168.100.54:8080', data.toString())
            .then(res => { console.log('res is ', res.data); })
            .catch(err => { console.log('error is ', err); });
    } while (checkStatus);
    let socket;
}
exports.postData = postData;
function calResult(fileData) {
    let tempA = [];
    for (let i = tempCount; i < (fileData.length + 1); i++) {
        tempCount += 1;
        tempA.push(fileData[i - 1]['fpid']);
        if (i % 4 == 0) {
            console.log('break');
            break;
        }
    }
    console.log('tempA is ', JSON.stringify(tempA, null, 2));
    return tempA;
}
//# sourceMappingURL=postDataToLocal.js.map