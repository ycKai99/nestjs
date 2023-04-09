import { messageNotificationInterface, fingerprintDataInterface, responseMessageInterface, locationTagInterface, locationRelationInterface } from 'src/FileInterface/file_message_type.interface';

export function appMessage(fileNum, operation: string, uuid: string) {
    let messageDetails: messageNotificationInterface = { 
        message: "Fingerprint data",
        ReceivedDate: generateDate(),
        InstanceID: "FP_"+(fileNum+1),
        EntityTypeID: "FP_"+(fileNum+1),
        EntityTypeName: "Fingerprint",
        ID: "FP_",
        Code: "FPREG9500",
        Operation: operation,
        DataSource: "FP_"+uuid
      };
      return messageDetails;
}

export function zktecoFpMessage(fingerprintData, fileName, uuid: string) {
  let messageDetails: fingerprintDataInterface = {
      fpid: fingerprintData,
      registeredDate: generateDate(), 
      status: 'new',
      vendor: 'ZKTeco',
      uuid: "FP_"+uuid,
      imageName: fileName,
      personCode: "person code"
  }
  return messageDetails;
}

export function handleResponseMessage(data: string, uuid: string) {
  let messageDetails: responseMessageInterface = {
    time : generateDate(),
    message: data,
    header_messageId: "FP_"+uuid
  }
  return messageDetails;
}

export function tagMessage(uuid: string) {
  let messageDetails: locationTagInterface = {
    uuid: uuid,
    tag: process.env.LOCATION
  }
  return messageDetails;
}

export function relationMessage(child: string, parent: string) {
  let messageDetails: locationRelationInterface = {
    child: child,
    parent: parent
  }
  return messageDetails;
}

export function generateMessage() {
    let messageDetails: messageNotificationInterface = { 
        message: "Fingerprint data to central server",
        ReceivedDate: generateDate(),
        InstanceID: "FP_testing",
        EntityTypeID: "FP_testing",
        EntityTypeName: "Fingerprint",
        ID: "FP_",
        Code: "FPREG9500",
        Operation: "sync",
        DataSource: "FP_" //+uuid
      };
      return messageDetails
}

export function generateDate() {
  let date = new Date();
  let timezone = "Asia/Singapore"
  let formattedDate = new Intl.DateTimeFormat("en-US", {timeZone: timezone, month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true,}).format(date)
  return formattedDate
}