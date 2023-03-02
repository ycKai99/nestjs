/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Res, Req, All } from '@nestjs/common';
import { ZKTFingerprintService } from './zktfingerprint.service';
import { fingerprintDataInterface } from './fileInterface/fileMessageType.interface';
import fs = require('graceful-fs')
import jade = require('jade')
import * as net from 'net'
const axios = require('axios')

@Controller()
export class AppController {
  constructor(private readonly appService: ZKTFingerprintService) { }

  @Post('init')
  init(@Req() req: Request, @Res() res): any {
    let subValue = JSON.parse(JSON.stringify(req.body, null, 2));
    let socket: net.Socket;
    socket = new net.Socket();
    socket.connect(8080, 'localhost', async () => {
      console.log('Connected to Java server');
      socket.write(subValue.submitValue);
      socket.destroy();
    });

  }

  //testing post data to central server
  @Post('sync')
  syncData(@Req() req: Request, @Res() res): any {
    let data = fs.readFileSync('./localStorage/fingerprintData.json', {
      encoding: 'utf-8'
    });
    console.log(data);
    // axios.post('http://localhost:4200/sync', data.toString())
    //   .then(res => { console.log('res is ', res.data) })
    //   .catch(err => { console.log('error is ', err) })
  }



  // testing purpose
  @Get('retrieveTesting')
  retrieveTesting() {
    return this.appService.retrieveTesting();
  }

  // testing purpose
  @Get('testing')
  testing() {
    return this.appService.display()
  }

  // register fingerprint data
  @Post('registerfp')
  registerFp(@Body() registerfp: string) {
    console.log('registerfp is ', registerfp)
    this.appService.registerFingerprint(registerfp)
    return "success"
  }

  // verify fingerprint 1 to 1
  @Get('verifyFp')
  verifyFp() {
    return this.appService.verifyFingerprint();
  }

  // identify fingerprint 1 to all
  @Get('identifyfp')
  identifyFp() {
    return this.appService.identifyFingerprint();
  }

  // GET
  // /status 
  @Get('status')
  getStatus(@Req() req, @Res() res): string {
    const jadeargument: any = {};
    let data = fs.readFileSync('./localStorage/fingerprintData.json', {
      encoding: 'utf-8'
    })
    let fpdata = JSON.parse(data)
    jadeargument['dataSet1'] = fpdata
    return res.send(res_render('statuspage', res, jadeargument))
  }

  // POST
  // /status 
  @Post('status')
  postStatus(@Req() req: Request, @Res() res): string {
    const jadeargument: any = {};
    console.log("Message from java server: ", JSON.stringify(req.body, null, 2));
    let subValue = JSON.parse(JSON.stringify(req.body, null, 2));
    console.log(subValue.submitValue);
    let data = fs.readFileSync('./localStorage/fingerprintData.json', {
      encoding: 'utf8',
    });
    let fpdata = JSON.parse(data);
    jadeargument['dataSet1'] = fpdata
    return res.send(res_render('statuspage', res, jadeargument));
  }



  // display error message
  @Post('error')
  postErrorMessage(@Req() req: Request, @Res() res): string {
    const jadeargument: any = {};
    console.log("Message from java server: ", JSON.stringify(req.body, null, 2));
    let data = fs.readFileSync('./localStorage/errorMessage.json', {
      encoding: 'utf8',
    });
    let errMessage = JSON.parse(JSON.stringify(req.body, null, 2));
    console.log(errMessage);
    let jsonArray = [];
    let jsonObj = JSON.parse(JSON.stringify(jsonArray));
    if (data.length != 0) {
      let pastErrMessage = JSON.parse(data);
      pastErrMessage.push(errMessage);
      console.log(pastErrMessage);
      fs.writeFileSync('./localStorage/errorMessage.json', JSON.stringify(pastErrMessage));
    }
    else {
      jsonObj.push(errMessage);
      fs.writeFileSync('./localStorage/errorMessage.json', JSON.stringify(jsonObj));
    }
    jadeargument['errMessage'] = data;
    return res.send(res_render('errorMessage', res, jadeargument));
  }


  // get error message
  @Get('error')
  getErrorMessage(@Res() res): string {
    const jadeargument: any = {};
    let data = fs.readFileSync('./localStorage/errorMessage.json', {
      encoding: 'utf8',
    });
    let errMessage = JSON.parse(data);
    jadeargument['errMessage'] = errMessage;
    return res.send(res_render('errorMessage', res, jadeargument));
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