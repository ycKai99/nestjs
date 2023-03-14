import { messageNotificationInterface, fingerprintDataInterface, messageInterface } from 'src/fileInterface/fileMessageType.interface';

export function appMessage(fileNum, operation: string, uuid: string) {
  let messageDetails: messageNotificationInterface = {
    message: "Fingerprint data",
    ReceivedDate: new Date(),
    InstanceID: "FP_" + (fileNum + 1),
    EntityTypeID: "FP_" + (fileNum + 1),
    EntityTypeName: "Fingerprint",
    ID: "FP_",
    Code: "FPREG9500",
    Operation: operation,
    DataSource: "FP_" + uuid
  };
  return messageDetails;
}

export function zktecoFpMessage(fingerprintData, uuid: string) {
  let messageDetails: fingerprintDataInterface = {
    fpid: fingerprintData['fpid'],
    registeredDate: new Date(),
    operation: 'Register fingerprint',
    vendor: 'ZKTeco',
    header_messageId: "FP_" + uuid
  }
  return messageDetails;
}

export function handleResponseMessages(data: string, uuid: string) {
  let messageDetails: messageInterface = {
    time: new Date(),
    message: data,
    header_messageId: "FP_" + uuid
  }
  return messageDetails;
}

export function generateMessage() {
  let messageDetails: messageNotificationInterface = {
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
