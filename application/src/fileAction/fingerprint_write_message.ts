import fs = require('graceful-fs')

export function fingerprintWriteMessage(filePath: string, data) {
    let returnMessage: boolean = true;
    fs.stat(filePath, (err,stat) => { // using fs.stat to check the file
        if (err === null) { // if file is exist then append the data
            fs.appendFileSync(filePath, JSON.stringify(data,null,4));
            console.log('Data is append into file...')
          } else if (err.code === 'ENOENT') { // if file is not exist then create and write the data
            fs.writeFileSync(filePath, JSON.stringify(data,null,4));
            console.log('Data is written into file...')
          } else { // else got file error
            returnMessage = false;
            console.log('Failed to write data into file...')
          }
    })
    return returnMessage;
}