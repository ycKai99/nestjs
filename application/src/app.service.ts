import { Injectable } from '@nestjs/common';
import { readFileData } from './fileAction/retrieveFileData';
import { syncData } from './connectionAction/postDataToCentral';
import { fileMessage, fingerprintDataInterface } from './fileInterface/fileMessageType.interface';
import { ERROR_MESSAGE, FILE_EXTENSION, FINGERPRINT_FOLDER_PATH, IMAGE_FOLDER, MESSAGE_FOLDER_PATH, SUCCESS_MESSAGE } from './fileInterface/constSetting';
import { postData } from './connectionAction/postDataToLocal';
import { dataEncryption } from './fileAction/dataEncryption';
import fs = require('graceful-fs')
import { fingerprintRegister } from './fileAction/fingerprintRegister';
import { fingerprintVerify } from './fileAction/fingerprintVerify';
import { readFileTotal } from './fileAction/readFileTotal';

export interface StandardFingerprintInterface {
  readMessageData()
  countFileTotal()
  registerFingerprint(fingerprintData: string, fingerprintImageTotal: number)
  verifyFingerprint()
  verifyFingerprintMessage(message: string)
}
@Injectable()
export class StandardFingerprint implements StandardFingerprintInterface {

  private verifyFpCount: number = 1; // used to store current turn of result
  private fileNum: number = 0; // used to store data length of file
  // private verifyBool: boolean = true; // used to check whether reached last data or not

  private _fingerprintData; // used to store fingerprint data in local
  private _messageData; // used to store message notification
  private _fingerprintImageTotal;

  constructor() {
    this.countFileTotal();
    this.readMessageData();
    // postData(this.fingerprintData)
    // await syncData(this._fingerprintData,this._messageData)
  }

  // get fingerprint data from this.fingerprintLocalData
  // get fingerprintData() {
  //   return this._fingerprintData;
  // }

  // // set fingerprint data to this.fingerprintLocalData
  // set fingerprintData(data: fingerprintDataInterface) {
  //   this._fingerprintData = data
  // }

  // get message notification data from this.messageNotificationData
  get messageData() {
    return this._messageData
  }

  // set message data to this.messageNotificationData
  set messageData(data: fileMessage) {
    this._messageData.push(data)
  }

  // read all message data and store it to this.messageNotificationData
  readMessageData() {
    this._messageData = readFileData(MESSAGE_FOLDER_PATH);
  }

  // // read all fingerprint data and store it to this.fingerprintLocalData
  // readFingerprintData() {
  //   this._fingerprintData = readFileData(FINGERPRINT_FOLDER_PATH);
  // }

  // count fingerprint image total
  countFileTotal() {
    this._fingerprintImageTotal = readFileTotal(IMAGE_FOLDER);
  }
  get fingerprintImageTotal() {
    return this._fingerprintImageTotal
  }
  set fingerprintImageTotal(num: number) {
    this._fingerprintImageTotal = num
  }


  // register new fingerprint 
  async registerFingerprint(fingerprintData: string) {
    console.log('fingerprintImageTotal is ', this.fingerprintImageTotal)
    await this.countFileTotal()
    let result = await fingerprintRegister(fingerprintData, this.fingerprintImageTotal);

    return result
    // await this.readMessageData()
  }

  // verify fingerprint 1 to 1
  verifyFingerprint() {

    return fingerprintVerify(this.verifyFpCount, this.fingerprintImageTotal);
  }
  verifyFingerprintMessage(message: string) {
    console.log('message is ', message)
    if (message === "match success") { this.verifyFpCount = 0 }
  }
}