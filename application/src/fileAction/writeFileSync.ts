import fs = require('graceful-fs')
import { data_full_path, message_full_path } from 'src/fileInterface/constSetting';
import { fingerprintDataInterface } from 'src/fileInterface/fileMessageType.interface';
import { appMessage } from './appMessage';
import { readFileData } from './readFileSync';

export async function writeFileSync(fingerprintData: string, fileData: any) {


  console.log('data is ', fingerprintData)
  console.log('data is ', fingerprintData['fpid'])

  let readMessage = await readFileData(message_full_path)
  // console.log('writeFile is running...')

  let messageDetails = appMessage(fileData)
  let regFingerprint: fingerprintDataInterface = {
    fpid: fingerprintData['fpid'],
    registeredDate: new Date,
    operation: 'Register fingerprint',
    vendor: 'ZKTeco'
  }

  fileData.push(regFingerprint)
  readMessage.push(messageDetails)
  try {
    console.log('file data is ', fileData)
    // console.log("Sent ",readMessage)
    fs.writeFileSync(data_full_path, JSON.stringify(fileData, null, 4))
    fs.writeFileSync(message_full_path, JSON.stringify(readMessage, null, 4))
    console.log('file saved')
  } catch (e) {
    console.log('error is ', e)
  }

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    const second = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }


}