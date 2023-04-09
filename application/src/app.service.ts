// import { Injectable } from '@nestjs/common';
// import { readFileData } from './fileAction/fingerprint_read_file_data';
// import { messageNotificationInterface, messageInterface } from './fileInterface/fileMessageType.interface';
// import { RESPONSE_MESSAGE_FILE_PATH, IMAGE_FOLDER, MESSAGE_FOLDER_PATH, ERROR_MESSAGE, SUCCESS_MESSAGE, FINGERPRINT_TEMPLATE_FILE_PATH } from './fileInterface/constSetting';
// import { fingerprintRegister } from './fileAction/fingerprint_register';
// import { fingerprintVerify } from './fileAction/fingerprint_verify';
// import { readFileTotal } from './fileAction/fingerprint_read_file_total';
// import { retrieveFingerprintData } from './fileAction/fingerprint_retrieve_data';
// import { handleResponseMessage } from './fileAction/fingerprint_app_message';
// import { v4 as uuidv4 } from 'uuid';
// import { fingerprintWriteMessage } from './fileAction/fingerprint_write_message';
// import { retrieveFingerprintTemplateData } from './fileAction/fingerprint_retrieve_template_data';
// // import * as ping from 'ping';

// import axios from 'axios';
// import fs = require('graceful-fs')
// export interface StandardFingerprintInterface {
//   readMessageNotificationData(),
//   countFileTotal(),
//   readReturnMessageData(),
//   registerFingerprint(fingerprintData, fingerprintImageTotal),
//   verifyFingerprint(),
//   verifyFingerprintMessage(message: string),
// }
// @Injectable()
// export class StandardFingerprint implements StandardFingerprintInterface {

//   private _messageNotificationData; // used to store message notification
//   private _fingerprintImageTotal; // used to store fingerprint image total
//   private _responseMessageData;
//   private _fingerprintTemplateData;

//   private connectionStatus: 'Online' | 'Offline' = 'Offline';
//   private ScannedFingerPrintArray//:FingerPrintArray; // New scanned record (Not synch with server)
//   private VerifiedFingerPrintArray//:FingerPrintArray; // Verified fingerprint (Synch with server)

//   private readonly remoteUrl = 'http://localhost:5050/'

//   constructor() {
//     this._fingerprintTemplateData = readFileData(FINGERPRINT_TEMPLATE_FILE_PATH);
//     this._messageNotificationData = readFileData(MESSAGE_FOLDER_PATH);
//     this._responseMessageData = readFileData(RESPONSE_MESSAGE_FILE_PATH);
//     this.fingerprintImageTotal = readFileTotal(IMAGE_FOLDER);
//     this.refreshConnectionStatus()
//   }

//   public getConnectionStatus() {
//     return this.connectionStatus;
//   }

//   public async refreshConnectionStatus() {
//     //Ping server
//     // ... set this.connectionStatus as online or offline
//     // try {
//     const res = 'http://localhost:5050/testping'
//     //   ping.sys.probe(res, function(isAlive){
//     //     console.log('isAlive is ',isAlive)
//     //     var msg = isAlive ? 'host ' + res + ' is alive' : 'host ' + res + ' is dead';
//     //     console.log(msg);
//     // });
//     // } catch (error) {
//     //   console.log('error is ',error)
//     // }
//     let result = await axios.get(res)
//       .then(res => { console.log('server live'); return "Online" })
//       .catch(err => { console.log('server dead'); return "Offline"; })
//     this.connectionStatus = result === "Online" ? result : "Offline"
//     this.UpdateLocalStorage()
//   }

//   private Matching() {
//     if (this.getConnectionStatus() == 'Online') {
//       axios.post(this.remoteUrl + 'fptemplate')
//         .then(res => console.log('success register'))
//         .catch(err => console.log('error register'))
//     }
//     else if (this.getConnectionStatus() == 'Offline') {
//       // Local matching
//       return this.PerformMatching()
//     }

//   }

//   public PerformMatching() {
//     // At server called by @controller from Post
//     // At local direct call matching
//     // ....
//     let result = retrieveFingerprintTemplateData(this.fingerprintTemplateData)
//     return result;
//   }
//   // retrieve fingerprint template data from fingerprintTemplateData.json
//   fingerprintTemplate() {
//     return this.Matching();
//   }

//   // register new fingerprint
//   async registerFingerprint(fingerprintData) {
//     await this.RegisterFingerprintData(fingerprintData)
//   }
//   private async RegisterFingerprintData(fingerprintData) {
//     if (this.getConnectionStatus() == 'Online') {
//       axios.post(this.remoteUrl + 'registerfp', fingerprintData)
//         .then(res => console.log('success register'))
//         .catch(err => console.log('error register'))
//     }
//     else if (this.getConnectionStatus() == 'Offline') {
//       await this.PerformRegisterFingerprintData(fingerprintData)
//     }
//   }
//   public async PerformRegisterFingerprintData(fingerprintData) {
//     await fingerprintRegister(fingerprintData, this.fingerprintTemplateData, this.messageNotificationData, this.responseMessageData, this.fingerprintImageTotal);
//     this.fingerprintImageTotal += 1
//     console.log(this.fingerprintImageTotal)
//   }


//   public async UpdateLocalStorage() {
//     // Get all missing FP and add to local storage
//     if (this.getConnectionStatus() == 'Online') {
//       console.log('online')
//       let newVerififedFingerPrints = await this.GetRemoteStorage()
//       newVerififedFingerPrints.syncData.forEach(element => {
//         this._fingerprintTemplateData.push(element)
//         this.VerifiedFingerPrintArray.push(element['header_messageId'])
//       })
//       fingerprintWriteMessage(FINGERPRINT_TEMPLATE_FILE_PATH, this.fingerprintTemplateData);
//       let templateData = this._fingerprintTemplateData
//       console.log('request length is ', newVerififedFingerPrints.requestData.length)
//       if (newVerififedFingerPrints.requestData.length !== 0) {
//         let obj = []
//         let syncImageData = []
//         let syncRemoteData = templateData.filter(x => { return newVerififedFingerPrints.requestData.includes(x['header_messageId']) })
//         syncRemoteData.forEach(element => {
//           syncImageData.push(((fs.readFileSync(element['image_name'])).toString('base64')))
//         });
//         obj.push(syncRemoteData, syncImageData)
//         console.log('syncImageData is ', syncImageData.length)
//         console.log('syncRemoteData is ', syncRemoteData.length)
//         let responseSyncRemoteData = await axios.post(this.remoteUrl + "syncRemoteData", obj)
//       }
//     }
//   }

//   public async GetRemoteStorage() {
//     // Loop and sent all local FPIds
//     let localVerifiedFPIds = this.GetAllVerifiedLocalFPIds();
//     // Post all localFPIds to server and get newFPIds
//     console.log('localVerifuedFpids is ', localVerifiedFPIds.length)
//     let newVerififedFingerPrints = await axios.post(this.remoteUrl + "getNewFPId", localVerifiedFPIds)
//       .then(res => { return res.data; })
//       .catch(err => { console.log('error is ', err.code); })
//     return newVerififedFingerPrints;
//   }

//   public GetAllVerifiedLocalFPIds() {
//     // Loop and get all localVerifiedFPIds
//     let arr = []
//     this.fingerprintTemplateData.forEach(element => {
//       arr.push(element['header_messageId'])
//     });
//     this.VerifiedFingerPrintArray = arr
//     return this.VerifiedFingerPrintArray
//   }

//   public GetServerNewVerifiedFPIds(localVerifiedFPIds) {
//     // At server called by @controller from Post
//     // Filter by new VerifiedFPIds and return to caller
//     let newVerififedFingerPrints = this.VerifiedFingerPrintArray.filter(x => x != localVerifiedFPIds)
//     return newVerififedFingerPrints;
//   }


//   private updateRemoteServerData(data) {

//   }



//   // read all fingerprint template data from fingerprintTemplateData.json
//   // get fingerprint template data
//   // set fingerprint template data
//   readFingerprintTemplateData() {
//     this._fingerprintTemplateData = readFileData(FINGERPRINT_TEMPLATE_FILE_PATH);
//   }
//   get fingerprintTemplateData() {
//     return this._fingerprintTemplateData;
//   }
//   set fingerprintTemplateData(data) {
//     this._fingerprintTemplateData.push(data)
//   }

//   // read all message data and store it to this.messageNotificationData
//   // get message notification data from this.messageNotificationData
//   // set message data to this.messageNotificationData
//   async readMessageNotificationData() {
//     this._messageNotificationData = await readFileData(MESSAGE_FOLDER_PATH);
//   }
//   get messageNotificationData() {
//     return this._messageNotificationData;
//   }
//   set messageNotificationData(data: messageNotificationInterface) {
//     this._messageNotificationData.push(data)
//   }

//   // read return message whether is success or failure
//   // get return message
//   // set return message
//   async readReturnMessageData() {
//     this._responseMessageData = await readFileData(RESPONSE_MESSAGE_FILE_PATH);
//   }
//   get responseMessageData() {
//     return this._responseMessageData;
//   }
//   set responseMessageData(data: messageInterface) {
//     this._responseMessageData.push(data)
//   }

//   // count fingerprint image total
//   // get fingerprint image total
//   // set fingerprint image total

//   get fingerprintImageTotal() {
//     return this._fingerprintImageTotal;
//   }
//   set fingerprintImageTotal(num) {
//     this._fingerprintImageTotal = num;
//   }
//   countFileTotal() {
//     this.fingerprintImageTotal = readFileTotal(IMAGE_FOLDER);
//   }

//   // verify fingerprint 1 to 1
//   async verifyFingerprint() {
//     return await fingerprintVerify(this.fingerprintImageTotal);
//   }
//   verifyFingerprintMessage(message: string) {
//     if (message['fpid'] === "match") { fingerprintVerify(this.fingerprintImageTotal, message['fpid']) }
//   }

//   // retrieve fingerprint data from image
//   fingerprintData() {
//     console.log('this.fingerprintImageTotal is ', this.fingerprintImageTotal)
//     return retrieveFingerprintData(this.fingerprintImageTotal)
//   }

//   // return error message based on 0,1
//   postErrorMessage(message) {
//     let data = readFileData(RESPONSE_MESSAGE_FILE_PATH)
//     let errMessage = JSON.parse(JSON.stringify(message, null, 2));
//     let uuid = uuidv4(); // create uuid v4
//     let responseMessage

//     switch (parseInt(errMessage)) {
//       case 0:
//         responseMessage = handleResponseMessage(ERROR_MESSAGE.VERIFY_FAILED, uuid);
//         data.push(responseMessage);
//         fingerprintWriteMessage(RESPONSE_MESSAGE_FILE_PATH, data);
//         break;
//       case 1:
//         responseMessage = handleResponseMessage(SUCCESS_MESSAGE.SUCCESS_VERIFY, uuid);
//         data.push(responseMessage);
//         fingerprintWriteMessage(RESPONSE_MESSAGE_FILE_PATH, data);
//         break;
//     }
//     return data;
//   }
// }