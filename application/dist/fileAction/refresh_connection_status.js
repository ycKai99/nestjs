"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refrechConnection = void 0;
const axios_1 = require("axios");
const const_setting_1 = require("../FileInterface/const_setting");
async function refrechConnection() {
    let data;
    await axios_1.default.get(const_setting_1.CHECK_SERVER)
        .then((res) => { console.log('server live'); data = "Online"; })
        .catch((err) => { console.log('server dead'); data = "Offline"; });
    return data;
}
exports.refrechConnection = refrechConnection;
//# sourceMappingURL=refresh_connection_status.js.map