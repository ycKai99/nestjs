/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Res, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { fingerprintDataInterface } from './fileInterface/fileMessageType.interface';
import fs = require('graceful-fs')
import jade = require('jade')
import * as net from 'net'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

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

    // const jadeargument: any = {};
    // console.log("Message from java server: ", JSON.stringify(req.body, null, 2));
    // let data = fs.readFileSync('./localStorage/fingerprintData.json', {
    //   encoding: 'utf8',
    // });
    // let fpdata = JSON.parse(data);
    // jadeargument['dataSet1'] = fpdata
    // return res.send(res_render('statuspage', res, jadeargument));
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