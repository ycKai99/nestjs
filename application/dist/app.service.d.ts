import { fileMessage } from './fileInterface/fileMessageType.interface';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from './fileInterface/constSetting';
export interface StandardFingerprintInterface {
    readMessageData(): any;
    countFileTotal(): any;
    registerFingerprint(fingerprintData: string, fingerprintImageTotal: number): any;
    verifyFingerprint(): any;
    verifyFingerprintMessage(message: string): any;
}
export declare class StandardFingerprint implements StandardFingerprintInterface {
    private verifyFpCount;
    private fileNum;
    private _fingerprintData;
    private _messageData;
    private _fingerprintImageTotal;
    constructor();
    get messageData(): fileMessage;
    set messageData(data: fileMessage);
    readMessageData(): void;
    countFileTotal(): void;
    get fingerprintImageTotal(): number;
    set fingerprintImageTotal(num: number);
    registerFingerprint(fingerprintData: string): Promise<SUCCESS_MESSAGE | ERROR_MESSAGE.FAILED_SAVE_IMAGE>;
    verifyFingerprint(): any;
    verifyFingerprintMessage(message: string): void;
}
