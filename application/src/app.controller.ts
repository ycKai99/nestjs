/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Res, Req, All } from '@nestjs/common';
import { ZKTFingerprintService } from './zktfingerprint.service';
import { fingerprintDataInterface } from './fileInterface/fileMessageType.interface';
import fs = require('graceful-fs')
import jade = require('jade')
import * as net from 'net'
import { syncData } from './connectionAction/postDataToCentral';
const axios = require('axios')
// const sharp = require('sharp');

@Controller()
export class AppController {
  private verifyFpCount: number = 0;
  private fileSize: number = 0;
  constructor(private readonly appService: ZKTFingerprintService) {

  }


  //open the scanner
  @Post('init')
  init(@Req() req: Request, @Res() res): any {
    let subValue = JSON.parse(JSON.stringify(req.body, null, 2));
    let socket: net.Socket;
    socket = new net.Socket();
    socket.connect(8080, 'localhost', async () => {
      console.log('Connected to Java server');
      socket.write('open');
      // socket.destroy();
    });
  }

  // close the scanner
  @Post('closeScanner')
  closeScanner(@Req() req: Request, @Res() res): any {
    let subValue = JSON.parse(JSON.stringify(req.body, null, 2));
    let socket: net.Socket;
    socket = new net.Socket();
    socket.connect(8080, 'localhost', async () => {
      console.log('Connected to Java server');
      socket.write('close');
      // socket.destroy();
    });
  }


  // testing purpose
  @Get('retrieveTesting')
  retrieveTesting() {
    return this.appService.retrieveTesting();
  }

  // testing for sending the image data
  @Get('testing')
  testing() {
    const dir = 'images/';
    fs.readdir(dir, (err, files) => {
      let fileNum = files.length;
      const fileSize = fileNum;
      const fileExtension = '.jpeg';
      const fileName = `${dir}image_${fileNum + 1}${fileExtension}`;
      if (fileNum == 0) {
        let data = "no data"
        return data
      }
      else if (this.verifyFpCount < fileNum) {
        // for (let i = 0; i < fileNum; i++) {
        let imageData = fs.readFileSync(`${dir}image_${fileSize}${fileExtension}`);
        this.verifyFpCount++;
        this.fileSize--;
        return imageData;
        // }
      }
      else {
        this.verifyFpCount = 0;
        let data = 'finished';
        return data;
      }
      if (err) console.log(err);
    });

    // get the image and return buffer
    // const newbuffer = fs.readFileSync('images/image.jpeg');
    // return newbuffer.toString('base64');
  }

  // register fingerprint data
  @Post('registerfp')
  registerFp(@Body() registerfp: string) {
    // console.log('registerfp is ', registerfp['fpid']);

    // count file number
    const dir = 'images/';
    fs.readdir(dir, (err, files) => {
      console.log(files.length);
      if (files.length != 0) {
        let fileNum = files.length;
        const fileExtension = '.jpeg';
        const fileName = `${dir}image_${fileNum + 1}${fileExtension}`;

        let result = registerfp['fpid'].replace(/\n/g, "");
        const buffer = Buffer.from(result, 'base64');
        console.log('original image buffer length: ', buffer.length);

        // Jimp read buffer and compress image
        var Jimp = require("jimp");
        Jimp.read(buffer, (err, data) => {
          if (err) throw err;
          data
            .resize(300, 400) // resize
            .quality(60) // set JPEG quality
            .write(fileName); // save
          console.log('image save');
        });
      }
      else {
        let result = registerfp['fpid'].replace(/\n/g, "");
        const buffer = Buffer.from(result, 'base64');
        console.log('original image buffer length: ', buffer.length);

        // Jimp read buffer and compress image
        var Jimp = require("jimp");
        Jimp.read(buffer, (err, data) => {
          if (err) throw err;
          data
            .resize(300, 400) // resize
            .quality(60) // set JPEG quality
            .write('images/image_1.jpeg'); // save
          console.log('image save');
        });
      }

      if (err) console.log(err);
    });

    // Jimp read buffer function
    // Jimp.read(buffer)
    //   .then(async (image) => {
    //     // Do stuff with the image.
    //     image.resize(300, 400);
    //     image.quality(50);
    //     let imageBuff = image.getBufferAsync('image/JPEG');
    //     // await fs.writeFileSync('test.txt', JSON.stringify(imageBuff));
    //   })
    //   .catch((err) => {
    //     // Handle an exception.
    //     console.log('error: ', err);
    //   });

    // return image buffer to java
    // const newbuffer = fs.readFileSync('image.jpeg');
    // console.log('new image buffer length: ', newbuffer.length);
    // return newbuffer;

    // socket part
    // let socket: net.Socket;
    // socket = new net.Socket();
    // socket.connect(8080, 'localhost', async () => {
    //   console.log('Connected to Java server');
    //   socket.write('register');
    //   // socket.destroy();
    // });
    // this.appService.registerFingerprint(registerfp)
    // return "success"
  }

  // verify fingerprint 1 to 1
  @Get('verifyfp')
  verify() {
    // let result = status;
    return this.appService.verifyFingerprint();
  }
  @Post('verify')
  verifyFpMessage(@Body() status: string) {
    let result = status;
    return this.appService.verifyFingerprintMessage(result);
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