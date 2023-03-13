import { messageNotificationInterface, fingerprintDataInterface, messageInterface } from 'src/fileInterface/fileMessageType.interface';
export declare function appMessage(fileNum: any, operation: string, uuid: string): messageNotificationInterface;
export declare function zktecoFpMessage(fingerprintData: any, uuid: string): fingerprintDataInterface;
export declare function returnMessage(data: string, uuid: string): messageInterface;
export declare function generateMessage(): messageNotificationInterface;
