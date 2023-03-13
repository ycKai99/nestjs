import { ERROR_MESSAGE, SUCCESS_MESSAGE } from 'src/fileInterface/constSetting';
export declare function fingerprintRegister(fingerprintData: string, fileNum: number): Promise<SUCCESS_MESSAGE.SUCCESS_SAVE_IMAGE | ERROR_MESSAGE.FAILED_SAVE_IMAGE>;
