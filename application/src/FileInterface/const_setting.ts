export const DIRECTORY: string = "localStorage";
export const FINGERPRINT_DATA_FILE: string = "fingerprintData.json";
export const FINGERPRINT_TEMPLATE_DATA_FILE: string = "fingerprintTemplateData.json";
export const MESSAGE_NOTIFICATION_FILE: string = "registeredFingerprintMessage.json";
export const RESPONSE_MESSAGE_FILE: string = "handleResponseMessage.json";
export const IMAGE_FOLDER: string = "localStorage/images/";
export const LOCATION_TAG_FILE: string = "locationtag.json";
export const LOCATION_RELATION_FILE: string = "locationrelation.json";

// file full path
export const MESSAGE_FILE_PATH: string = "./" + DIRECTORY + "/" + MESSAGE_NOTIFICATION_FILE;
export const FINGERPRINT_FILE_PATH: string = "./" + DIRECTORY + "/" + FINGERPRINT_DATA_FILE;
export const FINGERPRINT_TEMPLATE_FILE_PATH: string = "./" + DIRECTORY + "/" + FINGERPRINT_TEMPLATE_DATA_FILE;
export const RESPONSE_MESSAGE_FILE_PATH: string = "./" + DIRECTORY + "/" + RESPONSE_MESSAGE_FILE;
export const LOCATION_TAG_FILE_PATH: string = "./" + DIRECTORY + "/" + LOCATION_TAG_FILE;
export const LOCATION_RELATION_FILE_PATH: string = "./" + DIRECTORY + "/" + LOCATION_RELATION_FILE;

// submit button value 
export const enum SUBMIT_VALUE {
    INITIALIZE_DEVICE = 'INITIALIZE_DEVICE',
    BEGIN_DEVICE = 'BEGIN_DEVICE',
    ENROLL_FINGERPRINT = 'ENROLL_FINGERPRINT',
    VERIFY_FINGERPRINT = 'VERIFY_FINGERPRINT',
    IDENTIFY_FINGERPRINT = 'IDENTIFY_FINGERPRINT',
    CLOSE_FINGERPRINT = 'CLOSE_FINGERPRINT'
}

// file extension
export const enum FILE_EXTENSION {
    JPEG = 'jpeg',
    BITMAP = 'bmp',
    PNG = 'png'
}

// error message
export const enum ERROR_MESSAGE {
    FAILED_SAVE_IMAGE = "Failed to save image.",
    READ_DIR_FAILED = "Read directory failed, readdir method error.",
    VERIFY_FAILED = "Verify failed."
}

// success message
export const enum SUCCESS_MESSAGE {
    SUCCESS_SAVE_IMAGE = "Save image successful.",
    SUCCESS_VERIFY = "Verify Success."
}

export const REMOTE_SERVER: string = "http://localhost:5050/";
export const CHECK_SERVER: string = REMOTE_SERVER + "checkserverlive";

export const enum fingerprint {
    LEFT_THUMB,
    LEFT_INDEX,
    LEFT_MIDDLE,
    LEFT_RING,
    LEFT_PINKY,
    RIGHT_THUMB,
    RIGHT_INDEX,
    RIGHT_MIDDLE,
    RIGHT_RING,
    RIGHT_PINKY,
    UNKNOWN
}

export namespace DB {
    export const FILE: string = "file";
    export const MONGO: string = "mongo";
}
export namespace FPEVENT {
    export const RES_MSG: string = "response message";
    export const NOTIF_MSG: string = "notification message";
    export const FP_TPL_MSG: string = "fingerprint template message";
    export const IMG_TTL: string = "image total";
    export const LOC_TAG: string = "location tag";
    export const LOC_REL: string = "location relation";
}