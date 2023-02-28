export interface fingerprintDataInterface {
    fpid: string;
    registeredDate: Date;
    operation: string;
    vendor: string;
}
export interface fileMessage {
    message: string;
    ReceivedDate: Date;
    InstanceID: string;
    EntityTypeID: string;
    EntityTypeName: string;
    ID: string;
    Code: string;
    Operation: string;
    DataSource: string;
}
