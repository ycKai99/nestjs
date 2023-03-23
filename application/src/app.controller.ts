import { Controller, Get, Post, Body, Res, Req } from '@nestjs/common';
import fs = require('graceful-fs')
import jade = require('jade')
import { ZKTFingerprintService } from './zktfingerprint.service';
import { FINGERPRINT_FOLDER_PATH, ERROR_MESSAGE_FOLDER_PATH, SUBMIT_VALUE, MESSAGE_FOLDER_PATH } from './fileInterface/constSetting';
import axios from 'axios';
import { readFileData } from './fileAction/fingerprint_read_file_data';
var Jimp = require("jimp");
// const path = require('path');
const java = require('java');

java.classpath.push('C:/Users/User/Desktop/fingerprint_Project/github/zkfinger_nestjs_master_branch/JavaScript/application/SourceAfis/commons-io-2.11.0.jar');
java.classpath.push('C:/Users/User/Desktop/fingerprint_Project/github/zkfinger_nestjs_master_branch/JavaScript/application/SourceAfis/fastutil-8.5.6.jar');
java.classpath.push('C:/Users/User/Desktop/fingerprint_Project/github/zkfinger_nestjs_master_branch/JavaScript/application/SourceAfis/fingerprintio-1.3.0.jar');
java.classpath.push('C:/Users/User/Desktop/fingerprint_Project/github/zkfinger_nestjs_master_branch/JavaScript/application/SourceAfis/gson-2.8.9.jar');
java.classpath.push('C:/Users/User/Desktop/fingerprint_Project/github/zkfinger_nestjs_master_branch/JavaScript/application/SourceAfis/jackson-annotations-2.13.3.jar');
java.classpath.push('C:/Users/User/Desktop/fingerprint_Project/github/zkfinger_nestjs_master_branch/JavaScript/application/SourceAfis/jackson-core-2.13.3.jar');
java.classpath.push('C:/Users/User/Desktop/fingerprint_Project/github/zkfinger_nestjs_master_branch/JavaScript/application/SourceAfis/jackson-databind-2.13.3.jar');
java.classpath.push('C:/Users/User/Desktop/fingerprint_Project/github/zkfinger_nestjs_master_branch/JavaScript/application/SourceAfis/jackson-dataformat-cbor-2.13.3.jar');
java.classpath.push('C:/Users/User/Desktop/fingerprint_Project/github/zkfinger_nestjs_master_branch/JavaScript/application/SourceAfis/jnbis-2.1.1.jar');
java.classpath.push('C:/Users/User/Desktop/fingerprint_Project/github/zkfinger_nestjs_master_branch/JavaScript/application/SourceAfis/noexception-1.8.0.jar');
java.classpath.push('C:/Users/User/Desktop/fingerprint_Project/github/zkfinger_nestjs_master_branch/JavaScript/application/SourceAfis/slf4j-api-1.7.32.jar');
java.classpath.push('C:/Users/User/Desktop/fingerprint_Project/github/zkfinger_nestjs_master_branch/JavaScript/application/SourceAfis/SourceAfis-3.17.1.jar');
java.classpath.push('C:/Users/User/Desktop/fingerprint_Project/github/zkfinger_nestjs_master_branch/JavaScript/application/SourceAfis/stagean-1.2.0.jar');
const FingerprintTemplate = java.import('com.machinezoo.sourceafis.FingerprintTemplate');
const FingerprintMatcher = java.import('com.machinezoo.sourceafis.FingerprintMatcher');
const FingerprintImage = java.import('com.machinezoo.sourceafis.FingerprintImage');

let count = 1;

@Controller()
export class AppController {
  constructor(private readonly appService: ZKTFingerprintService) { }

  //testing using SourceAfis
  @Get('testing')
  async testMatch(@Body() imageData: string, @Req() req: Request) {
    //count fp score
    // await console.log('fingerprint ', count++, ': ', imageData['fpid']);
    // if (count > 10) {
    //   count = 1;
    // }

    //convert CBOR to json
    // console.log('fingerprint ', imageData['fpid']);
    // let buffer = Buffer.from(imageData['fpid'], 'base64');
    // const cbor = require('cbor');
    // cbor.decodeAll(buffer, (error, decoded) => {
    //   if (error) {
    //     console.error(error);
    //   } else {
    //     console.log('decoded data: ', decoded);
    //     // let jsontable = JSON.parse(decoded);
    //     let edgeString = JSON.stringify(decoded)
    //     fs.writeFileSync('shuffled-minutiae.json', edgeString)
    //   }
    // });



    const probeTemplate = fs.readFileSync('images/image_1.jpeg'); // Probe fingerprint template
    // const candidateTemplate = fs.readFileSync('images/image_2.jpeg'); // Candidate fingerprint template
    const probebuffer = Buffer.from(probeTemplate.toString('base64'), 'base64');
    let buffer2 = new Uint8Array(probebuffer);
    // const probebuffer1 = Buffer.from(candidateTemplate.toString('base64'), 'base64');
    // let buffer21 = new Uint8Array(probebuffer1);

    // console.log("probe :", buffer2);
    // console.log("candidate :", buffer21);
    // const byteArr = new ArrayBuffer(probeTemplate.length);
    // const view = new Uint8Array(byteArr);
    // for (let i = 0; i < probeTemplate.length; i++) {
    //   view[i] = probeTemplate[i];
    // }
    // const buffer = Buffer.from(imageData['fpid'].replace(/\n/g, ""), 'base64');
    // let buffer2 = new Uint8Array(buffer);

    // let probeArray = new Uint8Array(probeTemplate);


    // Create a Java ByteArray object
    // let byteArray = java.newArray('byte', [buffer2.length]);
    // for (let i = 0; i < probeArray.length; i++) {
    //   byteArray[i] = probeArray[i];
    // }
    // console.log('length: ', byteArray.length)
    // var charArray = java.newArray("char", "hello world\n".split(''));
    // console.log(charArray)
    // let byteArray = java.newArray(
    //   "byte",
    //   buffer.toString('base64')
    //     .split('')
    //     .map(function (c) { return java.newByte(String.prototype.charCodeAt(0)); }));
    // let probe = new FingerprintImage(buffer2);

    // let probe = new FingerprintTemplate(probeImage);
    // const candidate = new FingerprintTemplate(new FingerprintImage(candidateTemplate));

    // probe.toByteArray();
    // candidate.toByteArray();
    // const matcher = new FingerprintMatcher(probeTemplate);
    // const similarity = matcher.match(candidate);
    // console.log(`similarity is ${similarity}`);
    // if (similarity > 100) {
    // } else {
    // }

  }


  // register fingerprint data
  @Post('registerfp')
  registerFingerprint(@Body() fingerprintData: string) {
    // console.log(fingerprintData);
    return this.appService.registerFingerprint(fingerprintData);
  }

  // verify fingerprint 1 to 1
  @Get('verifyfp')
  verifyFingerprint() {
    return this.appService.verifyFingerprint();
  }

  @Post('verify')
  verifyFpMessage(@Body() status: string) {
    let result = status;
    return this.appService.verifyFingerprintMessage(result);
  }

  @Get('fingerprintData')
  fingerprintData() {
    return this.appService.fingerprintData();
  }


  // display error message
  @Post('error')
  async postErrorMessage(@Req() req: Request, @Res() res): Promise<string> {
    const jadeargument: any = {};
    // console.log("Message from java server: ", JSON.stringify(req.body, null, 2));
    let data = await readFileData(ERROR_MESSAGE_FOLDER_PATH);

    //generate time and date
    const now = new Date();
    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const day = ('0' + now.getDate()).slice(-2);
    const hours = ('0' + now.getHours()).slice(-2);
    const minutes = ('0' + now.getMinutes()).slice(-2);
    const seconds = ('0' + now.getSeconds()).slice(-2);
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    switch (req.body['fpid']) {
      case '0':
        console.log('Identify success');
        let verSuccData = { "time": formattedDateTime, "message": 'Identify success' };
        data.push(verSuccData);
        fs.writeFileSync(ERROR_MESSAGE_FOLDER_PATH, JSON.stringify(data));
        break;
      case '1':
        console.log('Identify fail');
        let verFailData = { "time": formattedDateTime, "message": 'Identify fail' };
        data.push(verFailData);
        fs.writeFileSync(ERROR_MESSAGE_FOLDER_PATH, JSON.stringify(data));
        break;
      case '2':
        console.log('Register success');
        let regSuccData = { "time": formattedDateTime, "message": 'Register success' };
        data.push(regSuccData);
        fs.writeFileSync(ERROR_MESSAGE_FOLDER_PATH, JSON.stringify(data));
        break;
      case '3':
        console.log('Register fail');
        let regFailData = { "time": formattedDateTime, "message": 'Register fail' };
        data.push(regFailData);
        fs.writeFileSync(ERROR_MESSAGE_FOLDER_PATH, JSON.stringify(data));
        break;
    }

    // if (data.length !== 0) {
    //   data.push(errMessage);
    // }
    // else {
    //   jsonObj.push(errMessage);
    //   data = jsonObj;
    // }
    // await fingerprintWriteMessage(ERROR_MESSAGE_FOLDER_PATH, data)
    jadeargument['errMessage'] = data
    return res.send(res_render('errorMessage', res, jadeargument));
  }



  // get error message
  @Get('error')
  getErrorMessage(@Res() res): string {
    const jadeargument: any = {};
    let data = fs.readFileSync(ERROR_MESSAGE_FOLDER_PATH, {
      encoding: 'utf8',
    });
    console.log("Message Page reload");
    if (data.length != 0) {
      let errMessage = JSON.parse(data);
      jadeargument['errMessage'] = errMessage;
      return res.send(res_render('errorMessage', res, jadeargument));
    }
    else {
      jadeargument['errMessage'] = {};
      return res.send(res_render('errorMessage', res, jadeargument));

    }
  }

  // GET
  // /status 
  @Get('status')
  getStatus(@Res() res): string {
    //get fingerprint data
    const jadeargument: any = {};
    let data = fs.readFileSync(MESSAGE_FOLDER_PATH, {
      encoding: 'utf-8'
    });
    console.log("Status Page reload");
    if (data.length != 0) {
      let fpdata = JSON.parse(data);
      jadeargument['dataSet1'] = fpdata;
      return res.send(res_render('statuspage', res, jadeargument));
    }
    else {
      jadeargument['dataSet1'] = {};
      return res.send(res_render('statuspage', res, jadeargument));
    }


  }

  // POST
  // /status 
  @Post('status')
  postStatus(@Req() req: Request, @Res() res): string {
    let sendMessage = "";
    console.log("message post: ", req.body['submitValue']);
    switch (req.body['submitValue']) {
      case SUBMIT_VALUE.INITIALIZE_DEVICE:
        sendMessage = SUBMIT_VALUE.INITIALIZE_DEVICE
        console.log('INITIALIZE_DEVICE')
        break;
      case SUBMIT_VALUE.ENROLL_FINGERPRINT:
        // sendMessage = SUBMIT_VALUE.ENROLL_FINGERPRINT
        console.log('ENROLL_FINGERPRINT')
        break;
      case SUBMIT_VALUE.VERIFY_FINGERPRINT:
        // sendMessage = SUBMIT_VALUE.VERIFY_FINGEPRRINT
        console.log('VERIFY_FINGERPRINT')
        break;
      case SUBMIT_VALUE.CLOSE_DEVICE:
        sendMessage = SUBMIT_VALUE.IDENTIFY_FINGERPRINT
        console.log('CLOSE_DEVICE')
        break;
    }
    // if (sendMessage) {
    //   console.log('sendMessage')
    //   axios.post('http://localhost:8080', sendMessage)
    //     .then(res => { console.log('res is ', res.data); })
    //     .catch(err => { console.log('error is ', err) })
    // }

    const jadeargument: any = {};
    let data = fs.readFileSync(FINGERPRINT_FOLDER_PATH, {
      encoding: 'utf8',
    });
    let fpdata = JSON.parse(data);
    jadeargument['dataSet1'] = fpdata

    return res.send(res_render('statuspage', res, jadeargument));
  }
}

export function res_render(jadefile: any, res: any, jadeargument: any) {
  // Compile a function
  let data = fs.readFileSync('views/' + jadefile + '.jade', {
    encoding: 'utf8',
  });
  let renderer = jade.compile(data);

  // Render the function
  let html = renderer({ jadeargument });

  return html;
}