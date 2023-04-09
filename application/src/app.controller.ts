import { Controller, Get, Post, Body, Res, Req } from '@nestjs/common';
import { ZKTFingerprintService } from './Services/app.zkt_fingerprint.service';
import { jadeButton, jadeTrigger, triggerColor } from './FileAction/jade_function';
import fs = require('graceful-fs')
import path = require('path');
var java = require("java");
import axios from 'axios';
// import mongoose from 'mongoose'
// import catNames from 'cat-names';
let count = 1;
let fpCount = 0;
let fpNumber = 0;

@Controller()
export class AppController {
  constructor(private readonly appService: ZKTFingerprintService) { }

  @Get('test')
  test() {
    java.classpath.push(path.join(__dirname, '../SourceAfis/commons-io-2.11.0.jar'));
    java.classpath.push(path.join(__dirname, '../SourceAfis/fastutil-8.5.6.jar'))
    java.classpath.push(path.join(__dirname, '../SourceAfis/fingerprintio-1.3.0.jar'));
    java.classpath.push(path.join(__dirname, '../SourceAfis/gson-2.8.9.jar'));
    java.classpath.push(path.join(__dirname, '../SourceAfis/jackson-annotations-2.13.3.jar'));
    java.classpath.push(path.join(__dirname, '../SourceAfis/jackson-core-2.13.3.jar'));
    java.classpath.push(path.join(__dirname, '../SourceAfis/jackson-databind-2.13.3.jar'));
    java.classpath.push(path.join(__dirname, '../SourceAfis/jackson-dataformat-cbor-2.13.3.jar'));
    java.classpath.push(path.join(__dirname, '../SourceAfis/jnbis-2.1.1.jar'));
    java.classpath.push(path.join(__dirname, '../SourceAfis/noexception-1.8.0.jar'));
    java.classpath.push(path.join(__dirname, '../SourceAfis/slf4j-api-1.7.32.jar'));
    java.classpath.push(path.join(__dirname, '../SourceAfis/slf4j-simple-1.6.1.jar'));
    java.classpath.push(path.join(__dirname, '../SourceAfis/sourceafis-3.17.1.jar'));
    java.classpath.push(path.join(__dirname, '../SourceAfis/stagean-1.2.0.jar'));
    const FingerprintTemplate = java.import('com.machinezoo.sourceafis.FingerprintTemplate');
    const FingerprintMatcher = java.import('com.machinezoo.sourceafis.FingerprintMatcher');
    const FingerprintImage = java.import('com.machinezoo.sourceafis.FingerprintImage');
    const file = java.import('java.nio.file.Files');
    const javapaths = java.import('java.nio.file.Paths');
    console.log('test')

    let longstring = "v2pkaXJlY3Rpb25zmB36QCd5mvpAoZHu+j/V0cz6QGQf5fo/wqrR+j87mcX6P7YBB/pAc9Uc+kCH\n9bD6P+hrUfpAZV+3+j91xyz6P5Lvx/pAg0DT+kDCvsr6QBGeXPpABLaD+kB9DoX6P5Lvx/pAUpdE\n+kCtVxv6P8Kq0fo/mFts+j+2AQf6P423Dfo/VoXw+j+D42P6QIWAxvpAhrSZZmhlaWdodBkBd2pw\nb3NpdGlvbnNYmB0YQhg/GFoYhRhoGIgYbhisGMYYaBh4GKcYgBjIGFEYQRhYGKgYoBh4GDoYWhh2\nGHYYiBisGMQY4RjbanBvc2l0aW9uc1mYHRg4GM4Y4BhSGPQYfBkBSBg8GQFIGMoYuhhsGQFCGHoY\nexh2GLAYeBkBCBiDGKoZATIYyhjqGMYYRhiWGNQZAQhldHlwZXN4HUJCRUJCRUJCQkJFQkJFQkJF\nQkJCRUVFRUJFRUVFZ3ZlcnNpb254GlNvdXJjZUFGSVMgZm9yIEphdmEgMy4xNy4xZXdpZHRoGQEs\n/w==\n"
    let buffer2 = Buffer.from(longstring, 'base64')
    let filedata = fs.readFileSync('localStorage/images/ed6eb89b-c7b9-4d4b-ae6b-6eb7042a84cd.jpeg')
    let buffer = Buffer.from(filedata.toString('utf-8'))
    console.log('buffer length is ', buffer.length)
    console.log('filedata length is ', filedata.length)
    var byte = java.newArray(
      "byte",
      buffer.toString('utf-8')
        .split('')
        .map(function (c: any) {
          return java.newByte(String.prototype.charCodeAt(c));
        }));
    console.log('byte is ', byte.length)
    // console.log('buffer is ',buffer)
    var b = java.newByte(buffer.length)
    b = buffer;
    // console.log('javapaths is ',javapaths.Paths.get('/localStorage/images/ed6eb89b-c7b9-4d4b-ae6b-6eb7042a84cd.jpeg'))
    console.log('b is ', b)
    console.log('b length is ', b.length)
    let image = FingerprintTemplate(b)
    let image2 = FingerprintTemplate(b)
    let matcher = FingerprintMatcher(image)
    matcher.match(image2)
    console.log('matcher is ', matcher)
  }

  @Get('testrelation')
  testrelation() {
    return this.appService.testrelation();
  }


  // register fingerprint data
  @Post('registerfp')
  registerFingerprint(@Body() fingerprintData) {
    // fingerprintData['fpid'] = dataDecryption(fingerprintData['fpid'])
    // fingerprintData['fptemplate'] = dataDecryption(fingerprintData['fptemplate'])
    return this.appService.registerFingerprint(fingerprintData);
  }

  // retrieve fingerprint template
  @Get('fptemplate')
  async fptemplate() {
    return await this.appService.fingerprintTemplate();
  }

  @Get('status')
  getStatus(@Req() req, @Res() res) {
    return jadeTrigger(res, req);
    // return triggerColor(res, req);
  }

  // POST
  // /status 
  @Post('status')
  async postStatus(@Req() req: Request, @Res() res, @Body() imageData: string) {
    console.log("message post: ", req.body['submitValue']);
    await jadeButton(req, imageData, res);
    return await jadeTrigger(res, req);

    // fpCount++;
    // if ((fpCount - 1) == fpNumber) {
    //   console.log('All finger finish scan first time.');
    //   fpCount = 0;
    //   fpNumber = 0;
    // }

  }

  @Post('testing')
  async testMatch(@Body() imageData: string, @Req() req: Request) {
    console.log("message post: ", req.body['submitValue']);
    await axios.post('http://192.168.242.46:8080', req.body['submitValue'])
      .then(res => { console.log('message from java: ', res.data); })
      .catch(err => { console.log('error is ', err) })
  }

  @Post('score')
  async showScore(@Body() imageData: string, @Req() req: Request) {
    //count fp score
    await console.log('fingerprint ', count++, ': ', imageData['fpid']);
    if (count > 10) {
      count = 1;
    }
  }

  @Post('display')
  async regMessage(@Body() imageData: string) {
    await console.log(imageData['fpid']);
  }

  @Post('color')
  async changeColor(@Body() imageData: string, @Res() res, @Req() req: Request) {
    // let fpArray = new Array(8);
    let num = imageData['fpid'].length;
    return await triggerColor(res);
  }
}