// fingerprint data interface
export interface fingerprintDataInterface {
    fpid: string;
    registeredDate: string;
    operation: string;
    vendor: string;
    header_messageId: string;
}

// message notification interface
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

// success or error message interface
export interface messageInterface {
    time: string;
    message: string;
    header_messageId?: string;
}