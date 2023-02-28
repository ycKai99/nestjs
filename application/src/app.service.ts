import { Injectable } from '@nestjs/common';
import { identifyFp } from './fileAction/identifyFp';
import { readFileData } from './fileAction/readFileSync';
import { writeFileSync } from './fileAction/writeFileSync';
import { syncData } from './connectionAction/postDataToCentral';
import { fileMessage, fingerprintDataInterface } from './fileInterface/fileMessageType.interface';
import { data_full_path, message_full_path } from './fileInterface/constSetting';
import { postData } from './connectionAction/postDataToLocal';

@Injectable()
export class AppService {

  private verifyFpCount: number = 0; // used to store current turn of result
  private verifyFpTotal: number = 0; // used to store data length of file
  private verifyBool: boolean = true; // used to check whether reached last data or not

  private fingerprintLocalData; // used to store fingerprint data in local
  private messageNotificationData; // used to store message notification

  private tempCount: number = 1;

  constructor() {
    this.readFingerprintData();
    this.readMessageData();
    // let data = [{fp1:{"fp1":"fp1"}}]
    // this.registerFingerprint(JSON.stringify(data))
    // postData(this.fingerprintLocalData,this.tempCount)
  }

  // testing purpose
  retrieveTesting() {
    syncData(this.fingerprintLocalData)
    return "message from local server"
  }

  // testing purpose
  display() {
    let data: fingerprintDataInterface = {
      fpid: 'fp6',
      registeredDate: new Date(),
      operation: 'registeredFingerprint',
      vendor: 'ZKTeco'
    }
    this.fingerprintData = data
    return this.fingerprintData
  }

  // get fingerprint data from this.fingerprintLocalData
  get fingerprintData() {
    return this.fingerprintLocalData;
  }

  // set fingerprint data to this.fingerprintLocalData
  set fingerprintData(data: fingerprintDataInterface) {
    this.fingerprintLocalData.push(data)
  }

  // get message notification data from this.messageNotificationData
  get messageData() {
    return this.messageNotificationData
  }

  // set message data to this.messageNotificationData
  set messageData(data: fileMessage) {
    this.messageNotificationData.push(data)
  }

  // read all message data and store it to this.messageNotificationData
  readMessageData() {
    this.messageNotificationData = readFileData(message_full_path);
  }

  // read all fingerprint data and store it to this.fingerprintLocalData
  readFingerprintData() {
    this.fingerprintLocalData = readFileData(data_full_path);
  }

  // register new fingerprint 
  registerFingerprint(data: string) {
    writeFileSync(data, this.fingerprintData)
    this.readFingerprintData
  }

  // retrieve only fingerprint data 
  fingerprintRawData() {
    return identifyFp(this.fingerprintLocalData);
  }

  // verify fingerprint 1 to 1
  verifyFingerprint() {
    this.verifyFpTotal = this.fingerprintLocalData.length
    do {
      if (this.verifyFpCount < this.verifyFpTotal) {
        let fp = this.fingerprintLocalData[this.verifyFpCount]['fpid']
        this.verifyBool = true;
        this.verifyFpCount++
        return fp
      }
      else {
        this.verifyBool = false;
        this.verifyFpCount = 0;
        return "finished"
      }
    } while (this.verifyBool);
  }

  // identify fingerprint 1 to all
  identifyFingerprint() {

  }
}