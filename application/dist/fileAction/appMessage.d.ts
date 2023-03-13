import { fingerprintDataInterface } from 'src/fileInterface/fileMessageType.interface';
export declare function appMessage(data: any, uuid: any): fileMessage;
export declare function zktecoFpMessage(fingerprintData: any, uuid: any): fingerprintDataInterface;
export declare function generateMessage(): fileMessage;
