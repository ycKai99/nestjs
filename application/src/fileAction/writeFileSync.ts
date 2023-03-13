import fs = require('graceful-fs')
import { FINGERPRINT_FOLDER_PATH, MESSAGE_FOLDER_PATH } from 'src/fileInterface/constSetting';
import { appMessage, zktecoFpMessage } from './fingerprint_app_message';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export async function writeFileSync(fingerprintData: string, fileData: any, messageData: any) {

    let uuid = uuidv4(); // generate a random uuid 
    let messageDetails //= appMessage(fileData, uuid) // set the current message data
    let regFingerprint = zktecoFpMessage(fingerprintData, uuid); // set the current fingerprint object

    fileData.push(regFingerprint) // push the current fingerprint data into object
    messageData.push(messageDetails) // push the current message data into object
    try {
      await fs.writeFileSync(FINGERPRINT_FOLDER_PATH, JSON.stringify(fileData,null,4)) // save the fingerprint into file
      await fs.writeFileSync(MESSAGE_FOLDER_PATH, JSON.stringify(messageData,null,4)) // save the message into file
      
      // save the fingerprint and message data to central server
      axios.post('http://192.168.100.46:5050/registerfp',{
      data: regFingerprint,
      message: messageDetails
    })
    .then(res => console.log("res is ",res.data))
    .catch(err => console.log("error is ",err))

    console.log('file saved')
  }catch(e) {
      console.log('error is ',e)
  }
}