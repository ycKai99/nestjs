import fs = require('graceful-fs')
import path = require('path');
import { DIRECTORY } from 'src/FileInterface/const_setting';
import { makeDirectory } from './create_directory';

export function readFileData(fileName: string) {
  let result;
    try {
      let rawData = fs.readFileSync(fileName);
      
      if(rawData.length > 0) {result = JSON.parse(rawData.toString());} // if file data is larger than 0, pass data
      else {result = [];} // else send empty data
      
    }catch(err) {
      if(err.code === "ENOENT" || err.code === undefined) { // if folder or file does not exist
          makeDirectory(DIRECTORY); // create folder
            fs.writeFile(fileName,'', (err) => { // create file
              if(err) {
                console.log('writefile error is ',err);
              }else {
                console.log('success created');
              }
            })
      }
    }
    return result;
  }