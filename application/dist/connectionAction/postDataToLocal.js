"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postData = void 0;
const axios = require('axios');
var CryptoJS = require("crypto-js");
var tempCount = 1;
function postData(fileData, tempCount) {
    axios.post('http://localhost:8080', "ciphertext")
        .then(res => console.log("res is ", res.data))
        .catch(err => console.log("error is ", err));
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