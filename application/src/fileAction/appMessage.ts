import { fileMessage, fingerprintDataInterface } from 'src/fileInterface/fileMessageType.interface';

export function appMessage(data, uuid) {
    let messageDetails: fileMessage = { 
        message: "Fingerprint data",
        ReceivedDate: new Date(),
        InstanceID: "FP_"+(data.length+1),
        EntityTypeID: "FP_"+(data.length+1),
        EntityTypeName: "Fingerprint",
        ID: "FP_",
        Code: "FPREG9500",
        Operation: "Registered fingerprint",
        DataSource: "FP_"+uuid
      };

      return messageDetails
}

export function zktecoFpMessage(fingerprintData, uuid) {
  let messageDetails: fingerprintDataInterface = {
      fpid: fingerprintData['fpid'],
      registeredDate: new Date(), 
      operation: 'Register fingerprint',
      vendor: 'ZKTeco',
      header_messageId: "FP_"+uuid
  }
  return messageDetails
}



export function generateMessage() {
    let messageDetails: fileMessage = { 
        message: "Fingerprint data to central server",
        ReceivedDate: new Date(),
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