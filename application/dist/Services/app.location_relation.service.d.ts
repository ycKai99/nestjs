import { locationRelationInterface } from 'src/FileInterface/file_message_type.interface';
export declare class LocationRelationController {
    constructor();
    addRelation(command: string, fullData: locationRelationInterface[], data: locationRelationInterface): boolean;
    deleteRelation(data: any, delData: any): void;
}
