import { Injectable } from '@nestjs/common'; 
import { readFileData } from 'src/FileAction/read_file_data';
import { readFileTotal } from 'src/FileAction/read_file_total';
import { fingerprintWriteMessage } from 'src/FileAction/write_data_into_file';
import { FINGERPRINT_TEMPLATE_FILE_PATH, IMAGE_FOLDER, MESSAGE_FILE_PATH, FPEVENT, RESPONSE_MESSAGE_FILE_PATH, LOCATION_TAG_FILE_PATH, LOCATION_RELATION_FILE_PATH } from 'src/FileInterface/const_setting';

@Injectable()
export class StorageController{

    constructor(){}
    
    public readData(command: string) {
        switch(command) {
            case FPEVENT.FP_TPL_MSG:
                return readFileData(FINGERPRINT_TEMPLATE_FILE_PATH);
                break;
            case FPEVENT.NOTIF_MSG:
                return readFileData(MESSAGE_FILE_PATH);
                break;
            case FPEVENT.RES_MSG:
                return readFileData(RESPONSE_MESSAGE_FILE_PATH);
                break;
            case FPEVENT.IMG_TTL:
                return readFileTotal(IMAGE_FOLDER);
                break;
            case FPEVENT.LOC_TAG:
                return readFileData(LOCATION_TAG_FILE_PATH);
                break;
            case FPEVENT.LOC_REL:
                return readFileData(LOCATION_RELATION_FILE_PATH);
                break;
        }
    }

    public writeData(command: string, fullData, CurrentData) {
        fullData.push(CurrentData)
        switch(command) {
            case FPEVENT.FP_TPL_MSG:
                return fingerprintWriteMessage(FINGERPRINT_TEMPLATE_FILE_PATH, fullData);
                break;
            case FPEVENT.NOTIF_MSG:
                return fingerprintWriteMessage(MESSAGE_FILE_PATH, fullData);
                break;
            case FPEVENT.RES_MSG:
                return fingerprintWriteMessage(RESPONSE_MESSAGE_FILE_PATH, fullData);
                break;
            case FPEVENT.IMG_TTL:
                return fingerprintWriteMessage(IMAGE_FOLDER, fullData);
                break;
            case FPEVENT.LOC_TAG:
                return fingerprintWriteMessage(LOCATION_TAG_FILE_PATH, fullData);
                break;
            case FPEVENT.LOC_REL:
                return fingerprintWriteMessage(LOCATION_RELATION_FILE_PATH, fullData);
                break;
        }
    }
}