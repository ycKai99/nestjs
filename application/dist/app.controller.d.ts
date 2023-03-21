import { ZKTFingerprintService } from './zktfingerprint.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: ZKTFingerprintService);
    testMatch(imageData: string, req: Request): void;
    registerFingerprint(fingerprintData: string): import("./fileInterface/constSetting").SUCCESS_MESSAGE | import("./fileInterface/constSetting").ERROR_MESSAGE.FAILED_SAVE_IMAGE;
    verifyFingerprint(): Promise<string | false>;
    verifyFpMessage(status: string): void;
    fingerprintData(): string;
    postErrorMessage(req: Request, res: any): Promise<string>;
    getErrorMessage(res: any): string;
    getStatus(res: any): string;
    postStatus(req: Request, res: any): string;
}
export declare function res_render(jadefile: any, res: any, jadeargument: any): any;
