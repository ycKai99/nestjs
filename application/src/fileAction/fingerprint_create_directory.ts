import fs = require('graceful-fs')

export function makeDirectory(dir: string) {
    if (fs.existsSync(dir)) { // if folder is exist then return false
        console.log('Folder exists...')
        return false;
    } else { // if folder not exist then create folder
        fs.mkdirSync(dir);
        console.log('Folder created...')
        return true;
    }
  }