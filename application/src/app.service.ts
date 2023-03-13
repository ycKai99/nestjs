import { Injectable } from '@nestjs/common';
import { readFileData } from './fileAction/fingerprint_read_file_data';
import { messageNotificationInterface, messageInterface } from './fileInterface/fileMessageType.interface';
import { ERROR_MESSAGE_FOLDER_PATH, IMAGE_FOLDER, MESSAGE_FOLDER_PATH } from './fileInterface/constSetting';
import { fingerprintRegister } from './fileAction/fingerprint_register';
import { fingerprintVerify } from './fileAction/fingerprint_verify';
import { readFileTotal } from './fileAction/fingerprint_read_file_total';
import { retrieveFingerprintData } from './fileAction/fingerprint_retrieve_data';

export interface StandardFingerprintInterface {
  readMessageNotificationData()
  countFileTotal()
  readReturnMessageData()
  registerFingerprint(fingerprintData: string, fingerprintImageTotal: number)
  verifyFingerprint()
  verifyFingerprintMessage(message: string)
}
@Injectable()
export class StandardFingerprint implements StandardFingerprintInterface {

  private _messageNotificationData; // used to store message notification
  private _fingerprintImageTotal; // used to store fingerprint image total
  private _messageData;

  constructor() {
    this.countFileTotal();
    this.readMessageNotificationData();
    this.readReturnMessageData();
    // postData(this.fingerprintData)
    // await syncData(this._fingerprintData,this._messageData)
  }

  // read all message data and store it to this.messageNotificationData
  // get message notification data from this.messageNotificationData
  // set message data to this.messageNotificationData
  async readMessageNotificationData() {
    console.log('read message notification')
    this._messageNotificationData = await readFileData(MESSAGE_FOLDER_PATH);
  }
  get messageNotificationData() {
    return this._messageNotificationData;
  }
  set messageNotificationData(data: messageNotificationInterface) {
    this._messageNotificationData.push(data);
  }

  // read return message whether is success or failure
  // get return message
  // set return message
  async readReturnMessageData() {
    this._messageData = await readFileData(ERROR_MESSAGE_FOLDER_PATH);
  }
  get messageData() {
    return this._messageData;
  }
  set messageData(data: messageInterface) {
    this._messageData.push(data)
  }

  // count fingerprint image total
  // get fingerprint image total
  // set fingerprint image total

  get fingerprintImageTotal() {
    return this._fingerprintImageTotal;
  }
  set fingerprintImageTotal(num) {
    this._fingerprintImageTotal = num;
  }
  countFileTotal() {
    this.fingerprintImageTotal = readFileTotal(IMAGE_FOLDER);
  }


  // register new fingerprint 
  registerFingerprint(fingerprintData: string) {
    this.countFileTotal();
    let result = fingerprintRegister(fingerprintData, this.fingerprintImageTotal, this._messageNotificationData, this._messageData);
    this.readMessageNotificationData();
    this.readReturnMessageData();
    return result;
  }

  // verify fingerprint 1 to 1
  async verifyFingerprint() {
    await this.countFileTotal();
    return await fingerprintVerify(this.fingerprintImageTotal);
  }
  verifyFingerprintMessage(message: string) {
    if (message['fpid'] === "match") { fingerprintVerify(this.fingerprintImageTotal, message['fpid']) }
  }


  fingerprintData() {
    return retrieveFingerprintData(this.fingerprintImageTotal)
  }
}