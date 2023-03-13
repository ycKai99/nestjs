import fs = require('graceful-fs')
import path = require('path');
import { DIRECTORY } from 'src/fileInterface/constSetting'
import { makeDirectory } from './fingerprint_create_directory'

export function readFileData(fileName: string) {
    try {
      let rawData = fs.readFileSync(fileName)
      let result;
      if(rawData.length > 0) {result = JSON.parse(rawData.toString())} // if file data is larger than 0, pass data
      else {result = [];} // else send empty data
      return result
    }catch(err) {
      if(err.code === "ENOENT" || err.code === undefined) { // if folder or file does not exist
          makeDirectory(DIRECTORY) // create folder
            fs.writeFile(fileName,'', (err) => { // create file
              if(err) {
                console.log('writefile error is ',err)
              }else {
                console.log('success created')
              }
            })
      }
    }
  }