import { messageNotificationInterface, fingerprintDataInterface, responseMessageInterface, locationTagInterface, locationRelationInterface } from 'src/FileInterface/file_message_type.interface';
export declare function appMessage(fileNum: any, operation: string, uuid: string): messageNotificationInterface;
export declare function zktecoFpMessage(fingerprintData: any, fileName: any, uuid: string): fingerprintDataInterface;
export declare function handleResponseMessage(data: string, uuid: string): responseMessageInterface;
export declare function tagMessage(uuid: string): locationTagInterface;
export declare function relationMessage(child: string, parent: string): locationRelationInterface;
export declare function generateMessage(): messageNotificationInterface;
export declare function generateDate(): string;
