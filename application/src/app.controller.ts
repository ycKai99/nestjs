import { Controller, Get, Post, Body, Res, Req } from '@nestjs/common';
import fs = require('graceful-fs')
import jade = require('jade')
import { ZKTFingerprintService } from './zktfingerprint.service';
import { FINGERPRINT_FOLDER_PATH, ERROR_MESSAGE_FOLDER_PATH, SUBMIT_VALUE } from './fileInterface/constSetting';
import axios from 'axios';
import { readFileData } from './fileAction/fingerprint_read_file_data';
import { fingerprintWriteMessage } from './fileAction/fingerprint_write_message';

@Controller()
export class AppController {
  constructor(private readonly appService: ZKTFingerprintService) { }

  // register fingerprint data
  @Post('registerfp')
  registerFingerprint(@Body() fingerprintData: string) {
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

  @Get('fileNum')
  countFileNum() {
    return this.appService.countFingerprintImage();
  }


  // display error message
  @Post('error')
  async postErrorMessage(@Req() req: Request, @Res() res): Promise<string> {
    const jadeargument: any = {};
    console.log("Message from java server: ", JSON.stringify(req.body, null, 2));
    let data = await readFileData(ERROR_MESSAGE_FOLDER_PATH)
    let errMessage = JSON.parse(JSON.stringify(req.body['fpid'], null, 2));
    let jsonArray = [];
    let jsonObj = JSON.parse(JSON.stringify(jsonArray));
    if (data.length !== 0) {
      data.push(errMessage);
    }
    else {
      jsonObj.push(errMessage);
      data = jsonObj;
    }
    // await fingerprintWriteMessage(ERROR_MESSAGE_FOLDER_PATH, data)
    jadeargument['dataSet1'] = data
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
    let errMessage = JSON.parse(data);
    jadeargument['errMessage'] = errMessage;
    return res.send(res_render('errorMessage', res, jadeargument));

  }

  // GET
  // /status 
  @Get('status')
  getStatus(@Req() req, @Res() res): string {
    //get fingerprint data
    const jadeargument: any = {};
    let data = fs.readFileSync(FINGERPRINT_FOLDER_PATH, {
      encoding: 'utf-8'
    })
    console.log("Status Page reload");
    let fpdata = JSON.parse(data)
    jadeargument['dataSet1'] = fpdata

    //get error message
    const errorMessage: any = {};
    let errorData = fs.readFileSync(ERROR_MESSAGE_FOLDER_PATH, {
      encoding: 'utf8',
    });
    let errMessage = JSON.parse(errorData);
    errorMessage['errMessage'] = errMessage;
    return res.send(res_render('statuspage', res, jadeargument))
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