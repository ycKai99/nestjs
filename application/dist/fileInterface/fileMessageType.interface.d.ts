export interface fingerprintDataInterface {
    fpid: string;
    registeredDate: string;
    operation: string;
    vendor: string;
    header_messageId: string;
}
export interface messageNotificationInterface {
    message: string;
    ReceivedDate: string;
    InstanceID: string;
    EntityTypeID: string;
    EntityTypeName: string;
    ID: string;
    Code: string;
    Operation: string;
    DataSource: string;
}
export interface messageInterface {
    time: string;
    message: string;
    header_messageId?: string;
}
