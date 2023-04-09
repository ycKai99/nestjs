import { Injectable } from '@nestjs/common'; 
import { fingerprintWriteMessage } from 'src/FileAction/write_data_into_file';
import { FPEVENT, LOCATION_RELATION_FILE_PATH } from 'src/FileInterface/const_setting';
import { locationRelationInterface } from 'src/FileInterface/file_message_type.interface';

@Injectable()
export class LocationRelationController{

    constructor(){}
    public addRelation(command:string , fullData: locationRelationInterface[], data: locationRelationInterface) {
        fullData.push(data)
        switch(command) {
            case FPEVENT.LOC_REL:
                return fingerprintWriteMessage(LOCATION_RELATION_FILE_PATH, fullData);
                break;
        }
    }
    public deleteRelation(data,delData) {
        const a = data.filter((x) => {
            if(x.child !== delData && x.parent !== delData){
                return x
            }
          });
        console.log('data is ',a)
    }

}