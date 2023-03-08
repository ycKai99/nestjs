/// <reference types="node" />
import { ZKTFingerprintService } from './zktfingerprint.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: ZKTFingerprintService);
    init(req: Request, res: any): any;
    closeScanner(req: Request, res: any): any;
    retrieveTesting(): string;
    testing(registerfp: string): void;
    registerFp(registerfp: string, req: any): Buffer;
    verify(): Promise<string>;
    verifyFpMessage(status: string): void;
    identifyFp(): void;
    getStatus(req: any, res: any): string;
    postStatus(req: Request, res: any): string;
    postErrorMessage(req: Request, res: any): string;
    getErrorMessage(res: any): string;
}
export declare function res_render(jadefile: any, res: any, jadeargument: any): any;
