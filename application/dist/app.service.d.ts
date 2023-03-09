/// <reference types="node" />
import { fileMessage, fingerprintDataInterface } from './fileInterface/fileMessageType.interface';
export interface StandardFingerprintInterface {
    fingerprintData: any;
    messageData: any;
    readMessageData(): any;
    readFingerprintData(): any;
    registerFingerprint(data: string): any;
    verifyFingerprint(status: string): any;
    identifyFingerprint(): any;
    fingerprintRawData(): any;
}
export declare class StandardFingerprint implements StandardFingerprintInterface {
    private verifyFpCount;
    private verifyFpTotal;
    private verifyBool;
    private _fingerprintData;
    private _messageData;
    private fileSize;
    private fileNum;
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
    verifyFingerprint(): string | Buffer;
    verifyFingerprintMessage(message: any): void;
    identifyFingerprint(): void;
}
