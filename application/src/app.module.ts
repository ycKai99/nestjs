import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { StandardFingerprint } from './app.service';
import { ZKTFingerprintService } from './zktfingerprint.service';


@Module({
  imports: [],
  controllers: [AppController],
  providers: [ZKTFingerprintService],
})
export class AppModule { }
