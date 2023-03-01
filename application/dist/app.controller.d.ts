import { AppService } from './app.service';
import { fingerprintDataInterface } from './fileInterface/fileMessageType.interface';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    init(req: Request, res: any): any;
    retrieveTesting(): string;
    testing(): fingerprintDataInterface;
    registerFp(registerfp: string): string;
    verifyFp(): any;
    identifyFp(): void;
    getStatus(req: any, res: any): string;
    postStatus(req: Request, res: any): string;
    errorMessage(req: Request, res: any): string;
}
export declare function res_render(jadefile: any, res: any, jadeargument: any): any;
