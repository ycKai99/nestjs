import fs = require('graceful-fs')
import { file_path } from 'src/fileInterface/constSetting'
import { makeDirectory } from './makeDirectory'

export function readFileData(fileName: string) {
  try {
    let rawData = fs.readFileSync(fileName)
    let result;
    if (rawData.length > 0) { result = JSON.parse(rawData.toString()) }
    else { result = []; }
    return result
  } catch (err) {
    if (err.code === "ENOENT" || err.code === undefined) {
      makeDirectory(file_path.directory)
      fs.writeFile(fileName, '', (err) => {
        if (err) {
          console.log('write file error is ', err)
        } else {
          console.log('success created')
        }
      })
    }
  }
}