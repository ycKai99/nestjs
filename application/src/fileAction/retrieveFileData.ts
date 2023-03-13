import fs = require('graceful-fs')
import { makeDirectory } from './makeDirectory'

export function readFileData(fileName: string) {
    try {
      let rawData = fs.readFileSync(fileName)
      let result;
      if(rawData.length > 0) {result = JSON.parse(rawData.toString())}
      else {result = [];}
      return result
    }catch(err) {
      if(err.code === "ENOENT" || err.code === undefined) {
          makeDirectory("images")
            fs.writeFile(fileName,'', (err) => {
              if(err) {
                console.log('writefile error is ',err)
              }else {
                console.log('success created')
              }
            })
      }
    }
  }