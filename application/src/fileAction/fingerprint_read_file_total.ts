import fs = require('graceful-fs')
import { makeDirectory } from './fingerprint_create_directory'

export function readFileTotal(folder: string) {
    try {
        const files = fs.readdirSync(folder);
        return files.length
      } catch (err) {
        console.log('err is ',err)
            if(err.code === "ENOENT" || err.code === undefined) { // if folder does not exist
                console.log('err code')
                makeDirectory(folder.substring(0, folder.length-1)) // create folder
            }
      }
}