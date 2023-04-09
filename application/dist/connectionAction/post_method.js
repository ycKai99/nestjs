"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMethod = void 0;
const axios = require('axios');
async function postMethod(url, data) {
    let newVerififedFingerPrints = await axios.post(url, data)
        .then(res => {
        console.log('success post method');
        return res.data;
    })
        .catch(err => {
        console.log('error get method : ', err.code);
        return "error post method : " + err;
    });
    return newVerififedFingerPrints;
}
exports.postMethod = postMethod;
//# sourceMappingURL=post_method.js.map