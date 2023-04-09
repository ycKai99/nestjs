"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localFpid = void 0;
function localFpid(data) {
    let arr = [];
    data.forEach(element => { arr.push(element['uuid']); });
    return arr;
}
exports.localFpid = localFpid;
//# sourceMappingURL=get_local_fpid.js.map