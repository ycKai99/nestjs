import fs = require('graceful-fs')

export function fingerprintWriteMessage(filePath: string, data) {
    try {
      fs.writeFileSync(filePath, JSON.stringify(data,null,4));
      return true;
    } catch( err ) {
      return false;
    }
}