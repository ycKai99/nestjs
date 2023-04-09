import { Injectable } from '@nestjs/common';  
import { messageNotificationInterface, responseMessageInterface, fingerprintDataInterface, connectionInterface, locationTagInterface, locationRelationInterface } from '../FileInterface/file_message_type.interface';
import { REMOTE_SERVER, FPEVENT } from '../FileInterface/const_setting';
import { fingerprintRegister } from '../FileAction/register';
import { retrieveFingerprintTemplateData } from '../FingerprintAction/retrieve_template_data';
import { refrechConnection } from '../FileAction/refresh_connection_status';
import { handleErrorMessage } from '../FileAction/handle_error_message';
import { getMethod } from '../ConnectionAction/get_method';
import { postMethod } from '../ConnectionAction/post_method';
import { localFpid } from '../FileAction/get_local_fpid';
import { syncData } from '../FileAction/sync_data';
import { StorageController } from './app.storage.service';
import { LocationTagController } from './app.location_tag.service';
import { LocationRelationController } from './app.location_relation.service';
import { relationMessage } from 'src/FileAction/generate_message';
export interface StandardFingerprintInterface {

  getConnectionStatus(); // return current connection status
  setConnectionStatus(data: connectionInterface);
  refreshConnectionStatus(); // used to check current connection status is "Online" or "Offline"

  PerformfingerprintTemplateMatching(); // local server : retrieve fingerprint template data
  fingerprintTemplate(); // triggered fingerprintTemplateMatching()

  registerFingerprint(fingerprintData); // pass fingerprint data to RegisterFingerprintData()
  UpdateLocalStorage(); // sync local storage when connection status is online
  GetRemoteStorage(); // get remote storage sync data
  GetAllVerifiedLocalFPIds(); // get local uuid

  readFingerprintTemplateData(); // read fingerprint template data from file
  getFingerprintTemplateData(); // return fingerprint template data
  setFingerprintTemplateData(data: fingerprintDataInterface); // push fingerprint template data

  readMessageNotificationData(); // read registered fingerprint message data from file
  getMessageNotificationData(); // return message data
  setMessageNotificationData(data: messageNotificationInterface); // push message data

  readReturnMessageData(); // read response message data from file
  getResponseMessageData(); // return response message data
  setResponseMessageData(data: responseMessageInterface); // push response message data

  countFileTotal(); // count fingerprint image total
  getFingerprintImageTotal(); // return fingerprint image total
  setFingerprintImageTotal(num: number); // set fingerprint image total

  readLocationTagData() // return location tag data
  getLocationTagData(): locationTagInterface[]
  setLocationTagData(data: locationTagInterface) // push location tag data

  readLocationRelationData() // return location relation data
  getLocationRelationData(): locationRelationInterface[]
  setLocationRelationData(data: locationRelationInterface) // push location relation data

  postErrorMessage(message: string); // return error message
}
@Injectable()
export class StandardFingerprint implements StandardFingerprintInterface{

  private _messageNotificationData: messageNotificationInterface[] = []; // store message notification
  private _fingerprintImageTotal: number = 0; // store fingerprint image total
  private _responseMessageData: responseMessageInterface[] = []; // store success/error message 
  private _fingerprintTemplateData: fingerprintDataInterface[] = []; // store fingerprint template
  private _addLocationTag: locationTagInterface[] = [];
  private _addLocationRelation: locationRelationInterface[] = [];

  private connectionStatus: connectionInterface = "Online";
	private VerifiedUUIDArray: string[] = []; // Verified UUID (Synch with server)

  private readonly remoteUrl = REMOTE_SERVER;

  private storageController: StorageController = new StorageController();
  private locationTagController: LocationTagController = new LocationTagController();
  private locationRelationController: LocationRelationController = new LocationRelationController();

  constructor() {}

  public getConnectionStatus(): string { // return current connection status
	   return this.connectionStatus;
	}
  public setConnectionStatus(data: connectionInterface) { // set current connection status
    this.connectionStatus = data;
  }

  // used to check current connection status is "Online" or "Offline"
	public async refreshConnectionStatus(): Promise<connectionInterface> {
    return await refrechConnection();
	}

  // method used to retrieve fingerprint template
	private fingerprintTemplateMatching() {
	   if(this.getConnectionStatus() == 'Online') { // if status is online : used remote server method
      return getMethod(this.remoteUrl+'fptemplate'); // remote server retrieve fingerprint template
	   }
	   else if(this.getConnectionStatus() == 'Offline') { // if status is offline : used local server method
		   return this.PerformfingerprintTemplateMatching() // Local server retrieve fingerprint template
	   }
	}
	
  // perform local server retrieve fingerprint template
	public PerformfingerprintTemplateMatching(): string { 
    return retrieveFingerprintTemplateData(this._fingerprintTemplateData)
	}
  // retrieve fingerprint template data from fingerprintTemplateData.json
  async fingerprintTemplate() {
    return await this.fingerprintTemplateMatching();
  }

  // register new fingerprint 
  public registerFingerprint(fingerprintData) {
    this.RegisterFingerprintData(fingerprintData)
  }

  // method used to register fingerprint data, write message
  private RegisterFingerprintData(fingerprintData) {
	  if(this.getConnectionStatus() == 'Online') { // if status is online : used remote server method
      postMethod(this.remoteUrl+'registerfp', fingerprintData)
	  }
	  else if(this.getConnectionStatus() == 'Offline') { // if status is offline : used local server method
		  this.PerformRegisterFingerprintData(fingerprintData)
	  }
	}

  // register fingerprint data into local server
	private PerformRegisterFingerprintData(fingerprintData) {
    fingerprintRegister(fingerprintData, this._fingerprintTemplateData, this._messageNotificationData,this._responseMessageData, this._fingerprintImageTotal, this._addLocationTag, this.storageController.writeData, this.locationTagController.addLocationTag)
      .then((res) => {
        if(res.length === undefined) {console.log('failed')}
        else {this._fingerprintImageTotal += 1;}
      })
      .catch((err) => {console.log('error register : ',err)})
	}
	
  // sync local storage when connection status is online
	public UpdateLocalStorage() {
		if(this.getConnectionStatus() == 'Online') {
      this.GetRemoteStorage().then((res) => { // Get all missing FP and add to local storage
        syncData(res, this._fingerprintTemplateData, this.VerifiedUUIDArray)
      }).catch((err) => {console.log('get remote storage then catch error')})
    }
	}
	
  // get remote storage sync data
	public GetRemoteStorage() {
		let localVerifiedFPIds = this.GetAllVerifiedLocalFPIds(); // Loop and sent all local FPIds
    return postMethod(this.remoteUrl+"getNewFPId", localVerifiedFPIds); // Post all localFPIds to server and get newFPIds
	}
	
  // get local uuid
	public GetAllVerifiedLocalFPIds(): string[] {
    this.VerifiedUUIDArray = localFpid(this._fingerprintTemplateData) // Loop and get all localVerifiedFPIds
    return this.VerifiedUUIDArray;
	}

  // read all fingerprint template data from fingerprintTemplateData.json
  public readFingerprintTemplateData() {
    this._fingerprintTemplateData = this.storageController.readData(FPEVENT.FP_TPL_MSG);
  }
  // get fingerprint template data
  public getFingerprintTemplateData(): fingerprintDataInterface[] {
    return this._fingerprintTemplateData;
  }
  // push fingerprint template data
  public setFingerprintTemplateData(data: fingerprintDataInterface) {
    this._fingerprintTemplateData.push(data)
  }

  // read all message data from registeredFingerprintMessage.json
  public readMessageNotificationData() {
    this._messageNotificationData = this.storageController.readData(FPEVENT.NOTIF_MSG);
  }
  // return message data
  public getMessageNotificationData(): messageNotificationInterface[] {
    return this._messageNotificationData;
  }
  // push message data
  public setMessageNotificationData(data: messageNotificationInterface) {
    this._messageNotificationData.push(data)
  }

  // read response message data from handleResponseMessage.json
  public readReturnMessageData() {
    this._responseMessageData = this.storageController.readData(FPEVENT.RES_MSG);
  }
  // return response message data
  public getResponseMessageData(): responseMessageInterface[] {
    return this._responseMessageData;
  }
  // push response message data
  public setResponseMessageData(data: responseMessageInterface) {
    this._responseMessageData.push(data)
  }

  // count fingerprint image total
  public countFileTotal() {
    this._fingerprintImageTotal = this.storageController.readData(FPEVENT.IMG_TTL);
  }
  // return fingerprint image total
  public getFingerprintImageTotal(): number {
    return this._fingerprintImageTotal;
  }
  // set fingerprint image total
  public setFingerprintImageTotal(num: number) {
    this._fingerprintImageTotal = num;
  }

  public readLocationTagData() {
    this._addLocationTag = this.storageController.readData(FPEVENT.LOC_TAG);
  }
  // return response message data
  public getLocationTagData(): locationTagInterface[] {
    return this._addLocationTag;
  }
  // push response message data
  public setLocationTagData(data: locationTagInterface) {
    this._addLocationTag.push(data)
  }

  public readLocationRelationData() {
    this._addLocationRelation = this.storageController.readData(FPEVENT.LOC_REL);
  }
  // return response message data
  public getLocationRelationData(): locationRelationInterface[] {
    return this._addLocationRelation;
  }
  // push response message data
  public setLocationRelationData(data: locationRelationInterface) {
    this._addLocationRelation.push(data)
  }

  // return error message based on 0,1
  public postErrorMessage(message: string) {
    return handleErrorMessage(message)
  }


  public testrelation() {
    // let data = relationMessage("code6","code2")
    // this.locationRelationController.addRelation(FPEVENT.LOC_REL,this._addLocationRelation,data)

    // this.locationRelationController.deleteRelation(this._addLocationRelation,"code2")
  }
}