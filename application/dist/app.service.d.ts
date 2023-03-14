import { messageNotificationInterface, messageInterface } from './fileInterface/fileMessageType.interface';
export interface StandardFingerprintInterface {
    readMessageNotificationData(): any;
    countFileTotal(): any;
    readReturnMessageData(): any;
    registerFingerprint(fingerprintData: string, fingerprintImageTotal: number): any;
    verifyFingerprint(): any;
    verifyFingerprintMessage(message: string): any;
}
export declare class StandardFingerprint implements StandardFingerprintInterface {
    private _messageNotificationData;
    private _fingerprintImageTotal;
    private _messageData;
    constructor();
    readMessageNotificationData(): Promise<void>;
    get messageNotificationData(): messageNotificationInterface;
    set messageNotificationData(data: messageNotificationInterface);
    readReturnMessageData(): Promise<void>;
    get messageData(): messageInterface;
    set messageData(data: messageInterface);
    get fingerprintImageTotal(): any;
    set fingerprintImageTotal(num: any);
    countFileTotal(): void;
    registerFingerprint(fingerprintData: string): import("./fileInterface/constSetting").SUCCESS_MESSAGE | import("./fileInterface/constSetting").ERROR_MESSAGE.FAILED_SAVE_IMAGE;
    verifyFingerprint(): Promise<string | false>;
    verifyFingerprintMessage(message: string): void;
    countFingerprintImage(): number;
    fingerprintData(): string;
}
