import { Injectable } from '@nestjs/common';
import { onlyFpData } from './fileAction/identifyFp';
import { readFileData } from './fileAction/readFileSync';
import { writeFileSync } from './fileAction/writeFileSync';
import { syncData } from './connectionAction/postDataToCentral';
import { fileMessage, fingerprintDataInterface } from './fileInterface/fileMessageType.interface';
import { data_full_path, message_full_path } from './fileInterface/constSetting';
import { postData } from './connectionAction/postDataToLocal';
import { dataEncryption, dataDecryption } from './fileAction/dataEncryption';
import { Controller, Get, Post, Body, Res, Req, All } from '@nestjs/common';

export interface StandardFingerprintInterface {
  fingerprintData;
  messageData;
  readMessageData()
  readFingerprintData()
  registerFingerprint(data: string)
  verifyFingerprint(status: string)
  identifyFingerprint()
  fingerprintRawData()
}
@Injectable()
export class StandardFingerprint implements StandardFingerprintInterface {

  private verifyFpCount: number = 0; // used to store current turn of result
  private verifyFpTotal: number = 0; // used to store data length of file
  private verifyBool: boolean = true; // used to check whether reached last data or not

  private _fingerprintData; // used to store fingerprint data in local
  private _messageData; // used to store message notification

  constructor() {
    this.readFingerprintData();
    this.readMessageData();
    // this.registerFingerprint(JSON.stringify(data))
    // postData(this.fingerprintData)
    // console.log('fingerprint data is ',this.fingerprintData)
    // console.log('message data is ',this.messageData)
    // this.retrieveTesting()
  }

  // testing purpose
  retrieveTesting() {
    syncData(this.fingerprintData)
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
    return this._fingerprintData;
  }

  // set fingerprint data to this.fingerprintLocalData
  set fingerprintData(data: fingerprintDataInterface) {
    this._fingerprintData.push(data)
  }

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
    this._messageData = readFileData(message_full_path);
  }

  // read all fingerprint data and store it to this.fingerprintLocalData
  readFingerprintData() {
    this._fingerprintData = readFileData(data_full_path);
  }

  // register new fingerprint 
  registerFingerprint(data: string) {
    writeFileSync(data, this._fingerprintData);
    this.readFingerprintData;
  }

  // retrieve only fingerprint data 
  fingerprintRawData() {
    return onlyFpData(this._fingerprintData);
  }

  // verify fingerprint 1 to 1
  async verifyFingerprint() {
    // this.verifyFpTotal = this._fingerprintData.length
    // let check = status['fpid'];
    // do {
    //   console.log('inside do: ', check)
    //   if (this.verifyFpCount < this.verifyFpTotal) {
    //     let fp = this._fingerprintData[this.verifyFpCount]['fpid']
    //     let data = dataEncryption(fp);
    //     this.verifyBool = true;
    //     this.verifyFpCount++;
    //     if (check === 'match') {
    //       this.verifyBool = false;
    //       this.verifyFpCount = 0;
    //       console.log('match');
    //       break;
    //     }
    //     // else {
    //     return data;
    //     // }
    //   }
    //   else {
    //     this.verifyBool = false;
    //     this.verifyFpCount = 0;
    //     // if (check === 'match') {
    //     //   this.verifyBool = false;
    //     //   this.verifyFpCount = 0;
    //     //   console.log('match');
    //     //   break;
    //     // }
    //     console.log('finish');
    //     // console.log(this.verifyFpCount, ', received from java after finish: ', check);
    //     return "finished";
    //   }
    // } while (this.verifyBool);

    // this.verifyFpTotal = this._fingerprintData.length
    // let check = status['fpid'];
    // if (this.verifyFpTotal == 0) {
    //   let data = await dataEncryption("no data");
    //   return data;
    // }
    // if (this.verifyFpCount < this.verifyFpTotal) {
    //   let fp = this.fingerprintData[this.verifyFpCount]['fpid'];
    //   // this.verifyBool = true;
    //   // this.verifyFpCount++
    //   let data = await dataEncryption(fp);
    //   if (check !== 'match') {
    //     // console.log('fp count: ', this.verifyFpCount);
    //     this.verifyBool = true;
    //     this.verifyFpCount++;
    //     // return data;
    //   }
    //   else {
    //     this.verifyBool = false;
    //     this.verifyFpCount = 0;
    //     console.log('match');
    //   }
    //   return data;
    // }
    // else {
    //   this.verifyBool = false;
    //   this.verifyFpCount = 0;
    //   console.log('finish');
    //   return "finished";
    // }

    this.verifyFpTotal = this._fingerprintData.length
    if (this.verifyFpTotal == 0) {
      let data = "no data"
      return data
    }
    else if (this.verifyFpCount < this.verifyFpTotal) {
      let fp = this.fingerprintData[this.verifyFpCount]['fpid']
      this.verifyBool = true;
      this.verifyFpCount++
      let data = await dataEncryption(fp)
      // console.log('encrypted data is ', data)
      return data
    }
    else {
      // this.verifyBool = false;
      this.verifyFpCount = 0;
      let data = "finished"
      // console.log('encrypted data is ', data)
      return data
    }


  }

  verifyFingerprintMessage(message) {
    console.log('Received from java: ', message)
    if (message['fpid'] == "match") {
      this.verifyFpCount = 0;
      console.log('match');
    }
  }

  // identify fingerprint 1 to all
  identifyFingerprint() {

  }
}