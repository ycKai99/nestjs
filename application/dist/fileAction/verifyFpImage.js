"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyImage = void 0;
const fs = require("graceful-fs");
var totalImage = 0;
var currentTurn = 0;
async function verifyImage() {
    fs.readdir("./uploads/", async (err, files) => {
        totalImage = files.length;
        let data = "";
        if (err) {
            data = 'no data';
        }
        else if (currentTurn < totalImage) {
            console.log('file is ', files[currentTurn]);
            let currentFile = await fs.readFileSync("./uploads/" + files[currentTurn]);
            currentTurn++;
            data = currentFile.toString('base64');
            console.log('data is ', data);
        }
        else {
            currentTurn = 0;
            data = "finished";
        }
        return data;
    });
}
exports.verifyImage = verifyImage;
//# sourceMappingURL=verifyFpImage.js.map