import { fileMessage } from 'src/fileInterface/fileMessageType.interface';
import { v4 as uuidv4 } from 'uuid';

const uuid = uuidv4();

export function appMessage(data) {
  let messageDetails: fileMessage = {
    message: "Fingerprint data",
    ReceivedDate: new Date(),
    InstanceID: "FP_" + (data.length + 1),
    EntityTypeID: "FP_" + (data.length + 1),
    EntityTypeName: "Fingerprint",
    ID: "FP_",
    Code: "FPREG9500",
    Operation: "Registered fingerprint",
    DataSource: "FP_" + uuid
  };

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
    DataSource: "FP_" + uuid
  };
  return messageDetails
}