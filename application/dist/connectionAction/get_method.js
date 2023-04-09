"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMethod = void 0;
const axios = require('axios');
async function getMethod(url) {
    let fptemplate = axios.get(url)
        .then(res => {
        console.log('success get method');
        return res.data;
    })
        .catch(err => {
        console.log('error get method : ', err);
        return "error get method : " + err;
    });
    return fptemplate;
}
exports.getMethod = getMethod;
//# sourceMappingURL=get_method.js.map