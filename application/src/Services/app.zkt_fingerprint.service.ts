import { Injectable } from '@nestjs/common';  
import { StandardFingerprint } from './app.main.service';

@Injectable()
export class ZKTFingerprintService extends StandardFingerprint {
    constructor() {
        super();
        this.readFingerprintTemplateData();
        this.readMessageNotificationData();
        this.readReturnMessageData();
        this.countFileTotal();
        this.readLocationTagData();
        this.readLocationRelationData();
        this.refreshConnectionStatus().then((res) =>{
            this.setConnectionStatus(res);
            this.UpdateLocalStorage();
          }).catch((err) => {
            console.log('failed to refresh connection status');
          });
    }
}