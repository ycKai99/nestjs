import { fileMessage, fingerprintDataInterface } from './fileInterface/fileMessageType.interface';
export declare class AppService {
    private verifyFpCount;
    private verifyFpTotal;
    private verifyBool;
    private fingerprintLocalData;
    private messageNotificationData;
    private tempCount;
    constructor();
    retrieveTesting(): string;
    display(): fingerprintDataInterface;
    get fingerprintData(): fingerprintDataInterface;
    set fingerprintData(data: fingerprintDataInterface);
    get messageData(): fileMessage;
    set messageData(data: fileMessage);
    readMessageData(): void;
    readFingerprintData(): void;
    registerFingerprint(data: string): void;
    fingerprintRawData(): Promise<any[]>;
    verifyFingerprint(): any;
    identifyFingerprint(): void;
}
