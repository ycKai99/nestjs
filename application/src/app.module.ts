import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { StandardFingerprint } from './Services/app.main.service';
import { ZKTFingerprintService } from './Services/app.zkt_fingerprint.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads'
    })
  ],
  controllers: [AppController],
  providers: [ZKTFingerprintService],
})
export class AppModule { }
