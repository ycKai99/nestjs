import { ZKTFingerprintService } from './zktfingerprint.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: ZKTFingerprintService);
    registerFingerprint(fingerprintData: string): Promise<import("./fileInterface/constSetting").SUCCESS_MESSAGE | import("./fileInterface/constSetting").ERROR_MESSAGE.FAILED_SAVE_IMAGE>;
    verifyFingerprint(): any;
    verifyFpMessage(status: string): void;
    postErrorMessage(req: Request, res: any): string;
    getErrorMessage(res: any): string;
    getStatus(req: any, res: any): string;
    postStatus(req: Request, res: any): string;
}
export declare function res_render(jadefile: any, res: any, jadeargument: any): any;
