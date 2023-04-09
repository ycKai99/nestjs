import { ZKTFingerprintService } from './Services/app.zkt_fingerprint.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: ZKTFingerprintService);
    test(): void;
    testrelation(): void;
    registerFingerprint(fingerprintData: any): void;
    fptemplate(): Promise<string>;
    getStatus(req: any, res: any): any;
    postStatus(req: Request, res: any, imageData: string): Promise<any>;
    testMatch(imageData: string, req: Request): Promise<void>;
    showScore(imageData: string, req: Request): Promise<void>;
    regMessage(imageData: string): Promise<void>;
    changeColor(imageData: string, res: any, req: Request): Promise<any>;
}
