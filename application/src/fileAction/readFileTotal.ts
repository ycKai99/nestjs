import fs = require('graceful-fs')
import { makeDirectory } from './makeDirectory'

export function readFileTotal(folder: string) {
    const length = fs.readdirSync(folder).length
    // fs.readdir(folder, (err, files) => {
    //     if (err) {
    //         if (err.code === "ENOENT" || err.code === undefined) {

    //         }
    //     }
    //     return files.length;
    // })
    if (length === 0) {
        makeDirectory(folder.substring(0, folder.length - 1))
    }
    return length;
}