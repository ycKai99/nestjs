import fs = require('graceful-fs')

var totalImage = 0
var currentTurn = 0

export async function verifyImage() {

        fs.readdir("./uploads/", async (err, files) => {
            totalImage = files.length
            let data = "";
            if(err) {
                data = 'no data'
            }
            else if(currentTurn < totalImage) {
                console.log('file is ',files[currentTurn])
                let currentFile = await fs.readFileSync("./uploads/"+files[currentTurn])
                currentTurn++;
                data = currentFile.toString('base64')
                console.log('data is ',data)
            }
            else {
                currentTurn = 0
                data = "finished"
            }
            return data
        })


    // let currentFile = await fs.readFileSync("./uploads/resize2.png")

    // this.verifyFpTotal = this._fingerprintData.length
    // if(this.verifyFpTotal == 0){
    //   let data = "no data"
    //   return data
    // }   
    // else if(this.verifyFpCount < this.verifyFpTotal){
    //   let fp = this.fingerprintData[this.verifyFpCount]['fpid']
    //   this.verifyFpCount++
    //   let data = fp;
    //   console.log('true data is ',data)
    //   return data
    // }
    // else {
    //   this.verifyFpCount = 0;
    //   let data = "finished"
    //   console.log('false data is ',data)
    //   return data
    // }

    // return currentFile.toString('base64')
}