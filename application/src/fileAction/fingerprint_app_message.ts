import { messageNotificationInterface, fingerprintDataInterface, messageInterface } from 'src/fileInterface/fileMessageType.interface';



export function appMessage(fileNum, operation: string, uuid: string) {
  const now = new Date();
  const year = now.getFullYear();
  const month = ('0' + (now.getMonth() + 1)).slice(-2);
  const day = ('0' + now.getDate()).slice(-2);
  const hours = ('0' + now.getHours()).slice(-2);
  const minutes = ('0' + now.getMinutes()).slice(-2);
  const seconds = ('0' + now.getSeconds()).slice(-2);
  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  let messageDetails: messageNotificationInterface = {
    message: "Fingerprint data",
    ReceivedDate: formattedDateTime,
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
  const now = new Date();
  const year = now.getFullYear();
  const month = ('0' + (now.getMonth() + 1)).slice(-2);
  const day = ('0' + now.getDate()).slice(-2);
  const hours = ('0' + now.getHours()).slice(-2);
  const minutes = ('0' + now.getMinutes()).slice(-2);
  const seconds = ('0' + now.getSeconds()).slice(-2);
  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  let messageDetails: fingerprintDataInterface = {
    fpid: fingerprintData['fpid'],
    registeredDate: formattedDateTime,
    operation: 'Register fingerprint',
    vendor: 'ZKTeco',
    header_messageId: "FP_" + uuid
  }
  return messageDetails;
}

export function handleResponseMessages(data: string, uuid: string) {
  const now = new Date();
  const year = now.getFullYear();
  const month = ('0' + (now.getMonth() + 1)).slice(-2);
  const day = ('0' + now.getDate()).slice(-2);
  const hours = ('0' + now.getHours()).slice(-2);
  const minutes = ('0' + now.getMinutes()).slice(-2);
  const seconds = ('0' + now.getSeconds()).slice(-2);
  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  let messageDetails: messageInterface = {
    time: formattedDateTime,
    message: data,
    header_messageId: "FP_" + uuid
  }
  return messageDetails;
}

export function generateMessage() {
  const now = new Date();
  const year = now.getFullYear();
  const month = ('0' + (now.getMonth() + 1)).slice(-2);
  const day = ('0' + now.getDate()).slice(-2);
  const hours = ('0' + now.getHours()).slice(-2);
  const minutes = ('0' + now.getMinutes()).slice(-2);
  const seconds = ('0' + now.getSeconds()).slice(-2);
  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  let messageDetails: messageNotificationInterface = {
    message: "Fingerprint data to central server",
    ReceivedDate: formattedDateTime,
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
