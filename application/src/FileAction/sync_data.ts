import { FINGERPRINT_TEMPLATE_FILE_PATH } from "src/FileInterface/const_setting";
import { fingerprintWriteMessage } from "./write_data_into_file";
import axios from 'axios';
import fs = require('graceful-fs')

export function syncData(res, fpTemplateData, uuidArray) {
    if(res.syncData.length !== 0) {
        console.log('syncData length is ',res.syncData.length)
        res.syncData.forEach(element => {
            fpTemplateData.push(element)
            uuidArray.push(element['uuid'])
        })
        fingerprintWriteMessage(FINGERPRINT_TEMPLATE_FILE_PATH, fpTemplateData);
    }
    if(res.requestData.length !== 0) {
        console.log('request length is ',res.requestData.length)
        let obj = []
        let syncImageData = []
        let syncRemoteData = fpTemplateData.filter(x => {return res.requestData.includes(x['uuid'])})
        syncRemoteData.forEach(element => {
          syncImageData.push(((fs.readFileSync(element['imageName'])).toString('base64')))
        });
        obj.push(syncRemoteData,syncImageData)
        let countRequest = 0;
        do {
          let arrData = []
          arrData.push([obj[0][countRequest]],[obj[1][countRequest]])
          axios.post(this.remoteUrl+"syncRemoteData",arrData)
          countRequest++;
          console.log('countRequest is ',countRequest)
        }while(countRequest < res.requestData.length)
        console.log('finish sync')
    }
}