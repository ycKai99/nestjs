import fs = require('graceful-fs')

export function makeDirectory(dir: string) {
    if (fs.existsSync(dir)) {
        return false;
    } else {
        fs.mkdirSync(dir);
        return true;
    }
  }