import { Injectable } from '@nestjs/common'; 
import { fingerprintWriteMessage } from 'src/FileAction/write_data_into_file';
import { FPEVENT, LOCATION_TAG_FILE_PATH } from 'src/FileInterface/const_setting';

@Injectable()
export class LocationTagController{

    constructor(){}
    public addLocationTag(command: string, fullData, CurrentData) {
        fullData.push(CurrentData)
        switch(command) {
            case FPEVENT.LOC_TAG:
                return fingerprintWriteMessage(LOCATION_TAG_FILE_PATH, fullData);
                break;
        }
    }

    public deleteLocationTag() {

    }

    public updateLocationTag() {

    }
}