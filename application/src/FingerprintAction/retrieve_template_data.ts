import { dataEncryption } from "../FileAction/data_encryption";

var countFt: number = 0; //count current turn within the loop

export function retrieveFingerprintTemplateData(data): string {
    let returndata = "";
    if (countFt < data.length) {
        console.log('countFt is ', countFt)
        returndata = data[countFt]['fpid']
        countFt++
    }
    else {
        returndata = "finished"
        countFt = 0
        console.log('sent finished')
    }
    return dataEncryption(returndata)
    // return returndata;
}