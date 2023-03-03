import { ZKTFingerprintService } from './zktfingerprint.service';
import { fingerprintDataInterface } from './fileInterface/fileMessageType.interface';
export declare class AppController {
    private readonly appService;
    constructor(appService: ZKTFingerprintService);
    init(req: Request, res: any): any;
    syncData(req: Request, res: any): any;
    retrieveTesting(): string;
    testing(): fingerprintDataInterface;
    registerFp(registerfp: string): string;
    verifyFp(status: string): string;
    identifyFp(): void;
    getStatus(req: any, res: any): string;
    postStatus(req: Request, res: any): string;
    postErrorMessage(req: Request, res: any): string;
    getErrorMessage(res: any): string;
}
export declare function res_render(jadefile: any, res: any, jadeargument: any): any;
